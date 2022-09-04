import { Scroll, ScrollRef } from "./scroll";
import * as React from "react";
import { RA, pipe, O, EqT } from "../prelude";
import { useInterval } from "react-use";

export interface InfiniteScrollProps<T> {
  itemToKey: (item: T) => string;
  renderItem: (item: T) => JSX.Element;
  style?: React.CSSProperties;
  className?: string;
  items: ReadonlyArray<T>;
  jumpItemKey: string | null;
  onResetJumpItemKey: () => void;
  // nullの時アイテムが存在しない(itemsが0だったり、表示されているアイテムがなかったり)
  onChangeCurrentItem: (item: T | null) => void;
  onScrollTop: () => void;
  onScrollBottom: () => void;
  // 上のアイテムを現在のアイテムとするか、下のアイテムを現在のアイテムとするか
  currentItemBase: "top" | "bottom";
  autoScroll?: { speed: number; interval: number };
}

export function InfiniteScroll<T>(props: InfiniteScrollProps<T>) {
  // 現在の実際のアイテムの位置
  const currentItemKeyRef = React.useRef<string | null>(null);
  const changeCurrentItemKey = React.useCallback((item: T | null) => {
    const key = item !== null ? props.itemToKey(item) : null;
    currentItemKeyRef.current = key;
    props.onChangeCurrentItem(item);
  }, []);

  useInterval(() => {
    const scroll = scrollRef.current;
    const autoScroll = props.autoScroll;
    if (scroll === null || autoScroll === undefined) {
      return;
    }
    scroll.modifyScrollTop(({ scrollTop }) => (scrollTop += autoScroll.speed));
  }, props.autoScroll?.interval);

  const scrollRef = React.useRef<ScrollRef<T> | null>(null);

  // かなり違法だけど冪等を意識してるのでバグの原因にはならないはず。UNSAFE_componentWillUpdateに相当
  // 固定が必要ならnullでない
  // TODO: getSnapshotBeforeUpdate使いたいけどhooksなさそう
  const fixedDataRef = React.useRef<null | { key: string; diff: number }>(null);
  (() => {
    // TODO: 即時関数でhooksを使うとエラーになるので回避。即時関数なしで使うように修正したい
    /* eslint-disable react-hooks/rules-of-hooks */
    // べき等にするために一回の描画で一回しか実行しないようにしたいのでフラグ
    const isProcessRef = React.useRef(false);
    React.useEffect(() => {
      isProcessRef.current = false;
    });

    // 前回のitemsの参照
    const prevItemsRef = React.useRef(props.items);

    // 既にこのrenderで呼び出されてるなら処理しない
    if (isProcessRef.current) {
      return;
    }
    isProcessRef.current = true;

    const scroll = scrollRef.current;
    const currentItemKey = currentItemKeyRef.current;
    const prevItems = prevItemsRef.current;
    prevItemsRef.current = props.items;

    if (
      scroll === null ||
      currentItemKey === null ||
      // ジャンプ先が指定されてるなら固定しない
      props.jumpItemKey !== null ||
      // 速度的な問題で先に参照比較
      prevItems === props.items ||
      RA.getEq(EqT.eqString).equals(
        prevItems.map((item) => props.itemToKey(item)),
        props.items.map((item) => props.itemToKey(item))
      )
    ) {
      return;
    }

    // 固定するべき条件を満たした
    const diff = scroll.getDiff(
      { ratio: 1 },
      // elementに存在するkeyでなければいけないのでcurrentItemKeyを使う
      { ratio: 1, key: currentItemKey }
    );
    if (O.isSome(diff)) {
      fixedDataRef.current = {
        diff: diff.value,
        key: currentItemKey,
      };
    }
    /* eslint-enable react-hooks/rules-of-hooks */
  })();

  React.useLayoutEffect(() => {
    const scroll = scrollRef.current;
    const fixedData = fixedDataRef.current;
    if (scroll === null || fixedData === null) {
      return;
    }
    fixedDataRef.current = null;

    scroll.setDiff(
      { ratio: 1 },
      { ratio: 1, key: fixedData.key },
      fixedData.diff
    );
  });

  // props.jumpItemKeyがnullでない時スクロール位置を変更する
  React.useLayoutEffect(() => {
    const scroll = scrollRef.current;
    if (scroll === null) {
      return;
    }

    const jumpItemKey = props.jumpItemKey;
    if (jumpItemKey !== null) {
      switch (props.currentItemBase) {
        case "top": {
          scroll.setDiff({ ratio: 0 }, { key: jumpItemKey, ratio: 0 }, 0);
          break;
        }
        case "bottom": {
          scroll.setDiff({ ratio: 1 }, { key: jumpItemKey, ratio: 1 }, 0);
          break;
        }
      }

      props.onResetJumpItemKey();
    }
  });

  const prevShowHeadLastKey = React.useRef<{
    head: string | null;
    last: string | null;
  } | null>(null);

  const changeShowItems = React.useCallback(
    (items: ReadonlyArray<T>) => {
      {
        const headKey = pipe(
          RA.head(items),
          O.map(props.itemToKey),
          O.toNullable
        );
        const lastKey = pipe(
          RA.last(items),
          O.map(props.itemToKey),
          O.toNullable
        );

        if (
          prevShowHeadLastKey.current !== null &&
          prevShowHeadLastKey.current.head === headKey &&
          prevShowHeadLastKey.current.last === lastKey
        ) {
          return;
        }

        prevShowHeadLastKey.current = { head: headKey, last: lastKey };
      }

      changeCurrentItemKey(
        (() => {
          switch (props.currentItemBase) {
            case "top": {
              return pipe(RA.head(items), O.toNullable);
            }
            case "bottom": {
              return pipe(RA.last(items), O.toNullable);
            }
          }
        })()
      );

      if (currentItemKeyRef.current !== null) {
        if (
          pipe(
            O.bindTo("topShowKey")(
              pipe(RA.head(items), O.map(props.itemToKey))
            ),
            O.bind("topItemKey", () =>
              pipe(RA.head(props.items), O.map(props.itemToKey))
            ),
            O.map(({ topShowKey, topItemKey }) => topShowKey === topItemKey),
            O.getOrElse(() => false)
          )
        ) {
          props.onScrollTop();
        }

        if (
          pipe(
            O.bindTo("bottomShowKey")(
              pipe(RA.last(items), O.map(props.itemToKey))
            ),
            O.bind("bottomItemKey", () =>
              pipe(RA.last(props.items), O.map(props.itemToKey))
            ),
            O.map(
              ({ bottomShowKey, bottomItemKey }) =>
                bottomShowKey === bottomItemKey
            ),
            O.getOrElse(() => false)
          )
        ) {
          props.onScrollBottom();
        }
      }
    },
    [props.currentItemBase, props.itemToKey]
  );

  const ScrollT = Scroll<T>();
  return (
    <ScrollT
      itemToKey={props.itemToKey}
      renderItem={props.renderItem}
      style={props.style}
      className={props.className}
      items={props.items}
      changeShowItems={changeShowItems}
      ref={scrollRef}
    />
  );
}

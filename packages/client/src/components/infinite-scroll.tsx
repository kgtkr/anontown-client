import { Scroll, ScrollRef } from "./scroll";
import * as React from "react";
import { RA, pipe, O, EqT } from "../prelude";
import { useInterval } from "react-use";
import { Do } from "fp-ts-contrib/lib/Do";

export interface InfiniteScrollProps<T> {
  itemToKey: (item: T) => string;
  renderItem: (item: T) => JSX.Element;
  style?: React.CSSProperties;
  className?: string;
  items: ReadonlyArray<T>;
  // keyがnullの時制御しない
  currentItemKey: string | null;
  // keyがnullの時アイテムが存在しない(itemsが0だったり、表示されているアイテムがなかったり)
  onChangeCurrentItemKey: (key: string | null, item: T | null) => void;
  onScrollTop: () => void;
  onScrollBottom: () => void;
  // 上のアイテムを現在のアイテムとするか、下のアイテムを現在のアイテムとするか
  currentItemBase: "top" | "bottom";
  autoScroll?: { speed: number; interval: number };
}

export function InfiniteScroll<T>(props: InfiniteScrollProps<T>) {
  // 現在の実際のアイテムの位置
  const realCurrentItemKeyRef = React.useRef<string | null>(null);
  const changeCurrentItemKey = React.useCallback((item: T | null) => {
    const key = item !== null ? props.itemToKey(item) : null;
    realCurrentItemKeyRef.current = key;
    props.onChangeCurrentItemKey(key, item);
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

  // アイテムに変更があったときスクロール位置固定
  const prevItemKeys = React.useRef<ReadonlyArray<string>>(
    props.items.map(item => props.itemToKey(item)),
  );
  React.useLayoutEffect(() => {
    const scroll = scrollRef.current;
    const itemKeys = props.items.map(item => props.itemToKey(item));
    const realCurrentItemKey = realCurrentItemKeyRef.current;
    if (
      scroll === null ||
      realCurrentItemKey === null ||
      RA.getEq(EqT.eqString).equals(prevItemKeys.current, itemKeys)
    ) {
      return;
    }
    prevItemKeys.current = itemKeys;

    const diff = scroll.getDiff(
      { ratio: 0 },
      // elementに存在するkeyでなければいけないのでcurrentItemKeyを使う
      { ratio: 0, key: realCurrentItemKey },
    );
    if (O.isSome(diff)) {
      setTimeout(() => {
        scroll.setDiff(
          { ratio: 0 },
          { ratio: 0, key: realCurrentItemKey },
          diff.value,
        );
      }, 0);
    }
  }, [props.items]);

  // propsのcurrentItemKeyが変わった時スクロール位置を変更する
  React.useEffect(() => {
    const scroll = scrollRef.current;
    if (scroll === null) {
      return;
    }

    const newCurrentItem =
      props.currentItemKey !== null
        ? props.items.find(
            item => props.itemToKey(item) === props.currentItemKey,
          )
        : null;

    if (
      newCurrentItem !== null &&
      newCurrentItem !== undefined &&
      realCurrentItemKeyRef.current !== props.itemToKey(newCurrentItem)
    ) {
      const newCurrentItemKey = props.itemToKey(newCurrentItem);
      setTimeout(() => {
        switch (props.currentItemBase) {
          case "top": {
            scroll.setDiff(
              { ratio: 0 },
              { key: newCurrentItemKey, ratio: 0 },
              0,
            );
            break;
          }
          case "bottom": {
            scroll.setDiff(
              { ratio: 1 },
              { key: newCurrentItemKey, ratio: 1 },
              0,
            );
            break;
          }
        }
      }, 0);
    }
  }, [realCurrentItemKeyRef.current, props.currentItemKey]);

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
          O.toNullable,
        );
        const lastKey = pipe(
          RA.last(items),
          O.map(props.itemToKey),
          O.toNullable,
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
        })(),
      );

      if (realCurrentItemKeyRef.current !== null) {
        if (
          pipe(
            Do(O.option)
              .bindL("topShowKey", () =>
                pipe(RA.head(items), O.map(props.itemToKey)),
              )
              .bindL("topItemKey", () =>
                pipe(RA.head(props.items), O.map(props.itemToKey)),
              )
              .return(
                ({ topShowKey, topItemKey }) => topShowKey === topItemKey,
              ),
            O.getOrElse(() => false),
          )
        ) {
          props.onScrollTop();
        }

        if (
          pipe(
            Do(O.option)
              .bindL("bottomShowKey", () =>
                pipe(RA.last(items), O.map(props.itemToKey)),
              )
              .bindL("bottomItemKey", () =>
                pipe(RA.last(props.items), O.map(props.itemToKey)),
              )
              .return(
                ({ bottomShowKey, bottomItemKey }) =>
                  bottomShowKey === bottomItemKey,
              ),
            O.getOrElse(() => false),
          )
        ) {
          props.onScrollBottom();
        }
      }
    },
    [props.currentItemBase, props.itemToKey],
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

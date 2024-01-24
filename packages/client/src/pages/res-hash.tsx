import { useParams } from "react-router";
import { useTitle } from "react-use";
import { Page, Res, Snack } from "../components";
import * as GA from "../generated/graphql-apollo";
import { withModal } from "../utils";
import { usePrefixedStorageCollection } from "../domains/entities/storage/StorageCollectionHooks";
import { NGs } from "../domains/entities/storage/NGs";

function ResHashBase(_props: {}) {
  const params = useParams<{ hash: string }>();
  const hash = decodeURIComponent(params.hash);
  const resesResult = GA.useFindResesQuery({ variables: { query: { hash } } });
  const ngs = usePrefixedStorageCollection(NGs);
  useTitle(`HASH:${hash}`);

  return (
    <div>
      {resesResult.loading ? <span>Loading...</span> : null}
      {resesResult.error !== undefined ? (
        <Snack msg="レス取得に失敗しました" />
      ) : null}
      {resesResult.data !== undefined
        ? resesResult.data.reses.map((res) => (
            <Res res={res} key={res.id} ngs={ngs} />
          ))
        : undefined}
    </div>
  );
}

export function ResHashPage() {
  return (
    <Page>
      <ResHashBase />
    </Page>
  );
}

export const ResHashModal = withModal(() => <ResHashBase />, "ハッシュ");

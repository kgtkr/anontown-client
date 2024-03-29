import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { Page, Res, Snack } from "../components";
import * as GA from "../generated/graphql-apollo";
import { withModal } from "../utils";
import { usePrefixedStorageCollection } from "../domains/entities/storage/StorageCollectionHooks";
import { NGs } from "../domains/entities/storage/NGs";

function ResReplyBase() {
  const { id } = useParams<{ id: string }>();
  const { loading, error, data } = GA.useFindResesQuery({
    variables: { query: { reply: id } },
  });
  const ngs = usePrefixedStorageCollection(NGs);

  return (
    <div>
      <Helmet title="リプライ" />
      {loading && <span>Loading...</span>}
      {error || !data ? (
        <Snack msg="レス取得に失敗しました" />
      ) : (
        <>
          {data.reses.map((res) => (
            <Res res={res} key={res.id} ngs={ngs} />
          ))}
        </>
      )}
    </div>
  );
}

export function ResReplyPage() {
  return (
    <Page>
      <ResReplyBase />
    </Page>
  );
}

export const ResReplyModal = withModal(() => <ResReplyBase />, "リプライ");

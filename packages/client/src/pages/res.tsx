import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { Page, Res, Snack } from "../components";
import * as GA from "../generated/graphql-apollo";
import { withModal } from "../utils";
import { usePrefixedStorageCollection } from "../domains/entities/storage/StorageCollectionHooks";
import { NGs } from "../domains/entities/storage/NGs";

interface ResBaseProps {
  zDepth?: number;
}

// TODO: zDepthが使われていない
function ResBase({ zDepth: _zDepth }: ResBaseProps) {
  const { id } = useParams<{ id: string }>();
  const { loading, error, data } = GA.useFindResesQuery({
    variables: { query: { id: [id] } },
  });
  const ngs = usePrefixedStorageCollection(NGs);

  return (
    <div>
      <Helmet title="レス" />
      {loading && <span>Loading...</span>}
      {error || !data || data.reses.length === 0 ? (
        <Snack msg="レス取得に失敗しました" />
      ) : (
        <Res res={data.reses[0]} ngs={ngs} />
      )}
    </div>
  );
}

export function ResPage() {
  return (
    <Page>
      <ResBase />
    </Page>
  );
}

export const ResModal = withModal(() => <ResBase zDepth={0} />, "レス詳細");

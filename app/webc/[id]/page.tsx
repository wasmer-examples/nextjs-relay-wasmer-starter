import loadSerializableQuery from "src/relay/loadSerializableQuery";
import PackageWebcQueryNode, { PackageWebcQuery } from "__generated__/PackageWebcQuery.graphql";
import IssueViewClientComponent from "./WebcViewClientComponent";

export const runtime = 'edge';

export default async function IssuePage({
  params,
}: {
  params: { id: string };
}) {
  const preloadedQuery = await loadSerializableQuery<
    typeof PackageWebcQueryNode,
    PackageWebcQuery
  >(PackageWebcQueryNode.params, {
    id: params.id,
  });

  return <IssueViewClientComponent preloadedQuery={preloadedQuery} />;
}

export const revalidate = 0;

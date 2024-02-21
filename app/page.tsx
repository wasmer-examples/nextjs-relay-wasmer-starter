import loadSerializableQuery from "src/relay/loadSerializableQuery";
import MainViewQueryNode, {
  MainViewQuery,
} from "__generated__/MainViewQuery.graphql";
import MainViewClientComponent from "./MainViewClientComponent";

export const runtime = 'edge';

const Page = async () => {
  const preloadedQuery = await loadSerializableQuery<
    typeof MainViewQueryNode,
    MainViewQuery
  >(MainViewQueryNode.params, {
    name: "python",
  });

  return <MainViewClientComponent preloadedQuery={preloadedQuery} />;
};

export default Page;

export const revalidate = 0;

import { Suspense } from "react";
import { graphql, PreloadedQuery, usePreloadedQuery } from "react-relay";
import { MainViewQuery } from "__generated__/MainViewQuery.graphql";
import PackageWebcs from "./PackageWebcs";

export default function MainView(props: {
  queryRef: PreloadedQuery<MainViewQuery>;
}) {
  const data = usePreloadedQuery(
    graphql`
      query MainViewQuery($name: String!) {
        getPackage(name: $name) {
          owner {
            globalName
          }
          name
          ...PackageWebcsFragment
        }
      }
    `,
    props.queryRef
  );

  return (
    <Suspense fallback="Loading (client side)...">
      <h1>
        {data.getPackage?.owner.globalName}/{data.getPackage?.name}
      </h1>
      <PackageWebcs package={data.getPackage!} />
    </Suspense>
  );
}

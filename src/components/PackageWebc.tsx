import { Suspense } from "react";
import { graphql, PreloadedQuery, usePreloadedQuery } from "react-relay";
import { PackageWebcQuery } from "__generated__/PackageWebcQuery.graphql";

export default function Issue(props: { queryRef: PreloadedQuery<PackageWebcQuery> }) {
  const data = usePreloadedQuery(
    graphql`
      query PackageWebcQuery($id: ID!) {
        node(id: $id) {
          ...on PackageWebc {
            id
            webcUrl
            createdAt
          }
        }
      }
    `,
    props.queryRef
  );

  return (
    <Suspense fallback="Loading (client side)...">
      <h1>{data.node?.id}</h1>
      <p>{data.node?.webcUrl}</p>
      <p>Created at: {data.node?.createdAt}</p>
    </Suspense>
  );
}

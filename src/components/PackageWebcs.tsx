import { useCallback } from "react";
import { graphql, usePaginationFragment } from "react-relay";
import { PackageWebcsFragment$key } from "__generated__/PackageWebcsFragment.graphql";
import Link from "next/link";
import { WebcsPaginationQuery } from "__generated__/WebcsPaginationQuery.graphql";
import styles from "styles/Issues.module.css";

export default function PackageWebcs(props: {
  package: PackageWebcsFragment$key | null;
}) {
  const { data, loadNext, isLoadingNext, refetch } = usePaginationFragment<
    WebcsPaginationQuery,
    PackageWebcsFragment$key
  >(
    graphql`
      fragment PackageWebcsFragment on Package
      @argumentDefinitions(
        cursor: { type: "String" }
        count: { type: "Int", defaultValue: 2 }
      )
      @refetchable(queryName: "WebcsPaginationQuery") {
        issues: packagewebcSet(after: $cursor, first: $count)
          @connection(key: "Issues_issues") {
          edges {
            __id
            node {
              # Compose the data dependencies of child components
              # by spreading their fragments:
              # ...IssuesListItem_issue
              id
              webcUrl
              createdAt
            }
          }
        }
      }
    `,
    props.package
  );

  // Callback to paginate the issues list
  const loadMore = useCallback(() => {
    // Don't fetch again if we're already loading the next page
    if (isLoadingNext) {
      return;
    }
    loadNext(10);
  }, [isLoadingNext, loadNext]);

  return (
    <ul className={styles.issues}>
      {data?.issues.edges?.map((edge) => {
        if (edge == null || edge.node == null) {
          return null;
        }
        return (
          <li key={edge.__id}>
            <Link href={`/webc/${edge.node.id}`}>{edge.node.webcUrl}</Link>{" "}
            created {edge.node.createdAt}
          </li>
        );
      })}
      <li>
        <button onClick={loadMore} disabled={isLoadingNext}>
          {isLoadingNext ? "Loading..." : "Load More"}
        </button>
        <button
          onClick={() =>
            refetch({
              count: 10,
            })
          }
        >
          Refetch with 10 items
        </button>
      </li>
    </ul>
  );
}

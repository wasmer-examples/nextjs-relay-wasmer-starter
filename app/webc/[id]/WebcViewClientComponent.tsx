"use client";

import { useRelayEnvironment } from "react-relay";
import Issue from "src/components/PackageWebc";
import PackageWebcQueryNode, { PackageWebcQuery } from "__generated__/PackageWebcQuery.graphql";
import { SerializablePreloadedQuery } from "src/relay/loadSerializableQuery";
import useSerializablePreloadedQuery from "src/relay/useSerializablePreloadedQuery";

const Root = (props: {
  preloadedQuery: SerializablePreloadedQuery<typeof PackageWebcQueryNode, PackageWebcQuery>;
}) => {
  const environment = useRelayEnvironment();
  const queryRef = useSerializablePreloadedQuery(
    environment,
    props.preloadedQuery
  );

  return <Issue queryRef={queryRef} />;
};

export default Root;

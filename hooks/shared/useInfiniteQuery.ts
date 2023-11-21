import { useCallback } from "react";
import {
  useQuery,
  NetworkStatus,
  DocumentNode,
  QueryHookOptions,
  QueryResult,
} from "@apollo/client";
import { getOperationName } from "@apollo/client/utilities";
import { IPP } from "@/constants/common";

type OptionProps = {
  variables?: {
    page: number;
    pageSize: number;
  };
} & QueryHookOptions;

type TypeInfiniteQuery<T> = {
  data: T[] | [];
  page: number;
  pageSize: number;
  loading: boolean;
  fetchNextPage: () => void;
  isMore: boolean;
  total: number;
  isFetchingNextPage: boolean;
};

export function useInfiniteQuery<T>(
  query: DocumentNode,
  { variables, fetchPolicy = "network-only", ...options }: OptionProps = {}
): TypeInfiniteQuery<T> {
  const {
    data: queryData,
    loading,
    fetchMore,
    networkStatus,
    ...rest
  } = useQuery(query, {
    variables: {
      page: 0,
      pageSize: IPP,
      ...variables,
    },
    fetchPolicy,
    nextFetchPolicy: "cache-first",
    notifyOnNetworkStatusChange: true,
    ...options,
  });

  const operationName = getOperationName(query);

  const {
    results: data,
    currentPage,
    total,
    pageSize,
  } = queryData?.[operationName || ""] || {};

  const isMore = (currentPage + 1) * Number(variables?.pageSize || IPP) < total;

  const fetchNextPage = useCallback(() => {
    if (!loading && (currentPage + 1) * IPP < total) {
      fetchMore({
        variables: {
          page: currentPage + 1,
        },
      });
    }
  }, [currentPage, fetchMore, loading, total]);

  return {
    data,
    page: currentPage,
    pageSize,
    loading,
    fetchNextPage,
    isMore,
    total,
    isFetchingNextPage: networkStatus === NetworkStatus.fetchMore,
  };
}

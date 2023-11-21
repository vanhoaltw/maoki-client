import {
  CREATE_LISTING,
  GET_LISTING,
  GET_LISTING_DRAFT,
} from "@/graphql/listing";
import { useInfiniteQuery } from "./shared/useInfiniteQuery";
import { Listing, ListingPagination } from "@/types/graphql";
import { useMutation } from "@apollo/client";

export const useGetListing = () => {
  return useInfiniteQuery(GET_LISTING, { fetchPolicy: "cache-and-network" });
};

export const useGetListingDraft = () => {
  return useInfiniteQuery<Listing>(GET_LISTING_DRAFT, {
    fetchPolicy: "cache-and-network",
  });
};

export const userCreateListing = () => {
  return useMutation(CREATE_LISTING);
};

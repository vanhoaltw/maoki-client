import { gql } from "@apollo/client";
import { FRAGMENT_LISTING, FRAGMENT_USER } from "./fragments";

export const GET_LISTING = gql`
  query getListing($filter: JSON, $page: Int, $pageSize: Int) {
    getListing(filter: $filter, page: $page, pageSize: $pageSize) {
      page
      pageSize
      total
      results {
        ...Listing
        user {
          ...User
        }
      }
    }
  }
  ${FRAGMENT_LISTING}
  ${FRAGMENT_USER}
`;

export const GET_LISTING_DRAFT = gql`
  query getListing($filter: JSON, $page: Int, $pageSize: Int) {
    getListing(filter: $filter, page: $page, pageSize: $pageSize) {
      page
      pageSize
      total
      results {
        ...Listing
      }
    }
  }
  ${FRAGMENT_LISTING}
`;

export const CREATE_LISTING = gql`
  mutation CreateListing($input: CreateListingInput!) {
    createListing(input: $input) {
      id
    }
  }
`;

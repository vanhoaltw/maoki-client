import { gql } from "@apollo/client";

export const FRAGMENT_LISTING = gql`
  fragment Listing on Listing {
    id
    bathroom
    bedCount
    bedroom
    city
    description
    isActive
    latitude
    longitude
    name
    price
    title
    userId
  }
`;

export const FRAGMENT_USER = gql`
  fragment User on User {
    id
    avatar
    bio
    birthday
    completeOnboarding
    email
    favoriteSong
    firstName
    gender
    guestType
    identityVerificationTypes
    lastActivedAt
    lastName
    location
    isSuperhost
    isAvailable
    managedListingsTotalCount
    registeredAt
    titleText
    school
    username
    work
  }
`;

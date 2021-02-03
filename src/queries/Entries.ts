import gql from "graphql-tag"

export const GET_ENTRIES_BY_BOOK = gql`
  query ($bookNumber: String!){
    entriesByBook(max: 50, book:$bookNumber) {
      book
      header
      content
    }
  }
`;

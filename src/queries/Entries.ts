import gql from "graphql-tag"

export const GET_ENTRIES_BY_BOOK = gql`
  query GET_ENTRIES_BY_BOOK($bookNumber: String!){
    bookNumber @client @export(as:"bookNumber")
    entriesByBook(max: 50, book:$bookNumber) {
      book
      header
      content
    }
  }
`;

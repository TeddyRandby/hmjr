import gql from "graphql-tag"

export const GET_ENTRIES_BY_BOOK = gql`
  query ($bookNumber: [String!]!){
    entriesByBook(max: 50, book:$bookNumber) {
      _id
      book
      header
      content
      dates {
        day
        month
        year
        stringified
        content
      }
      indexes {
        book
        page
        content
      }
   	  locations
	  people
      organizations
      }
  }
`;

export const UPDATE_ENTRY = gql`
  mutation ($id: String!, $updated:EntryInput!) {
    updateEntry(id: $id, entry: $updated)
}
`

export const DELETE_ENTRY = gql`
  mutation ($id: String!) {
    deleteEntry(id: $id)
}
`
export const CREATE_ENTRY = gql`
  mutation ($book: String!){
    createEntry (book: $book){
      _id
    }
}
`

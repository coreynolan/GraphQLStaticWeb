import gql from 'graphql-tag';
 
const CREATE_QUOTE = gql`
  mutation createQuote($input: CreateQuoteInput!) {
    createQuote(input: $input) {
      id
      source
      text
    }
  }
`;
 
const DELETE_QUOTE = gql`
  mutation deleteQuote($id: ID!) {
    deleteQuote(id: $id) {
      id
      source
      text
    }
  }
`;
 
const LIST_QUOTES = gql`
  query {
    listQuotes {
      id
      source
      text
    }
  }
`;
 
export const GQL = {
  QUERY: {
    LIST_QUOTES,
  },
  MUTATION: {
    CREATE_QUOTE,
    DELETE_QUOTE,
  },
}
export default GQL;
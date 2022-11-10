import { gql } from '@apollo/client';
export default gql`
  query Filters{
    types: pokemon_v2_type {
      name
    }
    generations: pokemon_v2_generation {
      name
    }
  }
`;
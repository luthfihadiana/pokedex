import { gql } from '@apollo/client';
export default gql`
  query POKEMONS(
    $offset: Int = 0
  ){
    pokemons: pokemon_v2_pokemonspecies(
      limit: 10, 
      order_by: {id: asc}, 
      offset: $offset
    ) {
      name
      id
      details: pokemon_v2_pokemons {
        types: pokemon_v2_pokemontypes {
          type: pokemon_v2_type {
            name
          }
        }
      }
    }
    aggregate: pokemon_v2_pokemonspecies_aggregate {
      aggregate {
        count
      }
    }
  }
`;
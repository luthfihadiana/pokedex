import { gql } from '@apollo/client';
export default gql`
  query POKEMON_COMPARABLE(
    $name1: String!,
    $name2: String!,
  ){
    pokemon1: pokemon_v2_pokemonspecies(
      limit: 1, 
      where: {name: {_similar: $name1}}
    ) {
      name
      id
      pokemonDetail: pokemon_v2_pokemons {
        types: pokemon_v2_pokemontypes {
          type: pokemon_v2_type {
            name
          }
        }
        stats: pokemon_v2_pokemonstats {
          base_stat
          stat: pokemon_v2_stat {
            name
          }
        }
        abilities: pokemon_v2_pokemonabilities {
          ability: pokemon_v2_ability {
            name
          }
        }
        weight
        height
      }
      color: pokemon_v2_pokemoncolor {
        name
      }
      habitat: pokemon_v2_pokemonhabitat {
        name
      }
      generation: pokemon_v2_generation {
        name
      }
    },
    pokemon2: pokemon_v2_pokemonspecies(
      limit: 1, 
      where: {name: {_similar: $name2}}
    ) {
      name
      id
      pokemonDetail: pokemon_v2_pokemons {
        types: pokemon_v2_pokemontypes {
          type: pokemon_v2_type {
            name
          }
        }
        stats: pokemon_v2_pokemonstats {
          base_stat
          stat: pokemon_v2_stat {
            name
          }
        }
        abilities: pokemon_v2_pokemonabilities {
          ability: pokemon_v2_ability {
            name
          }
        }
        weight
        height
      }
      color: pokemon_v2_pokemoncolor {
        name
      }
      habitat: pokemon_v2_pokemonhabitat {
        name
      }
      generation: pokemon_v2_generation {
        name
      }
    }
  }
`;
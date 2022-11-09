import { gql } from '@apollo/client';
export default gql`
  query POKEMON_DETAIL(
    $name: String!,
  ){
    pokemon: pokemon_v2_pokemonspecies(
      limit: 1, 
      where: {name: {_similar: $name}}
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
      gender_rate
      hatch_counter
      color: pokemon_v2_pokemoncolor {
        name
      }
      habitat: pokemon_v2_pokemonhabitat {
        name
      }
      generation: pokemon_v2_generation {
        name
      }
      desc: pokemon_v2_pokemonspeciesflavortexts(limit: 1, where: {pokemon_v2_language: {name: {_eq: "en"}}}) {
        flavor_text
      }
    }
  }
`;
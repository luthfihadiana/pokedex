import { pokemonType } from "./types";

export type Pokemon = {
  name: string,
  id: string,
  types: pokemonType[],
}
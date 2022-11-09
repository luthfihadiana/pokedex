import { useMemo } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { useQuery } from "@apollo/client";
import POKEMONS from '../graphql/query/getPokemons';
import { Pokemon } from '../models/pokemon';
import { relative } from 'path';

export default function Home() {
  const { data, loading } = useQuery(POKEMONS);

  const count = useMemo(() => {
    return data?.aggregate?.aggregate?.count || 0;
  }, [data]);

  const pokemons = useMemo(() => {
    if (!data) return [];
    return data.pokemons.map((el: any) => {
      const pokemon: Pokemon = { id: el?.id, name: el?.name, types: el?.detail?.types?.map((e: any) => e?.type?.name) };
      return pokemon;
    });
  }, [data]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Pokédex</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Pokédex - {count}
        </h1>

        <div className={styles.grid}>
          {
            pokemons.map((el: Pokemon) => <a
              href="https://github.com/vercel/next.js/tree/canary/examples"
              className={styles.card}
            >
              <div className={styles.imageContainer}>
                <Image
                  alt={`pokemon-${el.id}`}
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${el.id}.png`}
                  width={82}
                  height={82}
                />
              </div>
              <p>#{el.id}</p>
              <h2>{el.name}</h2>
            </a>)
          }
        </div>
      </main>
    </div>
  )
}

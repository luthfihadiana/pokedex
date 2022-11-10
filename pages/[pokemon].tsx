import { useMemo, useRef, useCallback, useEffect, useState } from 'react';
import type { NextPage } from 'next'
import Head from 'next/head'
import { useQuery } from "@apollo/client";
import Image from 'next/image';
import { useRouter } from "next/router";
import {
  BsArrowLeftShort,
} from "react-icons/bs";
import POKEMON_DETAIL from '../graphql/query/getPokemonDetail';
import styles from '../styles/Detail.module.css';
import Skeleton from 'react-loading-skeleton';
import PokemonType from '../components/pokemonType';

const PokemonPage: NextPage = () => {
  const router = useRouter();
  const { pokemon: pokemonName } = router.query;

  const { data, loading } = useQuery(POKEMON_DETAIL, {
    skip: !pokemonName,
    variables: { name: pokemonName }
  })

  const pokemonData = useMemo(() => {
    if (!data) return {};
    return data?.pokemon[0];
  }, [data])

  if (loading) return <Skeleton height={400} />

  return (
    <div className={styles.container}>
      <Head>
        <title>Pokédex - {pokemonName}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <a href="/">
          <BsArrowLeftShort fontSize={24} />
        </a>
        <p><strong>#{pokemonData?.id}</strong></p>
        <h1 className={styles.title}>{pokemonData?.name}</h1>
        <PokemonType pokemonTypes={pokemonData?.pokemonDetail?.[0]?.types.map((el: any) => el?.type?.name) || []} />
        <div className={styles.imageContainer}>
          <Image
            alt={`pokemon-${pokemonData?.id}`}
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonData?.id}.png`}
            width={82}
            height={82}
            className={styles.pokemonImage}
          />
        </div>
        <section className={styles.section}>
          <h2 className={styles.title}>About</h2>
          <p>{pokemonData?.desc?.[0]?.flavor_text}</p>
          <div className={styles.stat}>
            <p className={styles.label}>Height</p>
            <p className={styles.val}>{`${pokemonData?.pokemonDetail?.[0]?.height / 10} m`}</p>
          </div>
          <div className={styles.stat}>
            <p className={styles.label}>Weight</p>
            <p className={styles.val}>{`${pokemonData?.pokemonDetail?.[0]?.weight / 10} Kg`}</p>
          </div>
          <div className={styles.stat}>
            <p className={styles.label}>Generation</p>
            <p className={styles.val}>{pokemonData?.generation?.name}</p>
          </div>
          <div className={styles.stat}>
            <p className={styles.label}>Color</p>
            <p className={styles.val}>{pokemonData?.color?.name}</p>
          </div>
          <div className={styles.stat}>
            <p className={styles.label}>Abilities</p>
            <p className={styles.val}>
              {pokemonData?.pokemonDetail?.[0]?.abilities?.map((el: any) => el?.ability?.name)?.toString()}
            </p>
          </div>
        </section>
        <section className={styles.section}>
          <h2 className={styles.title}>Base Stats</h2>
          <div className={styles.grid}>
            {
              pokemonData?.pokemonDetail?.[0]?.stats?.map((el: any, idx: number) =>
                <div className={styles.stat} key={`stat-${idx}`}>
                  <p className={styles.label}>{el?.stat?.name}</p>
                  <p className={styles.val}>
                    {el?.base_stat}
                  </p>
                </div>
              )
            }
          </div>
        </section>
      </main>
    </div>
  );
}

export default PokemonPage;
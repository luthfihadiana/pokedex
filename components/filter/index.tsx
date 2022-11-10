import { useMemo, useState } from 'react';
import { useQuery } from "@apollo/client";
import classNames from "classnames";
import { pokemonType } from "../../models/types";
import styles from './index.module.css';
import Skeleton from 'react-loading-skeleton';
import FILTER_DATA from '../../graphql/query/getFilterData';
import {
  BsX,
} from "react-icons/bs";

export type Filters = {
  generation: string[],
  type: pokemonType[],
}

type PropsFilter = {
  value: Filters,
  handler: (filter: Filters) => void,
  onClose: () => void
};

const Filter = ({ value, handler, onClose }: PropsFilter) => {
  const [filter, setFilter] = useState(value);
  const { data, loading } = useQuery(FILTER_DATA);
  const generations = useMemo(() => data?.generations?.map((el: any) => el?.name), [data]);
  const types = useMemo(() => data?.types?.map((el: any) => el?.name), [data]);
  const handleClickType = (val: pokemonType) => {
    console.log(filter);
    const newType = [...filter.type];
    if (newType.includes(val)) {
      const idx = newType.findIndex(el => el === val);
      newType.splice(idx, 1);
    } else {
      newType.push(val);
    }
    setFilter(prev => ({ ...prev, type: [...newType] }));
  }
  const handleClickGeneration = (val: string) => {
    const newType = [...filter.generation];
    if (newType.includes(val)) {
      const idx = newType.findIndex(el => el === val);
      newType.splice(idx, 1);
    } else {
      newType.push(val);
    }
    setFilter(prev => ({ ...prev, generation: [...newType] }));
  }

  const handleSubmitFilter = () => {
    handler(filter);
    onClose();
  }
  return (
    <section className={styles.modal}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h2>Filters</h2>
          <BsX onClick={onClose} fontSize={24} />
        </header>
        <h3>Types</h3>
        {!loading ? <div className={styles.filter}>
          {
            types?.map((el: pokemonType) =>
              <button
                className={classNames(styles.badge, { [styles.selected]: filter?.type?.includes(el) })}
                onClick={() => handleClickType(el)}
              >
                {el}
              </button>
            )
          }
        </div> : <Skeleton height={100} />}
        <h3>Generation</h3>
        {!loading ? <div className={styles.filter}>
          {
            generations?.map((el: string) =>
              <button
                className={classNames(styles.badge, { [styles.selected]: filter?.generation?.includes(el) })}
                onClick={() => handleClickGeneration(el)}
              >
                {el}
              </button>
            )
          }
        </div> : <Skeleton height={100} />}
      </div>
      <footer className={styles.footer}>
        <div className={classNames(styles.container, styles.containerButton)}>
          <button className={styles.buttonSubmit} onClick={handleSubmitFilter}>Filter</button>
        </div>
      </footer>
    </section>
  );
}

export default Filter;
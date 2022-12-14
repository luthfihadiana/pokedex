import classNames from 'classnames';
import { pokemonType as Type } from '../../models/types';
import styles from './index.module.css';

type PropsPokemonType = {
  pokemonTypes: Type[],
}

const PokemonType = ({ pokemonTypes }: PropsPokemonType) => {
  return (
    <div className={styles.container}>
      {
        pokemonTypes?.map((el, idx) =>
          <div className={classNames(styles.badge, styles[el])} key={`${el}-${idx}`}>
            {el}
          </div>
        )
      }
    </div>
  );
}

export default PokemonType;
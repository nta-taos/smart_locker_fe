import MapView from '@/components/map/Map';

import styles from './Map.module.scss';

export const MapPage = () => {
  return <MapView varriant="detail" className={styles.container} />;
};

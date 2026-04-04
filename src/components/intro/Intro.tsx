import { ArrowRightOutlined } from '@ant-design/icons';

import styles from './Intro.module.scss';
import { useIntro } from './useIntro';

const Intro: React.FC = () => {
  const { title, image, startLable, startLink } = useIntro();
  return (
    <div className={styles.introContainer}>
      <img className={styles.introBg} src={image} alt="intro" />
      <div className={styles.introBody}>
        <h1>{title}</h1>
        <div className={styles.introFooter}>
          <span>
            <a href={startLink}>
              {startLable} <ArrowRightOutlined />
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Intro;

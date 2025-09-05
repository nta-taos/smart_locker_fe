import { ArrowRightOutlined } from '@ant-design/icons';

import styles from './Intro.module.scss';
import { useIntro } from './useIntro';

const Intro: React.FC = () => {
  const { title, image, socials, startLable, startLink } = useIntro();
  return (
    <div className={styles.introContainer}>
      <img className={styles.introBg} src={image} alt="intro" />
      <div className={styles.introBody}>
        <h1>{title}</h1>
        <div className={styles.introFooter}>
          {socials &&
            socials.map((social, idx) => (
              <a key={idx} href={social.link}>
                <div>{social.icon}</div> {social.name}
              </a>
            ))}
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

import styles from '../../styles/componentStyles/Footer.module.scss';

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.inner_container}>
        <div>
          This is simple shopping website with NextJS &amp; ReactJS
        </div>
        <div>
          Jake Hong
        </div>
      </div>
    </div>
  )
};

export default Footer;
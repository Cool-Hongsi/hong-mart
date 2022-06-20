import React from 'react';
import styles from '../../styles/componentStyles/Footer.module.scss';

const Footer = React.memo(() => {
  return (
    <footer className={styles.container}>
      <div className={styles.inner_container}>
        <p>
          This is simple shopping website with NextJS &amp; ReactJS
        </p>
        <p>
          Created by Jake Hong
        </p>
      </div>
    </footer>
  )
});

export default Footer;
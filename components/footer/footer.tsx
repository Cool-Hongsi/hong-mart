import React from 'react';
import styles from '../../styles/componentStyles/Footer.module.scss';

const Footer = React.memo(() => {
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
});

export default Footer;
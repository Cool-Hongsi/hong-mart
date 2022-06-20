import React from 'react';
import { ButtonInterface } from '../../service/type';
import styles from '../../styles/componentStyles/Button.module.scss';

const Button = React.memo(({ title, size, onClickButton }: ButtonInterface) => {
  return (
    <button
      className={
        (size === 'LARGE') ? styles.large_size_button_container :
          (size === 'MEDIUM') ? styles.medium_size_button_container :
            styles.small_size_button_container
      }
      onClick={onClickButton}
    >
      {title}
    </button>
  )
});

export default Button;
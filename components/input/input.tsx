import React from "react";
import { InputInterface } from "../../service/type";
import styles from '../../styles/componentStyles/Input.module.scss';
import { INPUT_TYPE } from "../../service/const/generalConst";

const { GENERAL_INPUT } = INPUT_TYPE;

const Input = ({ type, isNumber, placeholder, name, value, onChangeInput, onKeyDownInput }: InputInterface) => {
  return (
    <input
      className={(type === GENERAL_INPUT) ? styles.general_input_container : styles.search_input_container}
      type={(isNumber) ? 'number' : 'text'}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={(e) => onChangeInput(e)}
      onKeyDown={(e) => onKeyDownInput(e)}
    />
  )
};

export default Input;
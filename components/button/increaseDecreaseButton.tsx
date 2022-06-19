import styles from '../../styles/componentStyles/IncreaseDecreaseButton.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { RootState } from '../../store/modules/rootReducer';
import {
  hong_mart_increase_product_count, hong_mart_decrease_product_count,
  hong_mart_initialize_product_count
} from '../../store/modules/hongmart/hongmartAction';
import { useEffect } from 'react';

const IncreaseDecreaseButton = () => {

  const hongMartReducerSelector = useSelector((state: RootState) => state.hongMartReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    // Initialize Current Product Count as 1
    dispatch(hong_mart_initialize_product_count());
  }, []);


  const onClickDecrease = () => {
    if (hongMartReducerSelector.productCount > 1) {
      dispatch(hong_mart_decrease_product_count());
    }
  };

  const onClickIncrease = () => {
    dispatch(hong_mart_increase_product_count());
  };

  return (
    <div className={styles.increase_decrease_button_container}>
      <div className={styles.increase_decrease_button} onClick={onClickDecrease}>
        <RemoveIcon className={styles.minus_plus_icon} />
      </div>
      <div className={styles.product_count}>
        {hongMartReducerSelector.productCount}
      </div>
      <div className={styles.increase_decrease_button} onClick={onClickIncrease}>
        <AddIcon className={styles.minus_plus_icon} />
      </div>
    </div>
  )
};

export default IncreaseDecreaseButton;
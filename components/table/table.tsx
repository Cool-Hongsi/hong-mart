import styles from '../../styles/componentStyles/Table.module.scss';
import { calculateSalePrice, calculateTotalPrice } from '../../service/util/general';
import CloseIcon from '@mui/icons-material/Close';
import ProductImage from '../product/productImage';
import { CartInterface, TableInterface } from '../../service/type';

const TableComponent = ({ theadList, tbodyList, onClickButton }: TableInterface) => {
  return (
    <table className={styles.cart_table}>
      <thead>
        <tr>
          {theadList.map((theadData: string, index: number) => {
            return (
              <th key={index} className={styles.cart_table_cell}>{theadData}</th>
            )
          })}
        </tr>
      </thead>
      <tbody>
        {tbodyList?.map((tbodyData: CartInterface) => {
          return (
            <tr key={tbodyData._id}>
              <th className={styles.cart_table_cell_with_image}>
                <ProductImage
                  product={tbodyData}
                  isClickable={false}
                  width={80}
                  height={80}
                  onClickProductImage={() => { }}
                />
              </th>

              <th className={styles.cart_table_cell}>{tbodyData.productName}</th>
              <th className={styles.cart_table_cell}>{tbodyData.count}ea</th>
              <th className={styles.cart_table_cell}>${(tbodyData.productPriceSale) ? calculateSalePrice(tbodyData.productPrice, tbodyData.productPriceSale).toFixed(2) : tbodyData.productPrice.toFixed(2)}</th>
              <th className={styles.cart_table_cell}>${(tbodyData.productPriceSale) ? calculateTotalPrice(tbodyData.productPrice, tbodyData.productPriceSale, tbodyData.count).toFixed(2) : (tbodyData.productPrice * tbodyData.count).toFixed(2)}</th>
              <th className={styles.cart_table_cell}><CloseIcon className={styles.delete_icon} onClick={() => onClickButton!(tbodyData)} /></th>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
};

export default TableComponent;
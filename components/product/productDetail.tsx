import styles from '../../styles/componentStyles/ProductDetail.module.scss';
import { ProductDetailInterface } from "../../service/type";
import { calculateSalePrice } from '../../service/util/general';
import { PRODUCT_DETAIL_TYPE } from '../../service/const/generalConst';

// Each of them has a bit different style.
const { LIST, DETAIL } = PRODUCT_DETAIL_TYPE;

const ProductDetail = ({ product, productDetailType }: ProductDetailInterface) => {
  return (
    <div className={styles.container}>
      <div className={styles.product_category}>
        {product.productCategory}
      </div>
      <div className={styles.product_name}>
        {product.productName.charAt(0).toUpperCase() + product.productName.substring(1, product.productName.length)}
      </div>
      <div className={(productDetailType === LIST) ? styles.product_price_list : styles.product_price_detail}>
        <div className={(product.productPriceSale) ? styles.delete_price : ''}>
          ${product.productPrice.toFixed(2)}
        </div>
        {product.productPriceSale && (
          <div>
            ${calculateSalePrice(product.productPrice, product.productPriceSale).toFixed(2)}
          </div>
        )}
      </div>
      {productDetailType === DETAIL && (
        <div className={styles.product_description}>
          {product.productDescription}
        </div>
      )}
    </div>
  )
};

export default ProductDetail;
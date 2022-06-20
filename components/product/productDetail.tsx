import styles from '../../styles/componentStyles/ProductDetail.module.scss';
import { ProductDetailInterface } from "../../service/type";
import { calculateSalePrice } from '../../service/util/general';
import { PRODUCT_DETAIL_TYPE } from '../../service/const/generalConst';

// Each of them has a bit different style.
const { LIST, DETAIL } = PRODUCT_DETAIL_TYPE;

const ProductDetail = ({ product, productDetailType }: ProductDetailInterface) => {
  return (
    <section className={styles.container}>
      <p className={styles.product_category}>
        {product.productCategory}
      </p>
      <p className={styles.product_name}>
        {product.productName.charAt(0).toUpperCase() + product.productName.substring(1, product.productName.length)}
      </p>
      <div className={(productDetailType === LIST) ? styles.product_price_list : styles.product_price_detail}>
        <span className={(product.productPriceSale) ? styles.delete_price : ''}>
          ${product.productPrice.toFixed(2)}
        </span>
        {product.productPriceSale && (
          <span>
            ${calculateSalePrice(product.productPrice, product.productPriceSale).toFixed(2)}
          </span>
        )}
      </div>
      {productDetailType === DETAIL && (
        <article className={styles.product_description}>
          {product.productDescription}
        </article>
      )}
    </section>
  )
};

export default ProductDetail;
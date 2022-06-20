import { GetServerSideProps } from "next";
import { API_ADDRESS } from "../../service/stage";
import { API_CONST } from "../../service/const/apiConst";
import { ProductInterface, ProductListInterface } from "../../service/type";
import styles from '../../styles/componentStyles/Category.module.scss';
import { useRouter } from "next/router";
import { PRODUCT_DETAIL_TYPE } from "../../service/const/generalConst";
import { ROUTE_CONST } from '../../service/const/routeConst';
import { JSXElementConstructor, ReactElement } from "react";
import ProductImage from '../../components/product/productImage';
import ProductDetail from '../../components/product/productDetail';

const { SHOP, DETAIL } = ROUTE_CONST;
const { LIST } = PRODUCT_DETAIL_TYPE;
const { SEARCH_PRODUCT } = API_CONST;

const Search = ({ productList }: ProductListInterface) => {
  const router = useRouter();

  const onClickProductImage = (product: ProductInterface) => {
    router.push({ pathname: SHOP + '/' + product.productCategory + DETAIL, query: { productId: product._id } })
  };

  return (
    <section className={styles.container}>

      <p className={styles.category_title_container}>
        {router.query.searchby?.toString()}
      </p>

      {productList && productList.length > 0
        ?
        <div className={styles.product_container}>
          {productList.map((product: ProductInterface): ReactElement<JSXElementConstructor<any>> => {
            return (
              <div key={product._id}>
                <ProductImage
                  product={product}
                  isClickable={true}
                  width={240}
                  height={180}
                  onClickProductImage={onClickProductImage}
                />
                <ProductDetail
                  product={product}
                  productDetailType={LIST}
                />
              </div>
            )
          })}
        </div>
        :
        <div className={styles.no_product_container}>
          No Product List
        </div>
      }
    </section>
  )
};

export default Search;

// Search Product (SSR)
// Generate HTML and Data-Fetching in every request
// Can be used for data which is changed frequently
export const getServerSideProps: GetServerSideProps = async context => {
  const { query } = context;

  // Search by (productName)
  // DEV => http://localhost:3000/api/shop/search?searchby=abcd
  // PROD => https://hong-mart.vercel.app/api/shop/search?searchby=abcd
  const response = await fetch(API_ADDRESS + SEARCH_PRODUCT + `?searchby=${query.searchby}`, {
    method: 'GET',
    body: null,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const data = await response.json();

  return {
    props: {
      productList: data.result
    }
  }
}
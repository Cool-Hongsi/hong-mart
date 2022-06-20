import styles from '../../../styles/componentStyles/Category.module.scss';
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { SHOP_MENU_LIST, PRODUCT_DETAIL_TYPE } from "../../../service/const/generalConst";
import { API_CONST } from "../../../service/const/apiConst";
import { ROUTE_CONST } from '../../../service/const/routeConst';
import { API_ADDRESS } from "../../../service/stage";
import { ProductInterface, ProductListInterface } from "../../../service/type";
import { JSXElementConstructor, ReactElement } from "react";
import ProductImage from '../../../components/product/productImage';
import ProductDetail from '../../../components/product/productDetail';

const { READ_PRODUCT } = API_CONST;
const { SHOP, DETAIL } = ROUTE_CONST;
const { LIST } = PRODUCT_DETAIL_TYPE;

const Category = ({ productList }: ProductListInterface) => {

  const router = useRouter();

  const onClickProductImage = (product: ProductInterface) => {
    router.push({ pathname: SHOP + '/' + product.productCategory + DETAIL, query: { productId: product._id } })
  };

  return (
    <div className={styles.container}>

      <div className={styles.category_title_container}>
        {router.query.category?.toString().toUpperCase()}
      </div>

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
    </div>
  )
};

export default Category;

export const getStaticPaths = () => {
  const paths = Object.values(SHOP_MENU_LIST).map((shopMenu: string): object => {
    return {
      params: {
        category: shopMenu
      }
    }
  });

  return {
    paths,
    fallback: true
  }
};

// Each Product List based on category (SSG)
// Generate HTML and Data-Fetching in build time
// Need to set data-fetching paths in advance with getStaticPaths in dynamic route
// Can be used for data which is not changed frequently
export const getStaticProps: GetStaticProps = async context => {
  const { params } = context;
  const response = await fetch(API_ADDRESS + READ_PRODUCT + `?productCategory=${params!.category}`, {
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
    },
    revalidate: 10 // ISR => No need to rebuild (This will regenerate page after 10 sec)
  }
};







// [This is for SSR]

// import styles from '../../../styles/componentStyles/Category.module.scss';
// import { GetServerSideProps } from "next";
// import { useRouter } from "next/router";
// import { SHOP_MENU_LIST, PRODUCT_DETAIL_TYPE } from "../../../service/const/generalConst";
// import { API_CONST } from "../../../service/const/apiConst";
// import { ROUTE_CONST } from '../../../service/const/routeConst';
// import { API_ADDRESS } from "../../../service/stage";
// import { ProductInterface, ProductListInterface } from "../../../service/type";
// import { JSXElementConstructor, ReactElement } from "react";
// import ProductImage from '../../../components/product/productImage';
// import ProductDetail from '../../../components/product/productDetail';

// const { READ_PRODUCT } = API_CONST;
// const { SHOP, DETAIL } = ROUTE_CONST;
// const { LIST } = PRODUCT_DETAIL_TYPE;

// const Category = ({ productList }: ProductListInterface) => {

//   const router = useRouter();

//   const onClickProductImage = (product: ProductInterface) => {
//     router.push({ pathname: SHOP + '/' + product.productCategory + DETAIL, query: { productId: product._id } })
//   };

//   return (
//     <div className={styles.container}>

//       <div className={styles.category_title_container}>
//         {router.query.category?.toString().toUpperCase()}
//       </div>

//       {productList && productList.length > 0
//         ?
//         <div className={styles.product_container}>
//           {productList.map((product: ProductInterface): ReactElement<JSXElementConstructor<any>> => {
//             return (
//               <div key={product._id}>
//                 <ProductImage
//                   product={product}
//                   isClickable={true}
//                   width={240}
//                   height={180}
//                   onClickProductImage={onClickProductImage}
//                 />
//                 <ProductDetail
//                   product={product}
//                   productDetailType={LIST}
//                 />
//               </div>
//             )
//           })}
//         </div>
//         :
//         <div className={styles.no_product_container}>
//           No Product List
//         </div>
//       }
//     </div>
//   )
// };

// export default Category;

// export const getServerSideProps: GetServerSideProps = async context => {
//   const { params } = context;
//   const response = await fetch(API_ADDRESS + READ_PRODUCT + `?productCategory=${params!.category}`, {
//     method: 'GET',
//     body: null,
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   });
//   const data = await response.json();

//   return {
//     props: {
//       productList: data.result
//     },
//   }
// };
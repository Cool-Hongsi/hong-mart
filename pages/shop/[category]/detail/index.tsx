import styles from '../../../../styles/componentStyles/Detail.module.scss';
import { useState } from 'react';
import { GetServerSideProps } from "next";
import { API_ADDRESS } from "../../../../service/stage";
import { API_CONST } from "../../../../service/const/apiConst";
import { PRODUCT_DETAIL_TYPE } from '../../../../service/const/generalConst';
import { ProductSingleInterface } from "../../../../service/type";
import { useRouter } from 'next/router';
import IncreaseDecreaseButton from '../../../../components/button/increaseDecreaseButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { addToCart } from '../../../../service/util/localStorage';
import { RootState } from '../../../../store/modules/rootReducer';
import { useSelector, useDispatch } from 'react-redux';
import { hong_mart_add_cart_info } from '../../../../store/modules/hongmart/hongmartAction';
import ProductImage from '../../../../components/product/productImage';
import ProductDetail from '../../../../components/product/productDetail';
import SnackBarComponent from '../../../../components/snackbar/snackbar';

const { READ_SINGLE_PRODUCT } = API_CONST;
const { DETAIL } = PRODUCT_DETAIL_TYPE;

const Detail = (props: ProductSingleInterface) => {

  const { product } = props;

  const hongMartReducerSelector = useSelector((state: RootState) => state.hongMartReducer);
  const dispatch = useDispatch();

  const router = useRouter();

  const [snackbarToggle, setSnackbarToggle] = useState<{ open: boolean, vertical: string, horizontal: string }>({
    open: false,
    vertical: 'bottom',
    horizontal: 'center',
  });

  const onClickBackButton = () => {
    router.back();
  };

  const closeSnackbar = () => {
    // Close Snackbar
    setSnackbarToggle({
      ...snackbarToggle,
      open: false
    });
  }

  const onClickAddToCart = () => {
    // Show Snackbar
    setSnackbarToggle({
      ...snackbarToggle,
      open: true
    });

    // Local Storage
    addToCart(product, hongMartReducerSelector.productCount);

    // Redux State
    dispatch(hong_mart_add_cart_info({
      ...product,
      count: hongMartReducerSelector.productCount
    }));
  };

  return (
    <section className={styles.container}>
      <div className={styles.back_icon_container}>
        <ArrowBackIosNewIcon className={styles.back_icon} onClick={onClickBackButton} />
      </div>
      <div className={styles.inner_container}>
        <div>
          <ProductImage
            product={product}
            isClickable={false}
            width={400}
            height={300}
            onClickProductImage={() => { }}
          />
        </div>

        <div className={styles.product_detail_container}>
          <ProductDetail
            product={product}
            productDetailType={DETAIL}
          />
          <div className={styles.product_button_container}>
            <div className={styles.increase_decrease_button}>
              <IncreaseDecreaseButton />
            </div>
            <button className={styles.add_to_cart_button_container} onClick={onClickAddToCart}>
              <div className={styles.add_to_cart_button}>
                Add To Cart
              </div>
            </button>
          </div>
        </div>
      </div>
      <SnackBarComponent
        snackbarOpen={snackbarToggle.open}
        snackbarClose={closeSnackbar}
        snackbarMessage={"Successfully added in cart"}
      />
    </section>
  )
};

export default Detail;

// Each Product Detail (SSR)
// Generate HTML and Data-Fetching in every request
// Can be used for data which is changed frequently
export const getServerSideProps: GetServerSideProps = async context => {
  const { params, query } = context;
  // console.log(params); // { category: 'meal' }
  // console.log(query); // { category: 'meal', productId: 'abcd' }

  const response = await fetch(API_ADDRESS + READ_SINGLE_PRODUCT + `?productCategory=${query.category}&productId=${query.productId}`, {
    method: 'GET',
    body: null,
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json();

  return {
    props: {
      product: data.result
    }
  }
};

// router.push({ pathname: SHOP + '/' + product.productCategory + DETAIL, query: { productId: product._id } })
// /shop/meal/detail?productId=abcd
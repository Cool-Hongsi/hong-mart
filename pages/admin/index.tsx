import styles from '../../styles/componentStyles/Admin.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/modules/rootReducer";
import Input from "../../components/input/input";
import { ADMIN_INFO, ADMIN_PRODUCT_INFO, SHOP_MENU_LIST, INPUT_TYPE } from "../../service/const/generalConst";
import {
  hong_mart_set_admin_info, hong_mart_admin_login_request, hong_mart_set_admin_product_info,
  hong_mart_create_product_request, hong_mart_read_product_request, hong_mart_read_set_value_for_update_and_delete,
  hong_mart_update_product_request, hong_mart_delete_product_request,
} from "../../store/modules/hongmart/hongmartAction";
import Button from '../../components/button/button';
import { isNotEmptyString } from '../../service/util/validator';
import CircularProgress from '@mui/material/CircularProgress';
import { JSXElementConstructor, ReactElement, useState } from 'react';
import { ProductInterface } from '../../service/type';

const { ADMIN_USERNAME, ADMIN_PASSWORD } = ADMIN_INFO;
const { CREATE_PRODUCT_CATEGORY, CREATE_PRODUCT_NAME, CREATE_PRODUCT_PRICE, CREATE_PRODUCT_PRICE_SALE,
  CREATE_PRODUCT_DESCRIPTION, READ_PRODUCT_CATEGORY, UPDATE_PRODUCT_ID, UPDATE_PRODUCT_CATEGORY,
  UPDATE_PRODUCT_NAME, UPDATE_PRODUCT_PRICE, UPDATE_PRODUCT_PRICE_SALE, UPDATE_PRODUCT_DESCRIPTION,
  DELETE_PRODUCT_ID, DELETE_PRODUCT_CATEGORY } = ADMIN_PRODUCT_INFO;
const { GENERAL_INPUT } = INPUT_TYPE;

const Admin = () => {

  const hongMartReducerSelector = useSelector((state: RootState) => state.hongMartReducer);
  const dispatch = useDispatch();

  const onChangeAdminInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(hong_mart_set_admin_info({ inputName: e.target.name, inputValue: e.target.value }));
  };

  const onChangeAdminProductInfo = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(hong_mart_set_admin_product_info({ inputName: e.target.name, inputValue: e.target.value }));
  };

  const onClickAdminSend = () => {
    if (isNotEmptyString(hongMartReducerSelector.adminInfo[ADMIN_USERNAME]) && isNotEmptyString(hongMartReducerSelector.adminInfo[ADMIN_PASSWORD])) {
      dispatch(hong_mart_admin_login_request());
    }
  };

  const [image, setImage] = useState<File | null>(null);
  const [createObjectURL, setCreateObjectURL] = useState<any>(null);

  const onChangeImagePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setCreateObjectURL(URL.createObjectURL(e.target.files[0]));
    } else {
      setImage(null);
      setCreateObjectURL(null);
    }
  };

  const onClickCreateProduct = () => {
    if (isNotEmptyString(hongMartReducerSelector.adminProductInfo[CREATE_PRODUCT_CATEGORY]) &&
      isNotEmptyString(hongMartReducerSelector.adminProductInfo[CREATE_PRODUCT_NAME]) &&
      isNotEmptyString(hongMartReducerSelector.adminProductInfo[CREATE_PRODUCT_PRICE]) &&
      isNotEmptyString(hongMartReducerSelector.adminProductInfo[CREATE_PRODUCT_DESCRIPTION]) &&
      image) {
      dispatch(hong_mart_create_product_request(image));
    }
  };

  const onClickReadProduct = () => {
    if (isNotEmptyString(hongMartReducerSelector.adminProductInfo[READ_PRODUCT_CATEGORY])) {
      dispatch(hong_mart_read_product_request());
    }
  };

  const onClickProduct = (product: ProductInterface) => {
    dispatch(hong_mart_read_set_value_for_update_and_delete(product));
  };

  const onClickUpdateProduct = () => {
    dispatch(hong_mart_update_product_request());
  };

  const onClickDeleteProduct = () => {
    dispatch(hong_mart_delete_product_request());
  };

  if (!hongMartReducerSelector.adminLoginAPI.result) {
    return (
      <div className={styles.container_no_login}>
        <div className={styles.inner_container}>
          <Input
            type={GENERAL_INPUT}
            placeholder="Admin Username"
            name={ADMIN_USERNAME}
            value={hongMartReducerSelector.adminInfo[ADMIN_USERNAME]}
            onChangeInput={onChangeAdminInfo}
            onKeyDownInput={() => { }}
          />
          <Input
            type={GENERAL_INPUT}
            placeholder="Admin Password"
            name={ADMIN_PASSWORD}
            value={hongMartReducerSelector.adminInfo[ADMIN_PASSWORD]}
            onChangeInput={onChangeAdminInfo}
            onKeyDownInput={() => { }}
          />
          <Button
            title={'Send'}
            size={'LARGE'}
            onClickButton={onClickAdminSend}
          />
          <div className={styles.error_message_container}>
            {hongMartReducerSelector.adminLoginAPI.message}
            {hongMartReducerSelector.isLoading && (
              <CircularProgress style={{ color: '#333' }} size={30} />
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container_yes_login}>
      <div className={styles.inner_container}>
        {hongMartReducerSelector.isLoading && (
          <div style={{ position: 'fixed', top: '80px', right: '30px' }}>
            <CircularProgress style={{ color: '#333' }} size={30} />
          </div>
        )}

        <h2>CREATE</h2>

        <div>
          <select className={styles.select_category} defaultValue="none" name={CREATE_PRODUCT_CATEGORY} onChange={onChangeAdminProductInfo}>
            <option value="none" disabled hidden>Select Category</option>
            {Object.values(SHOP_MENU_LIST).map((shopMenu: string): ReactElement<JSXElementConstructor<any>> => {
              return (
                <option key={shopMenu} value={shopMenu}>
                  {shopMenu}
                </option>
              )
            })}
          </select>
        </div>
        <Input
          type={GENERAL_INPUT}
          placeholder="Name"
          name={CREATE_PRODUCT_NAME}
          value={hongMartReducerSelector.adminProductInfo[CREATE_PRODUCT_NAME]}
          onChangeInput={onChangeAdminProductInfo}
          onKeyDownInput={() => { }}
        />
        <Input
          type={GENERAL_INPUT}
          placeholder="Price"
          name={CREATE_PRODUCT_PRICE}
          value={hongMartReducerSelector.adminProductInfo[CREATE_PRODUCT_PRICE]}
          onChangeInput={onChangeAdminProductInfo}
          onKeyDownInput={() => { }}
        />
        <Input
          type={GENERAL_INPUT}
          placeholder="Price Sale (%)"
          name={CREATE_PRODUCT_PRICE_SALE}
          value={hongMartReducerSelector.adminProductInfo[CREATE_PRODUCT_PRICE_SALE]}
          onChangeInput={onChangeAdminProductInfo}
          onKeyDownInput={() => { }}
        />
        <Input
          type={GENERAL_INPUT}
          placeholder="Description"
          name={CREATE_PRODUCT_DESCRIPTION}
          value={hongMartReducerSelector.adminProductInfo[CREATE_PRODUCT_DESCRIPTION]}
          onChangeInput={onChangeAdminProductInfo}
          onKeyDownInput={() => { }}
        />
        <div className={styles.image_upload_container}>
          <img src={createObjectURL} alt={''} className={styles.image_upload_preview} />
          <input type="file" name="myImage" onChange={onChangeImagePreview} />
        </div>
        <Button
          title={'Create Product'}
          size={'LARGE'}
          onClickButton={onClickCreateProduct}
        />
        <div className={styles.error_message_container}>
          {hongMartReducerSelector.createProductAPI.message}
        </div>

        <div className={styles.boundary_line}></div>

        <h2>READ</h2>
        <div>
          <select className={styles.select_category} defaultValue="none" name={READ_PRODUCT_CATEGORY} onChange={onChangeAdminProductInfo}>
            <option value="none" disabled hidden>Select Category</option>
            {Object.values(SHOP_MENU_LIST).map((shopMenu: string): ReactElement<JSXElementConstructor<any>> => {
              return (
                <option key={shopMenu} value={shopMenu}>
                  {shopMenu}
                </option>
              )
            })}
          </select>
        </div>
        <Button
          title={'Read Product'}
          size={'LARGE'}
          onClickButton={onClickReadProduct}
        />
        <div className={styles.error_message_container}>
          {hongMartReducerSelector.readProductAPI.message}
        </div>

        {hongMartReducerSelector.readProductAPI.result && (
          <div className={styles.readProduct_container}>
            {hongMartReducerSelector.readProductAPI.result.map((product: ProductInterface): ReactElement<JSXElementConstructor<any>> => {
              return (
                <div key={product._id} onClick={() => onClickProduct(product)}>
                  {product.productName}
                </div>
              )
            })}
          </div>
        )}

        <div className={styles.boundary_line}></div>

        <h2>UPDATE</h2>

        <h3>{hongMartReducerSelector.adminProductInfo[UPDATE_PRODUCT_ID]} - {hongMartReducerSelector.adminProductInfo[UPDATE_PRODUCT_CATEGORY]}</h3>
        <Input
          type={GENERAL_INPUT}
          placeholder="Product Name"
          name={UPDATE_PRODUCT_NAME}
          value={hongMartReducerSelector.adminProductInfo[UPDATE_PRODUCT_NAME]}
          onChangeInput={onChangeAdminProductInfo}
          onKeyDownInput={() => { }}
        />
        <Input
          type={GENERAL_INPUT}
          placeholder="Product Price"
          name={UPDATE_PRODUCT_PRICE}
          value={hongMartReducerSelector.adminProductInfo[UPDATE_PRODUCT_PRICE]}
          onChangeInput={onChangeAdminProductInfo}
          onKeyDownInput={() => { }}
        />
        <Input
          type={GENERAL_INPUT}
          placeholder="Product Price Sale (%)"
          name={UPDATE_PRODUCT_PRICE_SALE}
          value={hongMartReducerSelector.adminProductInfo[UPDATE_PRODUCT_PRICE_SALE]}
          onChangeInput={onChangeAdminProductInfo}
          onKeyDownInput={() => { }}
        />
        <Input
          type={GENERAL_INPUT}
          placeholder="Product Description"
          name={UPDATE_PRODUCT_DESCRIPTION}
          value={hongMartReducerSelector.adminProductInfo[UPDATE_PRODUCT_DESCRIPTION]}
          onChangeInput={onChangeAdminProductInfo}
          onKeyDownInput={() => { }}
        />
        <Button
          title={'Update Product'}
          size={'LARGE'}
          onClickButton={onClickUpdateProduct}
        />
        <div className={styles.error_message_container}>
          {hongMartReducerSelector.updateProductAPI.message}
        </div>

        <div className={styles.boundary_line}></div>

        <h2>DELETE</h2>

        <Input
          type={GENERAL_INPUT}
          placeholder="Product ID"
          name={DELETE_PRODUCT_ID}
          value={hongMartReducerSelector.adminProductInfo[DELETE_PRODUCT_ID]}
          onChangeInput={onChangeAdminProductInfo}
          onKeyDownInput={() => { }}
        />
        <Input
          type={GENERAL_INPUT}
          placeholder="Product Category"
          name={DELETE_PRODUCT_CATEGORY}
          value={hongMartReducerSelector.adminProductInfo[DELETE_PRODUCT_CATEGORY]}
          onChangeInput={onChangeAdminProductInfo}
          onKeyDownInput={() => { }}
        />
        <Button
          title={'Delete Product'}
          size={'LARGE'}
          onClickButton={onClickDeleteProduct}
        />

        <div className={styles.error_message_container}>
          {hongMartReducerSelector.deleteProductAPI.message}
        </div>
      </div>
    </div>
  )
};

export default Admin;
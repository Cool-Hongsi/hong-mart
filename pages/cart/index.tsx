import { useState } from 'react';
import styles from '../../styles/componentStyles/Cart.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/modules/rootReducer';
import { CartInterface, DialogInterface } from '../../service/type';
import { RESPONSIVE_CONST, CART_DIALOG, SESSION_STATUS } from '../../service/const/generalConst';
import Button from '../../components/button/button';
import { deleteAllCart, deleteOneCart } from '../../service/util/localStorage';
import { hong_mart_delete_all_cart_info, hong_mart_delete_one_cart_info } from '../../store/modules/hongmart/hongmartAction';
import { calculateSubTotalPrice, calculateEstimatedTaxPrice, calculateEstimatedTotalPrice } from '../../service/util/general';
import DialogComponent from '../../components/dialog/dialog';
import { getCurrentDeviceSize } from '../../service/util/responsive';
import TableComponent from '../../components/table/table';
import { useSession } from "next-auth/react";
import { sessionCheck } from '../../service/util/sessionCheck';
import { useRouter } from 'next/router';
import { ROUTE_CONST } from '../../service/const/routeConst';

const { MOBILE } = RESPONSIVE_CONST;
const { DELETE_ALL, DELETE_ONE } = CART_DIALOG;
const { UNAUTHENTICATED_RESULT } = SESSION_STATUS;
const { AUTH, CHECKOUT } = ROUTE_CONST;

const Cart = () => {

  const router = useRouter();
  const { data: session, status } = useSession();

  const isMobileSize = getCurrentDeviceSize(MOBILE);

  const hongMartReducerSelector = useSelector((state: RootState) => state.hongMartReducer);
  const dispatch = useDispatch();

  const [dialogToggle, setDialogToggle] = useState<DialogInterface>({
    dialogShow: false, // Show dialog or not
    dialogType: '', // Delete all or Delete one
    dialogTitle: '', // Dialog title
    dialogDesc: '', // Dialog desc
    dialogSelectedProductId: '', // Selected Product ID for deleting one itme
  });

  const onCloseDialog = () => {
    setDialogToggle({ ...dialogToggle, dialogShow: false, dialogType: '', dialogTitle: '', dialogDesc: '', dialogSelectedProductId: '' });
  };

  // Open dialog with delete all
  const onClickDeleteAllCart = () => {
    setDialogToggle({
      ...dialogToggle,
      dialogShow: true,
      dialogType: DELETE_ALL,
      dialogTitle: 'Are you sure to delete all product list ?',
      dialogDesc: 'All product list you added will be deleted.',
      dialogSelectedProductId: ''
    });
  };

  // Open dialog with delete one
  const onClickDeleteOneCart = (cart: CartInterface) => {
    setDialogToggle({
      ...dialogToggle,
      dialogShow: true,
      dialogType: DELETE_ONE,
      dialogTitle: `Are you sure to delete ${cart.productName}?`,
      dialogDesc: `${cart.productName} you added will be removed.`,
      dialogSelectedProductId: cart._id
    });
  };

  const onClickYesDialog = (dialogType: string, dialogSelectedProductId: string) => {
    onCloseDialog();

    if (dialogType === DELETE_ALL) {
      // Local Storage
      deleteAllCart();
      // Redux State
      dispatch(hong_mart_delete_all_cart_info());
    }
    else if (dialogType === DELETE_ONE) {
      // Local Storage
      deleteOneCart(dialogSelectedProductId);
      // Redux State
      dispatch(hong_mart_delete_one_cart_info(dialogSelectedProductId));
    }
  };

  const onClickCheckOutButton = () => {
    const currentSessionStatus = sessionCheck(session, status);

    // Need to sign in
    if (currentSessionStatus === UNAUTHENTICATED_RESULT) {
      router.push(AUTH);
    }
    // Already signed in (currentSessionStatus === AUTHENTICATED_RESULT)
    else {
      router.push(CHECKOUT);
    }
  };

  return (
    <div className={styles.container}>
      {hongMartReducerSelector.cartInfo.length > 0
        ?
        <div className={styles.inner_container}>
          <div>
            <div className={styles.cart_title_and_delete_container}>
              <div className={styles.cart_title}>
                CART
              </div>
              <Button
                title={'Delete All'}
                size={'MEDIUM'}
                onClickButton={onClickDeleteAllCart}
              />
            </div>

            <TableComponent
              theadList={(!isMobileSize)
                ? ["", "Name", "Quantity", "Price", "Total", ""]
                : ["Name", "Quantity", "Price", "Total", ""] /* No show image in mobile size */
              }
              tbodyList={hongMartReducerSelector.cartInfo}
              onClickButton={onClickDeleteOneCart}
            />

          </div>
          <div className={styles.total_price_container}>
            <div>
              <span>SUBTOTAL</span>
              <span>${calculateSubTotalPrice(hongMartReducerSelector.cartInfo).toFixed(2)}</span>
            </div>
            <div>
              <span>ESTIMATED TAX (13%)</span>
              <span>${calculateEstimatedTaxPrice(hongMartReducerSelector.cartInfo).toFixed(2)}</span>
            </div>
            <div>
              <span>ESTIMATED TOTAL</span>
              <span>${calculateEstimatedTotalPrice(hongMartReducerSelector.cartInfo).toFixed(2)}</span>
            </div>
            <div className={styles.check_out_button} onClick={onClickCheckOutButton}>
              Go To Checkout
            </div>
          </div>

        </div>
        :
        <div className={styles.inner_container_empty_cart}>
          No product list in cart
        </div>
      }

      {dialogToggle.dialogShow && (
        <DialogComponent
          dialogShow={dialogToggle.dialogShow}
          dialogType={dialogToggle.dialogType}
          dialogTitle={dialogToggle.dialogTitle}
          dialogDesc={dialogToggle.dialogDesc}
          dialogSelectedProductId={dialogToggle.dialogSelectedProductId}
          onCloseDialog={onCloseDialog}
          onClickYesDialog={onClickYesDialog}
        />
      )}
    </div>
  )
};

export default Cart;
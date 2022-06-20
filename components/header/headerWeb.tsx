import styles from '../../styles/componentStyles/Header.module.scss';
import { JSXElementConstructor, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { INPUT_TYPE, SEARCH_INFO, SHOP_MENU_LIST } from '../../service/const/generalConst';
import { RootState } from '../../store/modules/rootReducer';
import { useRouter } from 'next/router';
import { ROUTE_CONST } from '../../service/const/routeConst';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Input from '../input/input';
import Button from '../button/button';
import { sessionCheck } from '../../service/util/sessionCheck';
import { HeaderInterface } from '../../service/type';

const { SEARCH_INFO_INPUT } = SEARCH_INFO;
const { SEARCH_INPUT } = INPUT_TYPE;
const { SHOP } = ROUTE_CONST;

const HeaderWeb = ({ gotoCartPage, onClickCloseSearchContainer, onChangeSearchInput, onClickSearchIcon,
  onKeyDownSearchInput, onClickSearch, onClickAuthButton, session, status }: HeaderInterface) => {

  const router = useRouter();

  const hongMartReducerSelector = useSelector((state: RootState) => state.hongMartReducer);

  const onMouseEnterShopButton = () => {
    onClickCloseSearchContainer();
    const shopSubMenuSelector = document.querySelector(`.${styles.shop_sub_menu}`) as HTMLElement | null;
    shopSubMenuSelector!.style.visibility = 'visible';
    shopSubMenuSelector!.style.width = '202px';
  };

  const onMouseLeaveShopButton = () => {
    const shopSubMenuSelector = document.querySelector(`.${styles.shop_sub_menu}`) as HTMLElement | null;
    shopSubMenuSelector!.style.visibility = 'hidden';
    shopSubMenuSelector!.style.width = '0px';
  };

  const onClickShopCategory = (shopMenu: string) => {
    onClickCloseSearchContainer();
    router.push(SHOP + '/' + shopMenu);
  };

  return (
    <nav className={styles.navigation}>
      <div className={styles.shop_button} onMouseEnter={onMouseEnterShopButton} onMouseLeave={onMouseLeaveShopButton}>
        Shop
        <div className={styles.shop_sub_menu}>
          {Object.values(SHOP_MENU_LIST).map((shopMenu: string): ReactElement<JSXElementConstructor<any>> => {
            return (
              <div key={shopMenu} onClick={(e) => {
                e.stopPropagation();
                onClickShopCategory(shopMenu);
              }}>
                {shopMenu.charAt(0).toLocaleUpperCase() + shopMenu.substring(1, shopMenu.length)}
              </div>
            )
          })}
        </div>
      </div>

      <div className={styles.search_icon_container}>
        <SearchIcon className={styles.search_icon} onClick={onClickSearchIcon} />
        <div className={styles.search_container}>
          <Input
            type={SEARCH_INPUT}
            isNumber={false}
            placeholder={'Type Search'}
            name={SEARCH_INFO_INPUT}
            value={hongMartReducerSelector.searchInfo[SEARCH_INFO_INPUT]}
            onChangeInput={onChangeSearchInput}
            onKeyDownInput={onKeyDownSearchInput}
          />
          <div className={styles.search_container_bottom}>
            <button onClick={onClickCloseSearchContainer}>
              <CloseIcon className={styles.close_icon} />
            </button>
            <button onClick={onClickSearch}>
              Search
            </button>
          </div>
        </div>
      </div>

      <button className={styles.cart_icon_container} onClick={gotoCartPage}>
        <ShoppingCartOutlinedIcon className={styles.cart_icon} />
        {hongMartReducerSelector.cartInfo.length > 0 && (
          <div className={styles.cart_count}>
            {hongMartReducerSelector.cartInfo.length}
          </div>
        )}
      </button>

      <Button
        title={sessionCheck(session, status)}
        size={"SMALL"}
        onClickButton={onClickAuthButton}
      />
    </nav>
  )
};

export default HeaderWeb;

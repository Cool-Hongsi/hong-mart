import styles from '../../styles/componentStyles/Header.module.scss';
import { useSelector } from 'react-redux';
import { SEARCH_INFO, INPUT_TYPE, SHOP_MENU_LIST } from '../../service/const/generalConst';
import { RootState } from '../../store/modules/rootReducer';
import { useRouter } from 'next/router';
import { ROUTE_CONST } from '../../service/const/routeConst';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { JSXElementConstructor, ReactElement, useRef } from 'react';
import Input from '../input/input';
import Button from '../button/button';
import { sessionCheck } from '../../service/util/sessionCheck';
import { HeaderInterface } from '../../service/type';

const { SEARCH_INFO_INPUT } = SEARCH_INFO;
const { SEARCH_INPUT } = INPUT_TYPE;
const { SHOP } = ROUTE_CONST;

const HeaderMobile = ({ gotoCartPage, onClickCloseSearchContainer, onChangeSearchInput, onClickSearchIcon,
  onKeyDownSearchInput, onClickSearch, onClickAuthButton, session, status }: HeaderInterface) => {

  const router = useRouter();
  const shopSubMenuRef = useRef<HTMLDivElement>(null);

  const hongMartReducerSelector = useSelector((state: RootState) => state.hongMartReducer);

  const onClickMenuIcon = () => {
    const shopSubMenuSelector = document.querySelector(`.${styles.top_bar_mobile}`) as HTMLElement | null;
    shopSubMenuSelector!.style.top = "0px";
    shopSubMenuRef.current!.focus();
  };

  const onBlurMenuIcon = () => {
    const shopSubMenuSelector = document.querySelector(`.${styles.top_bar_mobile}`) as HTMLElement | null;
    shopSubMenuSelector!.style.top = "-60px";
  };

  const onClickShopCategory = (shopMenu: string) => {
    onClickCloseSearchContainer();
    router.push(SHOP + '/' + shopMenu);
    const shopSubMenuSelector = document.querySelector(`.${styles.top_bar_mobile}`) as HTMLElement | null;
    shopSubMenuSelector!.style.top = "-60px";
  };

  return (
    <div className={styles.navigation}>
      <div className={styles.cart_icon_container} onClick={gotoCartPage}>
        <ShoppingCartOutlinedIcon className={styles.cart_icon} />
        {hongMartReducerSelector.cartInfo.length > 0 && (
          <div className={styles.cart_count}>
            {hongMartReducerSelector.cartInfo.length}
          </div>
        )}
      </div>
      <MenuIcon className={styles.menu_icon} onClick={onClickMenuIcon} />
      <div className={styles.top_bar_mobile} ref={shopSubMenuRef} tabIndex={0} onBlur={onBlurMenuIcon}>
        <div className={styles.shop_each_mobile}>
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
                <div onClick={onClickCloseSearchContainer}>
                  <CloseIcon className={styles.close_icon} />
                </div>
                <div onClick={onClickSearch}>
                  Search
                </div>
              </div>
            </div>
          </div>
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
        <Button
          title={sessionCheck(session, status)}
          size={"SMALL"}
          onClickButton={onClickAuthButton}
        />
      </div>
    </div>
  )
};

export default HeaderMobile;

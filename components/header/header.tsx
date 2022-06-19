import { JSXElementConstructor, ReactElement, useEffect, useRef } from 'react';
import styles from '../../styles/componentStyles/Header.module.scss';
import { getCurrentDeviceSize } from '../../service/util/responsive';
import { RESPONSIVE_CONST } from '../../service/const/generalConst';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { signOut, useSession } from "next-auth/react";
import { sessionCheck } from '../../service/util/sessionCheck';
import { SHOP_MENU_LIST, SESSION_STATUS, SEARCH_INFO, INPUT_TYPE } from '../../service/const/generalConst';
import { ROUTE_CONST } from '../../service/const/routeConst';
import { useRouter } from 'next/router';
import Button from '../button/button';
import { getFromCart } from '../../service/util/localStorage';
import { RootState } from '../../store/modules/rootReducer';
import { useSelector, useDispatch } from 'react-redux';
import {
  hong_mart_set_initial_cart_info, hong_mart_set_search_info,
  hong_mart_initialize_search_info,
} from '../../store/modules/hongmart/hongmartAction';
import Input from '../input/input';
import CloseIcon from '@mui/icons-material/Close';

const { LOADING_RESULT, UNAUTHENTICATED_RESULT } = SESSION_STATUS;
const { HOME, AUTH, SHOP, CART, SEARCH } = ROUTE_CONST;
const { MOBILE } = RESPONSIVE_CONST;
const { SEARCH_INFO_INPUT } = SEARCH_INFO;
const { SEARCH_INPUT } = INPUT_TYPE;

const Header = () => {
  const hongMartReducerSelector = useSelector((state: RootState) => state.hongMartReducer);
  const dispatch = useDispatch();
  const router = useRouter();

  const { data: session, status } = useSession();
  // console.log(session);
  // console.log(status);

  const isMobileSize = getCurrentDeviceSize(MOBILE);
  const shopSubMenuRefForMobile = useRef<HTMLDivElement>(null);

  let previousScroll = 0;

  const controlDirection = () => {
    const navigationSelector = document.querySelector(`.${styles.container}`) as HTMLElement | null;

    // Scroll Down
    if (window.scrollY > previousScroll) {
      navigationSelector!.style.top = "-60px";
    }
    // Scroll Up
    else {
      navigationSelector!.style.top = "0";
    }

    previousScroll = window.scrollY;
  };

  useEffect(() => {
    window.addEventListener('scroll', controlDirection);
    return () => {
      window.removeEventListener('scroll', controlDirection);
    }
  }, []);

  // Executed only once
  useEffect(() => {
    // NextJS is server side rendering.
    // Can NOT find localStorage object and window object until client side is mounted
    // So, need to check typeof like below
    if (typeof window !== 'undefined') {
      dispatch(hong_mart_set_initial_cart_info(getFromCart() ?? []));
    }
  }, [dispatch]);

  // For Mobile
  const onClickMenuIcon = () => {
    const shopSubMenuSelectorForMobile = document.querySelector(`.${styles.top_bar_mobile}`) as HTMLElement | null;
    shopSubMenuSelectorForMobile!.style.top = "0px";
    shopSubMenuRefForMobile.current!.focus();
  };

  // For Mobile
  const onBlurMenuIcon = () => {
    const shopSubMenuSelectorForMobile = document.querySelector(`.${styles.top_bar_mobile}`) as HTMLElement | null;
    shopSubMenuSelectorForMobile!.style.top = "-60px";
  };

  // For Web
  const onMouseEnterShopButton = () => {
    onClickCloseSearchContainer();
    const shopSubMenuSelector = document.querySelector(`.${styles.shop_sub_menu}`) as HTMLElement | null;
    shopSubMenuSelector!.style.visibility = 'visible';
    shopSubMenuSelector!.style.width = '202px';
  };

  // For Web
  const onMouseLeaveShopButton = () => {
    const shopSubMenuSelector = document.querySelector(`.${styles.shop_sub_menu}`) as HTMLElement | null;
    shopSubMenuSelector!.style.visibility = 'hidden';
    shopSubMenuSelector!.style.width = '0px';
  };

  const onClickAuthButton = () => {
    onClickCloseSearchContainer();
    const currentSessionStatus = sessionCheck(session, status);

    if (currentSessionStatus === LOADING_RESULT) {
      // Nothing To Do
    } else if (currentSessionStatus === UNAUTHENTICATED_RESULT) {
      if (isMobileSize) {
        const shopSubMenuSelectorForMobile = document.querySelector(`.${styles.top_bar_mobile}`) as HTMLElement | null;
        shopSubMenuSelectorForMobile!.style.top = "-60px";
      }
      router.push(AUTH);
    } else { // currentSessionStatus === AUTHENTICATED_RESULT
      signOut({
        callbackUrl: HOME
      });
    }
  };

  const onClickLogo = () => {
    onClickCloseSearchContainer();
    router.push(HOME);
  };

  const gotoCartPage = () => {
    onClickCloseSearchContainer();
    router.push(CART);
  };

  // For Web
  const onClickShopCategoryForWeb = (shopMenu: string) => {
    onClickCloseSearchContainer();
    router.push(SHOP + '/' + shopMenu);
  };

  // For Mobile
  const onClickShopCategoryForMobile = (shopMenu: string) => {
    onClickCloseSearchContainer();
    router.push(SHOP + '/' + shopMenu);
    const shopSubMenuSelectorForMobile = document.querySelector(`.${styles.top_bar_mobile}`) as HTMLElement | null;
    shopSubMenuSelectorForMobile!.style.top = "-60px";
  };

  const onClickSearchIcon = () => {
    const searchContainerSelector = document.querySelector(`.${styles.search_container}`) as HTMLElement | null;
    searchContainerSelector!.style.visibility = "visible";
  };

  const onClickCloseSearchContainer = () => {
    const searchContainerSelector = document.querySelector(`.${styles.search_container}`) as HTMLElement | null;
    searchContainerSelector!.style.visibility = "hidden";

    // Initialize search input
    if (hongMartReducerSelector.searchInfo[SEARCH_INFO_INPUT]) {
      dispatch(hong_mart_initialize_search_info());
    }
  }

  const onClickSearch = () => {
    if (hongMartReducerSelector.searchInfo[SEARCH_INFO_INPUT]) {
      onClickCloseSearchContainer();
      router.push({ pathname: SHOP + SEARCH, query: { searchby: hongMartReducerSelector.searchInfo[SEARCH_INFO_INPUT] } });
    }
  };

  const onKeyDownSearchInput = (e: KeyboardEvent) => {
    (e.key === 'Enter') && onClickSearch();
  }

  const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(hong_mart_set_search_info({ inputName: e.target.name, inputValue: e.target.value }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.inside_container}>
        <div className={styles.logo} onClick={onClickLogo}>
          HONG MART
        </div>

        {isMobileSize
          /* MOBILE */
          ?
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
            <div className={styles.top_bar_mobile} ref={shopSubMenuRefForMobile} tabIndex={0} onBlur={onBlurMenuIcon}>
              <div className={styles.shop_each_mobile}>
                <div className={styles.search_icon_container}>
                  <SearchIcon className={styles.search_icon} onClick={onClickSearchIcon} />
                  <div className={styles.search_container}>
                    <Input
                      type={SEARCH_INPUT}
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
                      onClickShopCategoryForMobile(shopMenu);
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
          :
          /* WEB */
          <div className={styles.navigation}>
            <div className={styles.shop_button} onMouseEnter={onMouseEnterShopButton} onMouseLeave={onMouseLeaveShopButton}>
              Shop
              <div className={styles.shop_sub_menu}>
                {Object.values(SHOP_MENU_LIST).map((shopMenu: string): ReactElement<JSXElementConstructor<any>> => {
                  return (
                    <div key={shopMenu} onClick={(e) => {
                      e.stopPropagation();
                      onClickShopCategoryForWeb(shopMenu);
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

            <div className={styles.cart_icon_container} onClick={gotoCartPage}>
              <ShoppingCartOutlinedIcon className={styles.cart_icon} />
              {hongMartReducerSelector.cartInfo.length > 0 && (
                <div className={styles.cart_count}>
                  {hongMartReducerSelector.cartInfo.length}
                </div>
              )}
            </div>

            <Button
              title={sessionCheck(session, status)}
              size={"SMALL"}
              onClickButton={onClickAuthButton}
            />
          </div>
        }
      </div>
    </div >
  )
};

export default Header;
import styles from '../../styles/componentStyles/Header.module.scss';
import { useCallback, useEffect } from 'react';
import { getCurrentDeviceSize } from '../../service/util/responsive';
import { RESPONSIVE_CONST } from '../../service/const/generalConst';
import { signOut, useSession } from "next-auth/react";
import { sessionCheck } from '../../service/util/sessionCheck';
import { SESSION_STATUS, SEARCH_INFO } from '../../service/const/generalConst';
import { ROUTE_CONST } from '../../service/const/routeConst';
import { useRouter } from 'next/router';
import { getFromCart } from '../../service/util/localStorage';
import { RootState } from '../../store/modules/rootReducer';
import { useSelector, useDispatch } from 'react-redux';
import {
  hong_mart_set_initial_cart_info, hong_mart_set_search_info,
  hong_mart_initialize_search_info,
} from '../../store/modules/hongmart/hongmartAction';
import HeaderMobile from './headerMobile';
import HeaderWeb from './headerWeb';

const { LOADING_RESULT, UNAUTHENTICATED_RESULT } = SESSION_STATUS;
const { HOME, AUTH, SHOP, CART, SEARCH } = ROUTE_CONST;
const { MOBILE } = RESPONSIVE_CONST;
const { SEARCH_INFO_INPUT } = SEARCH_INFO;

const Header = () => {
  const hongMartReducerSelector = useSelector((state: RootState) => state.hongMartReducer);
  const dispatch = useDispatch();
  const router = useRouter();

  const { data: session, status } = useSession();
  // console.log(session);
  // console.log(status);

  const isMobileSize = getCurrentDeviceSize(MOBILE);

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

  // Executed only once (To load localStorage cart data at initial loading)
  useEffect(() => {
    // NextJS is server side rendering.
    // Can NOT find localStorage object and window object until client side is mounted
    // So, need to check typeof like below
    if (typeof window !== 'undefined') {
      dispatch(hong_mart_set_initial_cart_info(getFromCart() ?? []));
    }
  }, [dispatch]);

  const onClickLogo = () => {
    onClickCloseSearchContainer();
    router.push(HOME);
  };

  const onClickCloseSearchContainer = () => {
    const searchContainerSelector = document.querySelector(`.${styles.search_container}`) as HTMLElement | null;
    searchContainerSelector!.style.visibility = "hidden";

    // Initialize search input
    if (hongMartReducerSelector.searchInfo[SEARCH_INFO_INPUT]) {
      dispatch(hong_mart_initialize_search_info());
    }
  };

  const gotoCartPage = () => {
    onClickCloseSearchContainer();
    router.push(CART);
  };

  const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(hong_mart_set_search_info({ inputName: e.target.name, inputValue: e.target.value }));
  };

  const onClickSearchIcon = () => {
    const searchContainerSelector = document.querySelector(`.${styles.search_container}`) as HTMLElement | null;
    searchContainerSelector!.style.visibility = "visible";
  };

  const onKeyDownSearchInput = (e: KeyboardEvent) => {
    (e.key === 'Enter') && onClickSearch();
  };

  const onClickSearch = () => {
    if (hongMartReducerSelector.searchInfo[SEARCH_INFO_INPUT]) {
      onClickCloseSearchContainer();
      router.push({ pathname: SHOP + SEARCH, query: { searchby: hongMartReducerSelector.searchInfo[SEARCH_INFO_INPUT] } });
    }
  };

  const onClickAuthButton = useCallback(() => {
    onClickCloseSearchContainer();
    const currentSessionStatus = sessionCheck(session, status);

    if (currentSessionStatus === LOADING_RESULT) {
      // Nothing To Do
    } else if (currentSessionStatus === UNAUTHENTICATED_RESULT) {
      if (isMobileSize) {
        const shopSubMenuSelector = document.querySelector(`.${styles.top_bar_mobile}`) as HTMLElement | null;
        shopSubMenuSelector!.style.top = "-60px";
      }
      router.push(AUTH);
    } else { // currentSessionStatus === AUTHENTICATED_RESULT
      signOut({
        callbackUrl: HOME
      });
    }
  }, [session]);

  return (
    <header className={styles.container}>
      <div className={styles.inside_container}>
        <div className={styles.logo} onClick={onClickLogo}>
          HONG MART
        </div>

        {/* Basically, Mobile version header & Web version header were in one file... => NOT readable */}
        {isMobileSize
          ?
          /* MOBILE (Same props with HeaderWeb, those props can be used both components, inside, functions and ui are different) */
          <HeaderMobile
            gotoCartPage={gotoCartPage}
            onClickCloseSearchContainer={onClickCloseSearchContainer}
            onChangeSearchInput={onChangeSearchInput}
            onClickSearchIcon={onClickSearchIcon}
            onKeyDownSearchInput={onKeyDownSearchInput}
            onClickSearch={onClickSearch}
            onClickAuthButton={onClickAuthButton}
            session={session}
            status={status}
          />
          :
          /* WEB (Same props with HeaderMobile, those props can be used both components, inside, functions and ui are different) */
          <HeaderWeb
            gotoCartPage={gotoCartPage}
            onClickCloseSearchContainer={onClickCloseSearchContainer}
            onChangeSearchInput={onChangeSearchInput}
            onClickSearchIcon={onClickSearchIcon}
            onKeyDownSearchInput={onKeyDownSearchInput}
            onClickSearch={onClickSearch}
            onClickAuthButton={onClickAuthButton}
            session={session}
            status={status}
          />
        }
      </div>
    </header>
  )
};

export default Header;
import { useMediaQuery } from '@mui/material';
import { RESPONSIVE_CONST } from '../const/generalConst';

const { MOBILE, TABLET, DESKTOP } = RESPONSIVE_CONST;

const mobileSize = '768px';
const tabletSize = '1200px';
const desktopSize = '1201px';

export const getCurrentDeviceSize = (device: string) => {
  switch (device) {
    case MOBILE:
      return useMediaQuery(`@media screen and (max-width: ${mobileSize})`);
    case TABLET:
      return useMediaQuery(`@media screen and (min-width: ${mobileSize}) and (max-width: ${tabletSize})`);
    case DESKTOP:
      return useMediaQuery(`@media screen and (min-width: ${tabletSize})`);
    default:
      return false;
  };
};
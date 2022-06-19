import Snackbar from '@mui/material/Snackbar';
import { SnackbarInterface } from '../../service/type';

const SnackBarComponent = ({ snackbarOpen, snackbarClose, snackbarMessage }: SnackbarInterface) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={snackbarOpen}
      onClose={snackbarClose}
      message={snackbarMessage}
      key={'snackbar'}
      autoHideDuration={3000}
    />
  )
};

export default SnackBarComponent;
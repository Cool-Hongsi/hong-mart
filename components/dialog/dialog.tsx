import styles from '../../styles/componentStyles/Dialog.module.scss';
import React from 'react';
import Dialog from '@mui/material/Dialog';
import { DialogInterface } from '../../service/type';

const DialogComponent = ({ dialogShow, dialogType, dialogTitle, dialogDesc, dialogSelectedProductId, 
  onCloseDialog, onClickYesDialog }: DialogInterface) => {
  return(
    <>
      <Dialog
        open={dialogShow}
        onClose={onCloseDialog}
        transitionDuration={0}
      >
        <div className={styles.container}>
          <div className={styles.dialog_title}>
            {dialogTitle}
          </div>
          <div className={styles.dialog_desc}>
            {dialogDesc}
          </div>
          
          <div className={styles.dialog_button_container}>
            <div className={styles.dialog_yes_button} onClick={() => onClickYesDialog!(dialogType, dialogSelectedProductId)}>
              YES
            </div>
            <div className={styles.dialog_no_button} onClick={onCloseDialog}>
              NO
            </div>
          </div>
        </div>
      </Dialog>
    </>
  )
};

export default DialogComponent;

// export default function AlertDialog() {
//   const [open, setOpen] = React.useState(false);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
    
//   );
// }

import styles from '../../styles/componentStyles/Dialog.module.scss';
import React from 'react';
import Dialog from '@mui/material/Dialog';
import { DialogInterface } from '../../service/type';

const DialogComponent = ({ dialogShow, dialogType, dialogTitle, dialogDesc, dialogSelectedProductId,
  onCloseDialog, onClickYesDialog }: DialogInterface) => {
  return (
    <>
      <Dialog
        open={dialogShow}
        onClose={onCloseDialog}
        transitionDuration={0}
      >
        <div className={styles.container}>
          <p className={styles.dialog_title}>
            {dialogTitle}
          </p>
          <p className={styles.dialog_desc}>
            {dialogDesc}
          </p>

          <div className={styles.dialog_button_container}>
            <button className={styles.dialog_yes_button} onClick={() => onClickYesDialog!(dialogType, dialogSelectedProductId)}>
              YES
            </button>
            <button className={styles.dialog_no_button} onClick={onCloseDialog}>
              NO
            </button>
          </div>
        </div>
      </Dialog>
    </>
  )
};

export default DialogComponent;

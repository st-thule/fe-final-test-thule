import React from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '@app/store';
import { closeModal } from '@app/store/modal/action/modalAction';
import { Button } from '@shared/components/partials/Button';
import { ModalTypes } from '@shared/utils/modalTypes';

export const ModalComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isOpen, modalType, modalProps } = useSelector(
    (state: RootState) => state.modal
  );

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => dispatch(closeModal())}
      contentLabel="Modal"
      className="modal"
      overlayClassName="modal-overlay"
    >
      {modalType === ModalTypes.CONFIRM && (
        <div className="modal-confirm">
          <div className="modal-content">
            <h3 className="modal-title">{modalProps.title}</h3>
            <p className="modal-message">{modalProps.message}</p>
            <div className="modal-action">
              <Button
                className="btn btn-primary btn-agree"
                label="Yes"
                onClick={() => {
                  if (modalProps?.onConfirm) {
                    modalProps.onConfirm();
                  }
                  dispatch(closeModal());
                }}
              />
              <Button
                className="btn btn-primary btn-no"
                label="No"
                onClick={() => dispatch(closeModal())}
              />
            </div>
          </div>
        </div>
      )}

      {modalType === ModalTypes.USER_FORM && <></>}
    </Modal>
  );
};

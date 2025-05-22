import React from 'react';
import Modal from 'react-modal';

import { Button } from './partials';
import { ModalTypes } from '@shared/types/enum';

interface ModalProps {
  type: ModalTypes;
  isOpen?: boolean;
  title?: string;
  message?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  children?: React.ReactNode;
}

export const ModalComponent: React.FC<ModalProps> = ({
  type,
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmLabel = 'Yes',
  cancelLabel = 'No',
  children,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCancel}
      contentLabel={title}
      className="modal"
      overlayClassName="modal-overlay"
      ariaHideApp={false}
    >
      <div className="modal-confirm">
        <div className="modal-dialog">
          <div className="modal-content">
            {title && <h3 className="modal-title">{title}</h3>}
            {type === ModalTypes.CONFIRM && message && (
              <p className="modal-body">{message}</p>
            )}
            {children}
            {type === ModalTypes.CONFIRM && (
              <div className="modal-action">
                <>
                  <Button
                    className="btn btn-primary btn-agree"
                    label={confirmLabel}
                    onClick={onConfirm}
                  />
                  <Button
                    className="btn btn-primary btn-no"
                    label={cancelLabel}
                    onClick={onCancel}
                  />
                </>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

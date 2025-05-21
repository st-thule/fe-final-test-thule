import React from 'react';
import Modal from 'react-modal';
import { Button } from './partials';

interface ModalProps {
  isOpen?: boolean;
  title?: string;
  message?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  children?: React.ReactNode;
}

export const ModalComponent: React.FC<ModalProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
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
            <h3 className="modal-title">{title}</h3>
            {message && <p className="modal-body">{message}</p>}
            {children}
            <div className="modal-action">
              <Button
                className="btn btn-primary btn-agree"
                label="Yes"
                onClick={onConfirm}
              />
              <Button
                className="btn btn-primary btn-no"
                label="No"
                onClick={onCancel}
              />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

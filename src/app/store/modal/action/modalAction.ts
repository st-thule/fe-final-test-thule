import { Action } from 'redux';

import {
  CLOSE_MODAL,
  OPEN_MODAL,
} from '@app/store/modal/action/type/modalActionTypes';
import { ModalTypes } from '@shared/utils/modalTypes';

export interface OpenModalPayload {
  modalType: ModalTypes;
  modalProps?: any;
}

export interface OpenModalAction extends Action<typeof OPEN_MODAL> {
  payload: OpenModalPayload;
  [key: string]: any;
}

export interface CloseModalAction extends Action<typeof CLOSE_MODAL> {
  [key: string]: any;
}

export const openModal = (payload: OpenModalPayload): OpenModalAction => ({
  type: OPEN_MODAL,
  payload,
});

export const closeModal = (): CloseModalAction => ({
  type: CLOSE_MODAL,
});

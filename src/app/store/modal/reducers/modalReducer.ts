import {
  CloseModalAction,
  OpenModalAction,
} from '@app/store/modal/action/modalAction';
import {
  CLOSE_MODAL,
  OPEN_MODAL,
} from '@app/store/modal/action/type/modalActionTypes';
import { ModalTypes } from '@shared/utils/modalTypes';

interface ModalState {
  isOpen: boolean;
  modalType: ModalTypes;
  modalProps: any;
}

const initialState: ModalState = {
  isOpen: false,
  modalType: null,
  modalProps: {},
};

type ModalAction = OpenModalAction | CloseModalAction;

export const modalReducer = (
  state = initialState,
  action: ModalAction
): ModalState => {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        isOpen: true,
        modalType: action.payload.modalType,
        modalProps: action.payload.modalProps || {},
      };
    case CLOSE_MODAL:
      return {
        ...state,
        isOpen: false,
        modalType: null,
        modalProps: {},
      };
    default:
      return state;
  }
};

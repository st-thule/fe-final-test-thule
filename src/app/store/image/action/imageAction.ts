import { Action } from 'redux';
import {
  UPLOAD_IMAGE,
  UPLOAD_IMAGE_FAILURE,
  UPLOAD_IMAGE_SUCCESS,
} from './type/imageActionTypes';

export interface UploadImageAction extends Action<typeof UPLOAD_IMAGE> {}

export interface UploadImageSuccessAction
  extends Action<typeof UPLOAD_IMAGE_SUCCESS> {
  payload: string;
}

export interface UploadImageFailureAction
  extends Action<typeof UPLOAD_IMAGE_FAILURE> {
  payload: string;
}

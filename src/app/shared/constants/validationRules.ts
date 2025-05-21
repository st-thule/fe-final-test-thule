import { RegrexPattern } from '@app/core/constants/regrexPattern';
import { isPastDate } from '../utils/checkDate';

export const validationRulesAuth = {
  firstName: {
    required: 'First name is required',
  },

  lastName: {
    required: 'Last name is required',
  },
  displayName: {
    required: 'Display name is required',
  },
  email: {
    required: 'Email is required',
    pattern: {
      value: RegrexPattern.REGREX_EMAIL,
      message: 'Invalid email format',
    },
  },
  password: {
    required: 'Password is required',
    pattern: {
      value: RegrexPattern.REGREX_PASSWORD,
      message: 'Password must contain at least 8 characters',
    },
  },
  gender: {
    required: 'Gender is required',
  },
  dob: {
    required: 'Date of birth is required',
    pattern: {
      value: /^\d{4}-\d{2}-\d{2}$/,
      message: 'Date must be in YYYY-MM-DD format',
    },
    validate: isPastDate,
  },
  phone: {
    required: 'Phone is required',
  },
};

export const validationRulesPost = {
  title: {
    required: 'Title is required',
    minLength: { value: 20, message: 'Title must be at least 20 characters' },
  },
  description: {
    required: 'Description is required',
    minLength: {
      value: 50,
      message: 'Description must be at least 50 characters',
    },
  },
  content: {
    required: 'Content is required',
    minLength: {
      value: 100,
      message: 'Content must be at least 100 characters',
    },
  },
  status: {
    required: 'Status is required',
  },
};

import { RegrexPattern } from '@app/core/constants/regrexPattern';
import { isPastDate } from './checkDate';

export const validationRules = {
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

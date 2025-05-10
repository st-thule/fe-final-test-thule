import { RegrexPattern } from '@app/core/constants/regrexPattern';

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
  },
  phone: {
    required: 'Phone is required',
  },
};

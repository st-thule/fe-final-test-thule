import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { Input } from '@shared/components/partials/Input';
import { Button } from '@shared/components/partials/Button';
import { RegrexPattern } from '@app/core/constants/regrexPattern';

import hideIcon from '@assets/icons/hide.svg';
import showIcon from '@assets/icons/show.svg';
import { registerAccount } from '@app/core/services/auth.service';
import { toast } from 'react-toastify';

interface IRegisterForm {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: string;
  dob: string;
  phone: string;
  displayName: string;
  confirmPassword: string;
}

const Register = () => {
  const navigation = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<IRegisterForm>();

  const onSubmit = async (data: IRegisterForm) => {
    console.log('Form submitted:', data);
    try {
      setIsLoading(true);
      await registerAccount({
        email: data.email!,
        password: data.password!,
        firstName: data.firstName!,
        lastName: data.lastName!,
        gender: data.gender!,
        dob: data.dob!,
        phone: data.phone!,
        displayName: data.displayName!,
      });
      toast.success('Create successfully');
      navigation('/auth/login');
    } catch (error) {
      toast.error(error?.response?.data?.errors?.[0]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <form className="form form-register" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="form-title">Register</h1>
        <div className="form-control">
          <Input
            {...register('firstName', {
              required: 'First name is required',
            })}
            placeHolder="Enter first name"
            errorMessage={errors.firstName?.message}
          />

          <Input
            {...register('lastName', { required: 'Last name is required' })}
            placeHolder="Enter last name"
            errorMessage={errors.lastName?.message}
          />
        </div>

        <div className="form-control">
          <Input
            {...register('displayName', {
              required: 'Display name is required',
            })}
            placeHolder="Enter display name"
          />
        </div>

        <div className="form-control">
          <Input
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: RegrexPattern.REGREX_EMAIL,
                message: 'Invalid email format',
              },
            })}
            placeHolder="Enter email"
            errorMessage={errors.email?.message}
          />
        </div>

        <div className="form-control">
          <Input
            {...register('password', {
              required: 'Password is required',
              pattern: {
                value: RegrexPattern.REGREX_PASSWORD,
                message:
                  'Password must contain at least one letter, one number, at least 8 characters',
              },
            })}
            type={showPassword ? 'text' : 'password'}
            placeHolder="Enter password"
            icon={showPassword ? showIcon : hideIcon}
            onIconClick={() => setShowPassword((prev) => !prev)}
            errorMessage={errors.password?.message}
          />
        </div>

        <div className="form-control">
          <Input
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: (value) =>
                value === getValues('password') || 'Passwords do not match',
            })}
            type={showPassword ? 'text' : 'password'}
            icon={showPassword ? showIcon : hideIcon}
            onIconClick={() => setShowPassword((prev) => !prev)}
            placeHolder="Confirm password"
            errorMessage={errors.confirmPassword?.message}
          />
        </div>

        <div className="form-control">
          <Input
            {...register('gender', {
              required: 'Gender is required',
            })}
            placeHolder="Enter gender"
          />
          <Input
            {...register('dob', {
              required: 'Date of Birth is required',
            })}
            type="date"
            placeHolder="Enter date of birth"
          />
        </div>

        <div className="form-control">
          <Input
            {...register('phone', {
              required: 'Phone is required',
            })}
            placeHolder="Enter phone number"
          />
        </div>

        <p className="form-link">
          Yes, I have an account?{' '}
          <Link to="/login">
            <span>Login</span>
          </Link>
        </p>
        <Button
          className="btn btn-primary btn-xl"
          type="submit"
          label="Register"
          onClick={() => {}}
        />
      </form>
    </div>
  );
};

export default Register;

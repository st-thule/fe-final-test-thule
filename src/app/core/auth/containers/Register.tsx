import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { registerAccount } from '@app/core/services/auth.service';
import { Button } from '@shared/components/partials/Button';
import { Input } from '@shared/components/partials/Input';
import { Select } from '@shared/components/partials/Select';
import { optionGender } from '@shared/constants/optionGender';
import { formatDate } from '@shared/utils/formatDate';
import { validationRules } from '@shared/utils/validationRules';

import hideIcon from '@assets/icons/hide.svg';
import showIcon from '@assets/icons/show.svg';

interface IRegisterForm {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: string;
  dob: string;
  phone: string;
  displayName: string;
}

const Register = () => {
  const navigation = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IRegisterForm>({
    mode: 'onChange',
  });

  const gender = watch('gender');

  const onSubmit = async (data: IRegisterForm) => {
    try {
      setIsLoading(true);
      await registerAccount({
        email: data.email!,
        password: data.password!,
        firstName: data.firstName!,
        lastName: data.lastName!,
        gender: data.gender!,
        dob: formatDate(data.dob!),
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
          <Controller
            control={control}
            name="firstName"
            rules={validationRules.firstName}
            render={({ field }) => (
              <Input
                {...field}
                placeHolder="Enter first name"
                errorMessage={errors.firstName?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="lastName"
            rules={validationRules.lastName}
            render={({ field }) => (
              <Input
                {...field}
                placeHolder="Enter last name"
                errorMessage={errors.lastName?.message}
              />
            )}
          />
        </div>

        <div className="form-control">
          <Controller
            control={control}
            name="displayName"
            rules={validationRules.displayName}
            render={({ field }) => (
              <Input
                {...field}
                placeHolder="Enter display name"
                errorMessage={errors.displayName?.message}
              />
            )}
          />
        </div>

        <div className="form-control">
          <Controller
            control={control}
            name="email"
            rules={validationRules.email}
            render={({ field }) => (
              <Input
                {...field}
                placeHolder="Enter email"
                errorMessage={errors.email?.message}
              />
            )}
          />
        </div>

        <div className="form-control">
          <Controller
            control={control}
            name="password"
            rules={validationRules.password}
            render={({ field }) => (
              <Input
                {...field}
                type={showPassword ? 'text' : 'password'}
                placeHolder="Enter password"
                icon={showPassword ? showIcon : hideIcon}
                onIconClick={() => setShowPassword((prev) => !prev)}
                errorMessage={errors.password?.message}
              />
            )}
          />
        </div>

        <div className="form-control">
          <Controller
            control={control}
            name="gender"
            rules={validationRules.gender}
            render={({ field }) => (
              <Select
                {...field}
                options={optionGender}
                errorMsg={errors.gender?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="dob"
            rules={validationRules.dob}
            render={({ field }) => (
              <Input
                {...field}
                type="date"
                placeHolder="Enter date of birth"
                errorMessage={errors.dob?.message}
              />
            )}
          />
        </div>

        <div className="form-control">
          <Controller
            control={control}
            name="phone"
            rules={validationRules.phone}
            render={({ field }) => (
              <Input
                {...field}
                placeHolder="Enter phone number"
                errorMessage={errors.phone?.message}
              />
            )}
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
          isDisabled={isLoading}
          isLoading={isLoading}
          onClick={() => {}}
        />
      </form>
    </div>
  );
};

export default Register;

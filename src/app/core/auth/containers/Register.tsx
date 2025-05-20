import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { AppRoutes } from '@app/core/constants/app-routes';
import { AuthService } from '@app/core/services/auth.service';
import { Button } from '@shared/components/partials/Button';
import { Input } from '@shared/components/partials/Input';
import { Select } from '@shared/components/partials/Select';
import { LabelGender, optionGender } from '@shared/constants/options';
import { formatDate } from '@shared/utils/formatDate';
import { validationRulesAuth } from '@shared/utils/validationRules';

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
  const authService = new AuthService();
  const navigation = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IRegisterForm>({
    mode: 'onChange',
    defaultValues: {
      gender: LabelGender.MALE,
    },
  });

  const onSubmit = async (data: IRegisterForm) => {
    try {
      setIsLoading(true);
      await authService.registerAccount({
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
    <div className="page page-auth page-register">
      <h1 className="page-title">Register</h1>
      <form
        className="form form-auth form-register"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="row">
          <div className="col-12 col-sm-12 col-md-6">
            <Controller
              control={control}
              name="firstName"
              rules={validationRulesAuth.firstName}
              render={({ field }) => (
                <Input
                  {...field}
                  placeHolder="Enter first name"
                  errorMessage={errors.firstName?.message}
                />
              )}
            />
          </div>
          <div className="col-12 col-sm-12 col-md-6">
            <Controller
              control={control}
              name="lastName"
              rules={validationRulesAuth.lastName}
              render={({ field }) => (
                <Input
                  {...field}
                  placeHolder="Enter last name"
                  errorMessage={errors.lastName?.message}
                />
              )}
            />
          </div>
        </div>
        <Controller
          control={control}
          name="displayName"
          rules={validationRulesAuth.displayName}
          render={({ field }) => (
            <Input
              {...field}
              placeHolder="Enter display name"
              errorMessage={errors.displayName?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          rules={validationRulesAuth.email}
          render={({ field }) => (
            <Input
              {...field}
              placeHolder="Enter email"
              errorMessage={errors.email?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          rules={validationRulesAuth.password}
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

        <div className="row">
          <div className="col-12 col-sm-12 col-md-6">
            <Controller
              control={control}
              name="gender"
              rules={validationRulesAuth.gender}
              render={({ field }) => (
                <Select
                  {...field}
                  placeHolder="Gender"
                  options={optionGender}
                  errorMsg={errors.gender?.message}
                />
              )}
            />
          </div>
          <div className="col-12 col-sm-12 col-md-6">
            <Controller
              control={control}
              name="dob"
              rules={validationRulesAuth.dob}
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
        </div>

        <Controller
          control={control}
          name="phone"
          rules={validationRulesAuth.phone}
          render={({ field }) => (
            <Input
              {...field}
              placeHolder="Enter phone number"
              errorMessage={errors.phone?.message}
            />
          )}
        />
        <p className="form-link">
          Yes, I have an account?{' '}
          <Link to={AppRoutes.LOGIN}>
            <span>Login</span>
          </Link>
        </p>
        <Button
          className="btn btn-primary btn-xl"
          type="submit"
          label="Register"
          isDisabled={!isValid || isLoading}
          isLoading={isLoading}
          onClick={() => {}}
        />
      </form>
    </div>
  );
};

export default Register;

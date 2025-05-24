import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { AppRoutes } from '@app/core/constants/app-routes';
import { registerThunk } from '@app/store/auth/thunk/authThunk';
import { useAppDispatch } from '@app/store/hook/useAppDispatch';
import { useAppSelector } from '@app/store/hook/useAppSelector';
import hideIcon from '@assets/icons/hide.svg';
import showIcon from '@assets/icons/show.svg';
import { Button } from '@shared/components/partials/Button';
import { Input } from '@shared/components/partials/Input';
import { SingleSelect } from '@shared/components/partials/Select';
import { optionGender } from '@shared/constants/options';
import { validationRulesAuth } from '@shared/constants/validationRules';
import { LabelGender } from '@shared/types/enum';
import { formatDate } from '@shared/utils/formatDate';

interface IRegisterForm {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  gender: string;
  dob: string;
  phone: string;
  displayName: string;
}

const Register = () => {
  const navigation = useNavigate();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState<{ [key: string]: boolean }>(
    {}
  );

  const toggleShowPassword = (field: string) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

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

  // register
  const onSubmit = async (data: IRegisterForm) => {
    try {
      const response = await dispatch(
        registerThunk({
          email: data.email!,
          password: data.password!,
          firstName: data.firstName!,
          lastName: data.lastName!,
          gender: data.gender!,
          dob: formatDate(data.dob!),
          phone: data.phone!,
          displayName: data.displayName!,
        })
      );
      if (registerThunk.fulfilled.match(response)) {
        toast.success('Create successfully');
        navigation(`${AppRoutes.AUTH}/${AppRoutes.LOGIN}`);
      } else {
        toast.error(response.payload);
      }
    } catch (error) {
      toast.error(error?.response?.data?.errors?.[0]);
    }
  };

  return (
    <div className="page page-auth page-register">
      <form
        className="form form-auth form-register"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="form-title">Register</h1>
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
              type={showPassword[field.name] ? 'text' : 'password'}
              placeHolder="Enter password"
              icon={showPassword[field.name] ? showIcon : hideIcon}
              onIconClick={() => toggleShowPassword(field.name)}
              errorMessage={errors.password?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="confirmPassword"
          rules={{
            required: 'Confirm password is required',
            validate: (value) =>
              value === control._formValues.password ||
              'Passwords do not match',
          }}
          render={({ field }) => (
            <Input
              {...field}
              type={showPassword[field.name] ? 'text' : 'password'}
              placeHolder="Confirm password"
              icon={showPassword[field.name] ? showIcon : hideIcon}
              onIconClick={() => toggleShowPassword(field.name)}
              errorMessage={errors.confirmPassword?.message}
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
                <SingleSelect
                  {...field}
                  options={optionGender}
                  placeholder="Select gender"
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
          <Link to={`${AppRoutes.AUTH}/${AppRoutes.LOGIN}`}>
            <span>Login</span>
          </Link>
        </p>
        <Button
          className="btn btn-primary btn-xl"
          type="submit"
          label="Register"
          isDisabled={!isValid || loading}
          isLoading={loading}
          onClick={() => {}}
        />
      </form>
    </div>
  );
};

export default Register;

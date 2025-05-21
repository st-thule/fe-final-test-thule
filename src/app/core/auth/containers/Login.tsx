import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { AppRoutes } from '@app/core/constants/app-routes';
import { loginThunk } from '@app/store/auth/thunk/authThunk';
import { useAppDispatch } from '@app/store/hook/useAppDispatch';
import { useAppSelector } from '@app/store/hook/useAppSelector';
import { Button, Input } from '@shared/components/partials';
import { validationRulesAuth } from '@shared/constants/validationRules';

import hideIcon from '@assets/icons/hide.svg';
import showIcon from '@assets/icons/show.svg';

interface ILoginForm {
  email: string;
  password: string;
}
const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.auth.loading);
  const error = useAppSelector((state) => state.auth.error);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ILoginForm>({
    mode: 'onChange',
  });

  const onSubmit = async (data: ILoginForm) => {
    try {
      await dispatch(
        loginThunk({ email: data.email, password: data.password })
      );
      toast.success('Login successfully');
      navigate(location.state?.from || AppRoutes.HOME, { replace: true });
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        error ||
        'Invalid email or password!';
      toast.error(message);
    }
  };

  return (
    <div className="page page-auth page-login">
      <form
        className="form form-auth form-login"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="form-title">Login</h1>
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
        <p className="form-link">
          Don't have an account?{' '}
          <Link to={`${AppRoutes.AUTH}/${AppRoutes.REGISTER}`}>
            <span>Register</span>
          </Link>
        </p>

        <Button
          className="btn btn-primary btn-xl"
          type="submit"
          label="Login"
          isDisabled={!isValid || loading}
          isLoading={loading}
          onClick={() => {}}
        />
      </form>
    </div>
  );
};

export default Login;

import React, { useContext, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { AppRoutes } from '@app/core/constants/app-routes';
import { Button, Input } from '@shared/components/partials';
import { validationRules } from '@shared/utils/validationRules';

import hideIcon from '@assets/icons/hide.svg';
import showIcon from '@assets/icons/show.svg';
import { AuthContext } from '@shared/contexts/auth.context';
import { loginAccount } from '@app/core/services/auth.service';
import { toast } from 'react-toastify';
import { authStorage } from '@app/core/services/auth-storage.service';

interface ILoginForm {
  email: string;
  password: string;
}
const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setUserSession } = useContext(AuthContext);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ILoginForm>({
    mode: 'onChange',
  });

  const onSubmit = async (data: ILoginForm) => {
    try {
      setIsLoading(true);
      const response = await loginAccount({
        email: data.email,
        password: data.password,
      });

      const { accessToken, userInfo } = response;

      if (!accessToken || !userInfo) {
        throw new Error('Invalid login response');
      }

      setUserSession(userInfo);
      authStorage.setToken(accessToken);
      toast.success('Login successfully');
      navigate(AppRoutes.HOME);
    } catch (error) {
      toast.error(error?.response?.data?.errors?.[0]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <form className="form form-register" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="form-title">Login</h1>
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
        <p className="form-link">
          Don't have an account?{' '}
          <Link to={AppRoutes.REGISTER}>
            <span>Register</span>
          </Link>
        </p>

        <Button
          className="btn btn-primary btn-xl"
          type="submit"
          label="Login"
          isDisabled={!isValid || isLoading}
          isLoading={isLoading}
          onClick={() => {}}
        />
      </form>
    </div>
  );
};

export default Login;

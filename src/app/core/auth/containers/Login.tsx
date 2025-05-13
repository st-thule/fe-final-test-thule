import React, { useContext, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { AppRoutes } from '@app/core/constants/app-routes';
import { authStorage } from '@app/core/services/auth-storage.service';
import { loginAccount } from '@app/core/services/auth.service';
import { Button, Input } from '@shared/components/partials';
import { AuthContext } from '@shared/contexts/auth.context';
import { validationRulesAuth } from '@shared/utils/validationRules';

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

      setUserSession(userInfo, accessToken);
      authStorage.setToken(accessToken);
      toast.success('Login successfully');
      navigate(location.state?.from || AppRoutes.HOME, { replace: true });
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        'Invalid email or password!';
      toast.error(message);
    } finally {
      setIsLoading(false);
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

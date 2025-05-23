import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { AppRoutes } from '@app/core/constants/app-routes';
import { changePasswordThunk } from '@app/store/auth/thunk/authThunk';
import { useAppDispatch } from '@app/store/hook/useAppDispatch';
import { useAppSelector } from '@app/store/hook/useAppSelector';
import { getPersonalInfoThunk } from '@app/store/user/thunk/userThunk';
import femaleIcon from '@assets/icons/avatar-female.svg';
import maleIcon from '@assets/icons/avatar-male.svg';
import otherIcon from '@assets/icons/avatar-other.svg';
import { ModalComponent } from '@shared/components/Modal';
import { Button, Input } from '@shared/components/partials';
import { ModalTypes } from '@shared/types/enum';
import { PostList } from '../components/PostList';

interface IPasswordForm {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const Profile = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const params = useParams();
  const id = params.id ?? 'me';
  const dispatch = useAppDispatch();
  const authUser = useAppSelector((state) => state.auth.user);
  const { personalInfo, loading } = useAppSelector((state) => state.user);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IPasswordForm>({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
    },
  });

  useEffect(() => {
    if (id) {
      dispatch(getPersonalInfoThunk({ id }));
    }
  }, [dispatch, id, authUser?.id]);

  const isMyProfile = personalInfo?.id === authUser?.id;

  const author =
    personalInfo?.gender === 'female'
      ? femaleIcon
      : personalInfo?.gender === 'male'
      ? maleIcon
      : otherIcon;

  const handleChangePassword = async (data: IPasswordForm) => {
    if (data.newPassword === data.confirmPassword) {
      try {
        const response = await dispatch(
          changePasswordThunk({
            oldPassword: data.oldPassword,
            newPassword: data.newPassword,
          })
        );

        if (changePasswordThunk.fulfilled.match(response)) {
          toast.success('Update password successfully');
          setModalOpen(false);
        } else {
          setModalOpen(false);
          toast.error(response.payload);
        }
        reset();
      } catch (error) {
        const errorMessage = error.message || 'Something went wrong';
        toast.error(errorMessage);
      }
    }
  };

  return (
    <div className="page page-profile">
      <div className="container">
        <div className="wrapper wrapper-padding">
          {loading || !personalInfo ? (
            <section className="section section-info">
              <div className="section-image skeleton-avatar"></div>

              <div className="section-content skeleton-content">
                <div className="skeleton-title" />
                <div className="skeleton-text" />
                <div className="skeleton-text" />
                <div className="skeleton-text" />
              </div>
            </section>
          ) : (
            <>
              <section className="section section-info">
                <div className="section-image">
                  <img
                    className="img avatar"
                    src={personalInfo.picture || author}
                    alt="avatar"
                  />
                </div>
                <div className="section-content">
                  <div className="section-text">
                    <h1 className="section-title">
                      {personalInfo.firstName} {personalInfo.lastName}
                    </h1>
                    <p className="section-subtitle">{personalInfo.email}</p>
                    <p>{personalInfo.phone}</p>
                    <p>{personalInfo.dob}</p>
                  </div>
                  {isMyProfile && (
                    <div className="section-action">
                      <Link to={`${AppRoutes.USER}/${AppRoutes.USER_EDIT}`}>
                        Edit
                      </Link>
                      <Button
                        className="btn btn-primary"
                        label="Change password"
                        onClick={() => setModalOpen(true)}
                      />
                    </div>
                  )}
                </div>
              </section>

              <section className="section section-list section-post">
                <div className="section-header">
                  <h2 className="section-title">Articles</h2>
                </div>
                <PostList
                  posts={personalInfo.Posts || []}
                  userInfo={{
                    displayName: personalInfo.displayName,
                    picture: personalInfo.picture,
                  }}
                  className="col-12 col-sm-6 com-md-3"
                />
              </section>
            </>
          )}
        </div>
      </div>

      <ModalComponent
        type={ModalTypes.USER_FORM}
        isOpen={modalOpen}
        confirmLabel="Change"
      >
        <form
          className="form form-modal"
          onSubmit={handleSubmit(handleChangePassword)}
        >
          <div className="form-header">
            <h2 className="form-title">Change Password</h2>
          </div>
          <div className="form-body">
            <Controller
              name="oldPassword"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="password"
                  label="Old password"
                  errorMessage=""
                />
              )}
            />
            <Controller
              name="newPassword"
              control={control}
              rules={{ required: 'New password is required' }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="password"
                  label="New password"
                  errorMessage={errors.newPassword?.message || ''}
                />
              )}
            />
            <Controller
              name="confirmPassword"
              control={control}
              rules={{
                required: 'Please confirm your password',
                validate: (value) =>
                  value === control._formValues.newPassword ||
                  'Passwords do not match',
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="password"
                  label="Confirm password"
                  errorMessage={errors.confirmPassword?.message || ''}
                />
              )}
            />
          </div>
          <div className="form-action">
            <Button type="submit" className="btn btn-primary" label="Change" />
            <Button
              type="button"
              className="btn btn-primary btn-no"
              label="Cancel"
              onClick={() => {
                setModalOpen(false);
                reset();
              }}
            />
          </div>
        </form>
      </ModalComponent>
    </div>
  );
};

export default Profile;

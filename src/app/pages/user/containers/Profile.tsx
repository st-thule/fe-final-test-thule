import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { AppRoutes } from '@app/core/constants/app-routes';
import { useAppDispatch } from '@app/store/hook/useAppDispatch';
import { useAppSelector } from '@app/store/hook/useAppSelector';
import { getPersonalInfoThunk } from '@app/store/user/thunk/userThunk';
import { PostList } from '../components/PostList';

import femaleIcon from '@assets/icons/avatar-female.svg';
import maleIcon from '@assets/icons/avatar-male.svg';
import otherIcon from '@assets/icons/avatar-other.svg';
import { Button, Input } from '@shared/components/partials';
import { ModalComponent } from '@shared/components/Modal';
import { Controller, useForm } from 'react-hook-form';
import { ModalTypes } from '@shared/types/enum';

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
    formState: { errors, isValid },
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

  if (loading || !personalInfo) {
    return <div className="text-center">Loading profile...</div>;
  }

  const author =
    personalInfo?.gender === 'female'
      ? femaleIcon
      : personalInfo?.gender === 'male'
      ? maleIcon
      : otherIcon;

  return (
    <div className="page page-profile">
      <div className="container">
        <div className="wrapper wrapper-padding">
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
              </div>
              {isMyProfile && (
                <div className="section-action">
                  <Link
                    className=""
                    to={`${AppRoutes.USER}/${AppRoutes.USER_EDIT}`}
                  >
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
        </div>
      </div>
      <ModalComponent
        type={ModalTypes.USER_FORM}
        isOpen={modalOpen}
        confirmLabel="Change"
      >
        <form className="form form-modal">
          <div className="form-header">
            <h2 className="form-title">Change Password</h2>
          </div>
          <div className="form-body">
            <Controller
              name="oldPassword"
              control={control}
              render={({ field }) => (
                <Input label="Old password" errorMessage="" />
              )}
            />
            <Controller
              name="newPassword"
              control={control}
              render={({ field }) => (
                <Input label="New password" errorMessage="" />
              )}
            />
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <Input label="Confirm password" errorMessage="" />
              )}
            />
          </div>
          <div className="form-action">
            <Button className="btn btn-primary" label="Change" />
          </div>
        </form>
      </ModalComponent>
    </div>
  );
};

export default Profile;

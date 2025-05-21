import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAppDispatch } from '@app/store/hook/useAppDispatch';
import { useAppSelector } from '@app/store/hook/useAppSelector';
import { uploadImageThunk } from '@app/store/image/thunk/imageThunk';
import { updateInfoThunk } from '@app/store/user/thunk/userThunk';
import { Button, Input } from '@shared/components/partials';
import { Select } from '@shared/components/partials/Select';
import { UploadImage } from '@shared/components/UploadImage';
import { optionGender } from '@shared/constants/options';
import { TypeUpload } from '@shared/types/enum';

import femaleIcon from '@assets/icons/avatar-female.svg';
import maleIcon from '@assets/icons/avatar-male.svg';
import otherIcon from '@assets/icons/avatar-other.svg';

interface IUserForm {
  firstName: string;
  lastName: string;
  gender: string;
  dob: string;
  displayName: string;
  picture?: string;
}

const UserForm = () => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector((state) => state.auth.loading);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<IUserForm>({
    defaultValues: {
      firstName: '',
      lastName: '',
      gender: '',
      dob: '',
      displayName: '',
      picture: '',
    },
  });

  const picture = watch('picture');
  useEffect(() => {
    if (user) {
      setValue('firstName', user.firstName || '');
      setValue('lastName', user.lastName || '');
      setValue('gender', user.gender || '');
      setValue('dob', user.dob || '');
      setValue('displayName', user.displayName || '');
      setValue('picture', user.picture || '');
    }
  }, [user, setValue]);

  const onSubmit = async (data: IUserForm) => {
    try {
      const result = await dispatch(updateInfoThunk(data));
      if (updateInfoThunk.fulfilled.match(result)) {
        toast.success('Profile updated successfully!');
        navigate(-1);
      }
    } catch (error) {
      throw error;
    }
  };

  const handleUploadImage = async (file: File) => {
    try {
      const uploadResult = await dispatch(
        uploadImageThunk({ file, typeUpload: TypeUpload.AVATAR })
      );
      if (uploadImageThunk.fulfilled.match(uploadResult)) {
        const url = uploadResult.payload;
        setValue('picture', url, { shouldValidate: true });
      }
    } catch {
      toast.error('Image upload failed');
    }
  };

  const author =
    user?.gender === 'female'
      ? femaleIcon
      : user?.gender === 'male'
      ? maleIcon
      : otherIcon;

  return (
    <div className="page page-user-form">
      <div className="container">
        <div className="wrapper wrapper-flex">
          <form className="form form-user" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-header">
              <h1 className="page-title">My Profile</h1>
              <Button
                type="submit"
                className="btn btn-primary"
                label="Save"
                isDisabled={!isValid || loading}
                isLoading={loading}
              />
            </div>
            <div className="form-body">
              <UploadImage
                className="form-dashed-circle"
                cover={picture || ''}
                onChange={handleUploadImage}
                defaultImage={author}
              />
              <div className="form-field-text">
                <div className="row">
                  <div className="col-12 col-md-6 col-sm-6">
                    <Controller
                      name="firstName"
                      control={control}
                      rules={{ required: 'First name is required' }}
                      render={({ field }) => (
                        <Input
                          label="First name"
                          {...field}
                          errorMessage={errors.firstName?.message}
                        />
                      )}
                    />
                  </div>
                  <div className="col-12 col-md-6 col-sm-6">
                    <Controller
                      name="lastName"
                      control={control}
                      rules={{ required: 'Last name is required' }}
                      render={({ field }) => (
                        <Input
                          label="Last name"
                          {...field}
                          errorMessage={errors.lastName?.message}
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-md-6 col-sm-6">
                    <Controller
                      control={control}
                      name="gender"
                      render={({ field }) => (
                        <Select
                          label="Status"
                          placeHolder="Status"
                          options={optionGender}
                          value={field.value}
                          name={field.name}
                          onChange={field.onChange}
                          errorMsg={errors.gender?.message}
                        />
                      )}
                    />
                  </div>
                  <div className="col-12 col-md-6 col-sm-6">
                    <Controller
                      name="dob"
                      control={control}
                      rules={{ required: 'Date of birth is required' }}
                      render={({ field }) => (
                        <Input
                          label="Date of birth"
                          type="date"
                          {...field}
                          errorMessage={errors.dob?.message}
                        />
                      )}
                    />
                  </div>
                </div>
                <Controller
                  name="displayName"
                  control={control}
                  rules={{ required: 'Display name is required' }}
                  render={({ field }) => (
                    <Input
                      label="Display name"
                      {...field}
                      errorMessage={errors.displayName?.message}
                    />
                  )}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserForm;

import React from 'react';

import { Button, Input } from '@shared/components/partials';
import { Select } from '@shared/components/partials/Select';
import { UploadImage } from '@shared/components/UploadImage';
import { optionGender } from '@shared/constants/options';

const UserForm = () => {
  return (
    <div className="page page-user-form">
      <div className="container">
        <div className="wrapper wrapper-flex">
          <form className="form form-user">
            <div className="form-header">
              <h1 className="page-title">My Profile</h1>
              <Button
                type="submit"
                className="btn btn-primary"
                label="Save"
                isDisabled
                isLoading
              />
            </div>
            <div className="form-body">
              <UploadImage className="form-dashed-circle" />
              <div className="form-field-text">
                <div className="row">
                  <div className="col-12 col-md-6 col-sm-6">
                    <Input label="First name" />
                  </div>
                  <div className="col-12 col-md-6 col-sm-6">
                    <Input label="Last name" />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-md-6 col-sm-6">
                    <Select
                      label="Gender"
                      placeHolder="Gender"
                      options={optionGender}
                      value=""
                      name=""
                      onChange={() => {}}
                    />
                  </div>
                  <div className="col-12 col-md-6 col-sm-6">
                    <Input label="Date" type="date" />
                  </div>
                </div>
                <Input label="Display name" />
                <Input label="Email" isDisabled />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserForm;

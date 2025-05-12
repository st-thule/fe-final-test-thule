import CkEditor from '@shared/components/CkEditor';
import { MultiSelect } from '@shared/components/MultiSelect';
import { Button } from '@shared/components/partials';
import { Select } from '@shared/components/partials/Select';
import { optionStatusPost, OptionTag } from '@shared/constants/optionGender';
import React from 'react';

const AddPost = () => {
  return (
    <div className="page page-add-post">
      <div className="container">
        <div className="wrapper wrapper-padding wrapper-padding-lg">
          <form className="form">
            <div className="form-header">
              <Select name={''} options={optionStatusPost} />
              <MultiSelect options={OptionTag} />
              <Button className="btn btn-primary" label="Add post" />
            </div>
            <div className="form-body">
              <CkEditor />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPost;

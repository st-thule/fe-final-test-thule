import React from 'react';
import { useParams } from 'react-router-dom';

import { Button, Input } from '@shared/components/partials';
import CkEditor from '@shared/components/CkEditor';
import { MultiSelect } from '@shared/components/MultiSelect';
import { optionTags } from '@shared/constants/options';

const PostForm = () => {
  const params = useParams();
  const isEdit = Boolean(params.id);

  return (
    <div className="page page-post-form">
      <div className="container">
        <div className="wrapper wrapper-padding">
          <h1 className="page-title">{isEdit ? 'Edit Post' : 'Create Post'}</h1>
          <form className="form form-xl">
            <Button
              className="btn btn-primary"
              label={isEdit ? 'Save' : 'Create'}
            />
            <div className="form-upload upload">
              <Input className="img img-upload" />
              <div className="upload-action">
                <Button className="btn btn-primary" label="Upload" />
                <Button className="btn btn-no" label="Delete" />
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-6 col-sm-6">
                <MultiSelect options={optionTags} />
              </div>
              <div className="col-12 col-md-6 col-sm-6">{/* Status */}</div>
            </div>
            <Input />
            <textarea />
            <CkEditor />
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostForm;

import React from 'react';
import { useParams } from 'react-router-dom';

import { Button, Input } from '@shared/components/partials';

const PostForm = () => {
  const params = useParams();
  const isEdit = Boolean(params.id);

  return (
    <div className="page page-post-form">
      <div className="container">
        <div className="wrapper wrapper-padding">
          <h1 className="page-title">{isEdit ? 'Edit Post' : 'Create Post'}</h1>
          <form className="form">
            <Button className="btn btn-primary" label="Create Post" />
            <div className="form-upload upload">
              <Input className="img img-upload" />
              <div className="upload-action">
                <Button className="btn btn-primary" label="Upload" />
                <Button className="btn btn-no" label="Delete" />
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-6 col-sm-6">
                {/* Multiple Select */}
              </div>
              <div className="col-12 col-md-6 col-sm-6">{/* Status */}</div>
            </div>
            <Input />
            <textarea />
            {/* Ckeditor */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostForm;

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { Button, Input } from '@shared/components/partials';
import CkEditor from '@shared/components/CkEditor';
import { MultiSelect } from '@shared/components/MultiSelect';
import { optionStatusPost, optionTags } from '@shared/constants/options';
import { UploadImage } from '@shared/components/UploadImage';
import { Textarea } from '@shared/components/partials/TextArea';
import { Select } from '@shared/components/partials/Select';

const PostForm = () => {
  const params = useParams();
  const isEdit = Boolean(params.id);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [visibility, setVisibility] = useState<'public' | 'private'>('public');

  const handleToggleChange = (value: 'public' | 'private') => {
    setVisibility(value);
  };

  return (
    <div className="page page-post-form">
      <div className="container">
        <div className="wrapper wrapper-padding">
          <form className="form form-xl">
            <div className="form-header">
              <h1 className="page-title">
                {isEdit ? 'Edit Post' : 'Create Post'}
              </h1>
              <Button
                className="btn btn-primary"
                label={isEdit ? 'Save' : 'Create'}
              />
            </div>
            <div className="form-body">
              <UploadImage />
              <div className="row">
                <div className="col-12 col-md-6 col-sm-6">
                  <MultiSelect
                    options={optionTags}
                    value={selectedTags}
                    onChange={setSelectedTags}
                    label="Tags"
                  />
                </div>
                <div className="col-12 col-md-6 col-sm-6">
                  <Select
                    label="Status"
                    placeHolder="Status"
                    options={optionStatusPost}
                    name={''}
                  />
                </div>
              </div>
              <Input label="Title" />
              <Textarea label="Description" />
              <div className="form-control">
                <label className="form-label">Content</label>
                <CkEditor />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostForm;

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { Button, Input } from '@shared/components/partials';
import CkEditor from '@shared/components/CkEditor';
import { MultiSelect } from '@shared/components/MultiSelect';
import {
  optionStatusPost,
  optionTags,
  StatusPost,
} from '@shared/constants/options';
import { UploadImage } from '@shared/components/UploadImage';
import { Textarea } from '@shared/components/partials/TextArea';
import { Select } from '@shared/components/partials/Select';
import { authStorage } from '@app/core/services/auth-storage.service';
import { createPost } from '@shared/services/post.service';

interface IPostForm {
  title: string;
  description: string;
  content: string;
  status: StatusPost;
  tags?: string[] | [];
  cover?: string | 'cover';
}

const PostForm = () => {
  const params = useParams();
  const isEdit = Boolean(params.id);
  const [rawContent, setRawContent] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IPostForm>({
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
      content: '',
      status: StatusPost.PUBLIC,
      cover: 'cover',
      tags: [],
    },
  });

  const onSubmit = async (data: IPostForm) => {
    const finalData = {
      ...data,
      content: rawContent,
    };

    console.log('content', finalData.content);
    try {
      const token = authStorage.getToken();
      if (token) {
        const response = await createPost(finalData, token);
        console.log(response);
        toast.success('Create post successfully');
      }
    } catch (error) {
      toast.error(error);
    } finally {
    }
  };

  return (
    <div className="page page-post-form">
      <div className="container">
        <div className="wrapper wrapper-padding">
          <form className="form form-xl" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-header">
              <h1 className="page-title">
                {isEdit ? 'Edit Post' : 'Create Post'}
              </h1>
              <Button
                type="submit"
                className="btn btn-primary"
                label={isEdit ? 'Save' : 'Create'}
              />
            </div>
            <div className="form-body">
              <UploadImage />

              <div className="row">
                <div className="col-12 col-md-6 col-sm-6">
                  <Controller
                    control={control}
                    name="tags"
                    render={({ field }) => (
                      <MultiSelect
                        label="Tags"
                        options={optionTags}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </div>
                <div className="col-12 col-md-6 col-sm-6">
                  <Controller
                    control={control}
                    name="status"
                    rules={{ required: 'Status is required' }}
                    render={({ field }) => (
                      <Select
                        label="Status"
                        placeHolder="Status"
                        options={optionStatusPost}
                        name={field.name}
                        onChange={field.onChange}
                        errorMsg={errors.status?.message}
                      />
                    )}
                  />
                </div>
              </div>

              <Controller
                control={control}
                name="title"
                rules={{
                  required: 'Title is required',
                  minLength: { value: 20, message: 'Minimum 20 characters' },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Title"
                    errorMessage={errors.title?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="description"
                rules={{
                  required: 'Description is required',
                  minLength: {
                    value: 50,
                    message: 'Minimum 50 characters',
                  },
                }}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    label="Description"
                    errorMessage={errors.description?.message}
                  />
                )}
              />

              <div className="form-control">
                <label className="form-label">Content</label>
                <CkEditor onChange={(data) => setRawContent(data)} />
                {errors.content && (
                  <p className="form-error">{errors.content.message}</p>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostForm;

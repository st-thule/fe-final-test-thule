import React, { useContext, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { AppRoutes } from '@app/core/constants/app-routes';
import { authStorage } from '@app/core/services/auth-storage.service';
import CkEditor from '@shared/components/CkEditor';
import { MultiSelect } from '@shared/components/MultiSelect';
import { UploadImage } from '@shared/components/UploadImage';
import { Button, Input } from '@shared/components/partials';
import { Select } from '@shared/components/partials/Select';
import { Textarea } from '@shared/components/partials/TextArea';
import {
  optionStatusPost,
  optionTags,
  StatusPost,
} from '@shared/constants/options';
import { TypeUpload } from '@shared/constants/type-image';
import { createPost, getPostDetailUpdate } from '@shared/services/post.service';
import { AuthContext } from '@shared/contexts/auth.context';
import { validationRulesPost } from '@shared/utils/validationRules';

interface IPostForm {
  title: string;
  description: string;
  content: string;
  status: StatusPost;
  tags?: string[] | [];
  cover?: string | 'cover';
}

const PostForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [rawContent, setRawContent] = useState('');
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
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

  const cover = watch('cover');

  // render post data to post form
  useEffect(() => {
    if (!isEdit) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    getPostDetailUpdate(id!)
      .then((post) => {
        if (post.userId === user.id) {
          setValue('title', post.title);
          setValue('content', post.content);
          setValue('description', post.description);
          setValue('cover', post.cover);
          setValue('status', post.status as StatusPost);
          setValue('tags', post.tags || []);
        } else {
          toast.error("You mustn't edit this post");
          navigate(AppRoutes.POSTS, { replace: true });
        }
      })
      .catch(() => {
        toast.error('No post');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id, isEdit, navigate, setValue, user.id]);

  // add post
  const onSubmit = async (data: IPostForm) => {
    console.log('ckeditor', rawContent);
    const finalData = {
      ...data,
      content: rawContent,
    };
    try {
      setIsLoading(true);
      const token = authStorage.getToken();
      if (token) {
        const response = await createPost(finalData);
        toast.success('Create post successfully');
        navigate(`${AppRoutes.POSTSDETAIL.replace(':id', response.id)}`);
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setIsLoading(false);
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
                isDisabled={!isValid || isLoading}
                isLoading={isLoading}
              />
            </div>
            <div className="form-body">
              <UploadImage
                typeUpload={TypeUpload.COVER_POST}
                cover={cover}
                onUploaded={(url) => setValue('cover', url)}
              />

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
                    rules={validationRulesPost.status}
                    render={({ field }) => (
                      <Select
                        label="Status"
                        placeHolder="Status"
                        options={optionStatusPost}
                        value={field.value}
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
                rules={validationRulesPost.title}
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
                rules={validationRulesPost.description}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    label="Description"
                    errorMessage={errors.description?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="content"
                rules={validationRulesPost.content}
                render={({ field }) => (
                  <div className="form-control">
                    <label className="form-label">Content</label>
                    <CkEditor
                      value={field.value}
                      onChange={(data: string) => {
                        console.log('Editor content:', data);
                        field.onChange(data);
                        setRawContent(data);
                      }}
                    />
                    {errors.content && (
                      <p className="form-error">{errors.content.message}</p>
                    )}
                  </div>
                )}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostForm;

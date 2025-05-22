import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { AppRoutes } from '@app/core/constants/app-routes';
import { authStorage } from '@app/core/services/auth-storage.service';
import { useAppDispatch } from '@app/store/hook/useAppDispatch';
import { useAppSelector } from '@app/store/hook/useAppSelector';
import { uploadImageThunk } from '@app/store/image/thunk/imageThunk';
import {
  createPostThunk,
  getPostDetailUpdateThunk,
  updatePostThunk,
} from '@app/store/post/thunk/postThunk';
import CkEditor from '@shared/components/CkEditor';
import { ModalComponent } from '@shared/components/Modal';
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
import { TypeUpload } from '@shared/types/enum';
import { validationRulesPost } from '@shared/constants/validationRules';

interface IPostForm {
  title: string;
  description: string;
  content: string;
  status: StatusPost;
  tags?: string[];
  cover?: string;
}

const PostForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [rawContent, setRawContent] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

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
      cover: '',
      tags: [],
    },
  });

  const loadingCreate = useAppSelector((state) => state.post.loading.create);
  const loadingUpdate = useAppSelector((state) => state.post.loading.update);
  const isLoading = isEdit ? loadingUpdate : loadingCreate;

  const cover = watch('cover');

  useEffect(() => {
    if (!isEdit || !user?.id) return;

    dispatch(getPostDetailUpdateThunk(id!))
      .then((action) => {
        if (getPostDetailUpdateThunk.fulfilled.match(action)) {
          const post = action.payload;
          if (!post) {
            toast.error('Post not found');
            return;
          }
          if (post.userId === user.id) {
            setValue('title', post.title);
            setValue('content', post.content);
            setValue('description', post.description);
            setValue('cover', post.cover || '');
            setValue('status', post.status as StatusPost);
            setValue('tags', post.tags || []);
            setRawContent(post.content);
          } else {
            toast.error("You don't have permission to edit this post");
            navigate(AppRoutes.HOME, { replace: true });
          }
        }
      })
      .catch(() => toast.error('Failed to load post'));
  }, [dispatch, id, isEdit, navigate, setValue, user.id]);

  const handleUploadImage = async (file: File) => {
    try {
      const uploadResult = await dispatch(
        uploadImageThunk({ file, typeUpload: TypeUpload.COVER_POST })
      );
      if (uploadImageThunk.fulfilled.match(uploadResult)) {
        const url = uploadResult.payload;
        setValue('cover', url, { shouldValidate: true });
      } else {
        toast.error('Image upload failed');
      }
    } catch {
      toast.error('Image upload failed');
    }
  };

  const handleUpdatePost = async (data: IPostForm) => {
    try {
      const result = await dispatch(updatePostThunk({ id: id!, data }));
      if (updatePostThunk.fulfilled.match(result)) {
        toast.success('Post updated successfully');
        navigate(`${AppRoutes.POSTS}/${id}`);
      } else {
        toast.error('Failed to update post');
      }
    } catch (err) {
      toast.error(err?.message || 'Update failed');
    } finally {
      setOpenModal(false);
    }
  };

  const onSubmit = async (data: IPostForm) => {
    if (!data.cover || data.cover.trim() === '') {
      toast.error('Please upload a cover image.');
      return;
    }

    const finalData = {
      ...data,
      content: rawContent,
    };

    const token = authStorage.getToken();
    if (!token) {
      toast.error('Please log in to continue');
      return;
    }

    if (isEdit) {
      setOpenModal(true);
    } else {
      try {
        const result = await dispatch(createPostThunk(finalData));
        if (createPostThunk.fulfilled.match(result)) {
          const post = result.payload;
          toast.success('Post created successfully');
          navigate(`${AppRoutes.POSTS}/${post.id}`);
        } else {
          toast.error('Failed to create post');
        }
      } catch (err) {
        toast.error(err?.message || 'Create failed');
      }
    }
  };

  return (
    <div className="page page-post-form">
      <div className="container">
        <div className="wrapper wrapper-padding">
          <form
            className="form form-xl form-post"
            onSubmit={handleSubmit(onSubmit)}
          >
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
                cover={cover || ''}
                onChange={handleUploadImage}
                defaultImage="/assets/images/articles/article-travel.png"
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
                    className="txt-bold"
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

      {isEdit && (
        <ModalComponent
          isOpen={openModal}
          title="Confirm Edit"
          message="Are you sure you want to update this post?"
          onConfirm={handleSubmit(handleUpdatePost)}
          onCancel={() => setOpenModal(false)}
        />
      )}
    </div>
  );
};

export default PostForm;

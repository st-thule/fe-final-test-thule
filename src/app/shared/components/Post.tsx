import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { AppRoutes } from '@app/core/constants/app-routes';
import { Post } from '@shared/models/post';
import { formatDate } from '@shared/utils/formatDate';

import { useAppDispatch } from '@app/store/hook/useAppDispatch';
import { useAppSelector } from '@app/store/hook/useAppSelector';
import { deletePostThunk } from '@app/store/post/thunk/postThunk';
import femaleIcon from '@assets/icons/avatar-female.svg';
import maleIcon from '@assets/icons/avatar-male.svg';
import otherIcon from '@assets/icons/avatar-other.svg';
import deleteIcon from '@assets/icons/delete.svg';
import editIcon from '@assets/icons/edit.svg';
import imagePost from '@assets/images/articles/article-travel.png';
import { ModalTypes } from '@shared/types/enum';
import { ModalComponent } from './Modal';

interface IPostProps {
  post: Post;
  className: string;
  onClick?: (id: string) => void;
  loading?: boolean;
  fallbackUser?: {
    displayName: string;
    picture?: string;
  };
}

export const PostComponent: React.FC<IPostProps> = ({
  post,
  className,
  onClick,
  fallbackUser,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const handleDeletePost = async (id: string | number) => {
    try {
      await dispatch(deletePostThunk(id!));
      toast.success('Delete successfully');
    } catch (error) {
      throw error;
    }
  };

  const author =
    post?.user?.gender === 'female'
      ? femaleIcon
      : post?.user?.gender === 'male'
      ? maleIcon
      : otherIcon;

  return (
    <li className={`list-item ${className}`}>
      <div>
        <div className="card-img">
          <img
            src={post.cover === 'cover' ? imagePost : post.cover}
            alt="card-img"
          />
          {user?.id === post?.userId && (
            <div className="card-action">
              <Link
                className="action"
                to={`${AppRoutes.POSTS}/edit/${post.id}`}
              >
                <img className="action-icon" src={editIcon} alt="edit" />
              </Link>
              <button className="action" onClick={() => setModalOpen(true)}>
                <img className="action-icon" src={deleteIcon} alt="delete" />
              </button>
            </div>
          )}
        </div>
        {post.tags && post.tags.length > 0 ? (
          post.tags.map((tag) => (
            <Link
              className="card-tag"
              key={tag}
              to={`${AppRoutes.POSTS}/tags/${tag}`}
            >
              {tag}
            </Link>
          ))
        ) : (
          <></>
        )}
        <div className="card-content">
          <Link to={`${AppRoutes.POSTS}/${post.id}`} onClick={() => onClick}>
            <h3 className="card-title">{post.title}</h3>
          </Link>
          <p className="card-desc">{post.description}</p>
          <div className="card-detail detail">
            <Link
              to={
                user?.id === post.userId
                  ? `${AppRoutes.USER}/me`
                  : `${AppRoutes.USER}/${post.userId}`
              }
              className="detail-group"
            >
              <img
                className="detail-image avatar-icon"
                src={post.user?.picture ?? fallbackUser?.picture ?? author}
                alt="avatar"
              />
              <p className="detail-value">
                {post.user?.displayName ??
                  fallbackUser?.displayName ??
                  user?.displayName}
              </p>
            </Link>
            <div className="detail-group">
              <p className="detail-value">{formatDate(post.createdAt)}</p>
            </div>
          </div>
        </div>
      </div>
      <ModalComponent
        isOpen={modalOpen}
        title="Confirm delete"
        message="Are you sure you want to delete?"
        onConfirm={() => handleDeletePost(post.id)}
        onCancel={() => setModalOpen(false)}
        type={ModalTypes.CONFIRM}
      />
    </li>
  );
};

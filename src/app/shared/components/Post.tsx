import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { AppRoutes } from '@app/core/constants/app-routes';
import { closeModal, openModal } from '@app/store/modal/action/modalAction';
import { AuthContext } from '@shared/contexts/auth.context';
import { Post } from '@shared/models/post';
import { formatDate } from '@shared/utils/formatDate';
import { ModalTypes } from '@shared/utils/modalTypes';

import deleteIcon from '@assets/icons/delete.svg';
import editIcon from '@assets/icons/edit.svg';
import imagePost from '@assets/images/articles/article-travel.png';
import author from '@assets/images/author.png';
import { deletePost } from '@shared/services/post.service';
import { toast } from 'react-toastify';

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
  loading = false,
  fallbackUser,
}) => {
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch();

  const handleDeletePost = async (id: string | number) => {
    try {
      await deletePost(id);
    } catch (error) {
      throw error;
    }
  };

  if (loading) {
    return (
      <li className={`list-item ${className}`}>
        <div className="card">
          <div className="card-img skeleton" />
          <div className="card-content">
            <div className="skeleton-tag mb-2" />
            <div className="skeleton-text" />
            <div className="skeleton-text mt-1" />
            <div className="card-detail detail">
              <div className="detail-group">
                <div className="skeleton-circle" />
                <div className="skeleton-text" />
              </div>
              <div className="skeleton-text" />
            </div>
          </div>
        </div>
      </li>
    );
  }
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
              <button
                className="action"
                onClick={() => {
                  dispatch(
                    openModal({
                      modalType: ModalTypes.CONFIRM,
                      modalProps: {
                        title: 'Confirm delete',
                        message: 'Are you sure ?',
                        onConfirm: async () => {
                          try {
                            handleDeletePost(post.id);
                            toast.success('Delete successfully');
                          } catch (error) {
                          } finally {
                            dispatch(closeModal());
                          }
                        },
                        onCancel: () => {
                          dispatch(closeModal());
                        },
                      },
                    })
                  );
                }}
              >
                <img className="action-icon" src={deleteIcon} alt="delete" />
              </button>
            </div>
          )}
        </div>
        {post.tags && post.tags.length > 0 ? (
          post.tags.map((tag) => (
            <Link className="card-tag" to="" key={tag}>
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
          <div className="card-detail detail">
            <div className="detail-group">
              <Link
                to={
                  user?.id === post.userId
                    ? `${AppRoutes.USER}/me`
                    : `${AppRoutes.USER}/${post.userId}`
                }
              >
                <img
                  className="detail-image"
                  src={post.user?.picture ?? fallbackUser?.picture ?? author}
                  alt="avatar"
                />
                <p className="detail-value">
                  {post.user?.displayName ??
                    fallbackUser?.displayName ??
                    user?.displayName}
                </p>
              </Link>
            </div>
            <div className="detail-group">
              <p className="detail-value">{formatDate(post.createdAt)}</p>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

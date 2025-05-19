import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { AppRoutes } from '@app/core/constants/app-routes';
import { useAppDispatch } from '@app/store/hook/useAppDispatch';
import { useAppSelector } from '@app/store/hook/useAppSelector';
import { closeModal, openModal } from '@app/store/modal/action/modalAction';
import {
  deletePostThunk,
  getPostByIdThunk,
} from '@app/store/post/thunk/postThunk';
import { AuthContext } from '@shared/contexts/auth.context';
import { Post } from '@shared/models/post';
import { PostService } from '@shared/services/post.service';
import { formatDate } from '@shared/utils/formatDate';
import { ModalTypes } from '@shared/utils/modalTypes';

import calendarIcon from '@assets/icons/calendar.svg';
import deleteIcon from '@assets/icons/delete.svg';
import editIcon from '@assets/icons/edit.svg';
import imagePost from '@assets/images/articles/article-travel.png';

const PostDetail = () => {
  const postService = new PostService();
  const { id } = useParams();
  const [post, setPost] = useState<Post>(null);
  const { user } = useContext(AuthContext);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loadingFetch = useAppSelector((state) => state.post.loading.getById);
  const errorFetch = useAppSelector((state) => state.post.error.getById);

  const errorDelete = useAppSelector((state) => state.post.error.delete);

  useEffect(() => {
    dispatch(getPostByIdThunk(id!)).then((action) => {
      if (getPostByIdThunk.fulfilled.match(action)) {
        const post = action.payload;
        setPost(post);
      }
    });
  }, [id]);

  useEffect(() => {
    if (errorFetch) {
      toast.error(errorFetch);
    }
  }, [errorFetch]);

  useEffect(() => {
    if (errorDelete) {
      toast.error(errorDelete);
    }
  }, [errorDelete]);
  return (
    <div className="page page-post-detail">
      <div className="container">
        <div className="wrapper wrapper-padding">
          <article className="article article-post">
            {loadingFetch ? (
              <>
                <div className="article-header">
                  <div className="skeleton-tag mb-2"></div>
                  <div className="skeleton-title"></div>
                  <div className="skeleton-small">
                    <div className="skeleton-circle"></div>
                  </div>
                </div>
                <div className="article-body">
                  <div className="article-thumbnail">
                    <div className="skeleton-image"></div>
                  </div>
                  <div className="skeleton-content"></div>
                </div>
              </>
            ) : post ? (
              <>
                <div className="article-header">
                  <ul className="list list-tags">
                    {post.tags && post.tags.length > 0 ? (
                      post.tags.map((tag) => (
                        <li className="list-item">
                          <Link className="tag" to="" key={tag}>
                            {tag}
                          </Link>
                        </li>
                      ))
                    ) : (
                      <></>
                    )}
                  </ul>
                  <h1 className="article-title">{post.title}</h1>
                  <p className="article-subtitle">{post.description}</p>
                  <div className="article-info">
                    <div className="article-meta">
                      <div className="meta-group">
                        <img
                          className="img meta-img"
                          src={
                            post.user?.picture ?? '/assets/images/author.png'
                          }
                          alt="Author"
                        />
                        <p className="meta-title">{post.user?.displayName}</p>
                      </div>
                      <div className="meta-group">
                        <img
                          className="img meta-img"
                          src={calendarIcon}
                          alt="Calendar"
                        />
                        <p className="meta-title">
                          {formatDate(post.createdAt)}
                        </p>
                      </div>
                    </div>
                    {user.id === post.userId && (
                      <div className="article-action">
                        <Link
                          className="action"
                          to={`${AppRoutes.POSTS}/edit/${post.id}`}
                        >
                          <img
                            className="action-icon"
                            src={editIcon}
                            alt="edit"
                          />
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
                                    dispatch(deletePostThunk(id!))
                                      .then(() => {
                                        toast.success('Delete successfully');
                                        navigate(-1);
                                      })
                                      .catch((error) => {
                                        toast.error(error);
                                      })
                                      .finally(() => {
                                        closeModal();
                                      });
                                  },
                                  onCancel: () => {
                                    dispatch(closeModal());
                                  },
                                },
                              })
                            );
                          }}
                        >
                          <img
                            className="action-icon"
                            src={deleteIcon}
                            alt="delete"
                          />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="article-body">
                  <img
                    className="img article-thumbnail"
                    src={post.cover === 'cover' ? imagePost : post.cover}
                    alt="Post"
                  />
                  <div
                    className="article-content"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  ></div>
                </div>
              </>
            ) : (
              <p>Post not found.</p>
            )}
          </article>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;

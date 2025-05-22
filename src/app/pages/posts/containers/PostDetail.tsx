import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { AppRoutes } from '@app/core/constants/app-routes';
import { useAppDispatch } from '@app/store/hook/useAppDispatch';
import { useAppSelector } from '@app/store/hook/useAppSelector';
import {
  deletePostThunk,
  getPostByIdThunk,
} from '@app/store/post/thunk/postThunk';
import { ModalComponent } from '@shared/components/Modal';
import { Post } from '@shared/models/post';
import { formatDate } from '@shared/utils/formatDate';

import femaleIcon from '@assets/icons/avatar-female.svg';
import maleIcon from '@assets/icons/avatar-male.svg';
import otherIcon from '@assets/icons/avatar-other.svg';
import calendarIcon from '@assets/icons/calendar.svg';
import deleteIcon from '@assets/icons/delete.svg';
import editIcon from '@assets/icons/edit.svg';
import imagePost from '@assets/images/articles/article-travel.png';
import { ModalTypes } from '@shared/types/enum';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const user = useAppSelector((state) => state.auth.user);
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

  const handleDeletePost = (id: string | number) => {
    dispatch(deletePostThunk(id!));
    toast.success('Delete successfully');
    navigate(-1);
  };

  const author =
    post?.user?.gender === 'female'
      ? femaleIcon
      : post?.user?.gender === 'male'
      ? maleIcon
      : otherIcon;

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
                          <Link
                            className="tag"
                            to={`${AppRoutes.POSTS}/tags/${tag}`}
                            key={tag}
                          >
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
                          className="avatar-icon"
                          src={post.user?.picture ?? author}
                          alt="Author"
                        />
                        <p className="meta-title">
                          <Link to={`${AppRoutes.USER}/${post.user?.id}`}>
                            {post.user?.displayName}
                          </Link>
                        </p>
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
                    {user?.id === post.userId && (
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
                            setModalOpen(true);
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
                <div className="line"></div>
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
      <ModalComponent
        type={ModalTypes.CONFIRM}
        isOpen={modalOpen}
        title="Confirm logout"
        message="Are you sure you want to logout?"
        onConfirm={() => handleDeletePost(id!)}
        onCancel={() => setModalOpen(false)}
      />
    </div>
  );
};

export default PostDetail;

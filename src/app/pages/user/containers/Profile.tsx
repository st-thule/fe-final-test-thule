import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch } from '@app/store/hook/useAppDispatch';
import { useAppSelector } from '@app/store/hook/useAppSelector';
import { getPersonalInfoThunk } from '@app/store/user/thunk/userThunk';
import { Button } from '@shared/components/partials';
import { PostList } from '../components/PostList';

import femaleIcon from '@assets/icons/avatar-female.svg';
import maleIcon from '@assets/icons/avatar-male.svg';
import otherIcon from '@assets/icons/avatar-other.svg';

const Profile = () => {
  const params = useParams();
  const id = params.id ?? 'me';
  const dispatch = useAppDispatch();
  const authUser = useAppSelector((state) => state.auth.user);
  const { personalInfo, loading } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (id) {
      dispatch(getPersonalInfoThunk({ id }));
    }
  }, [dispatch, id, authUser?.id]);

  const isMyProfile = personalInfo?.id === authUser?.id;

  if (loading || !personalInfo) {
    return <div className="text-center">Loading profile...</div>;
  }

  const author =
    personalInfo?.gender === 'female'
      ? femaleIcon
      : personalInfo?.gender === 'male'
      ? maleIcon
      : otherIcon;

  return (
    <div className="page page-profile">
      <div className="container">
        <div className="wrapper wrapper-padding">
          <section className="section section-info">
            <div className="section-image">
              <img
                className="img avatar"
                src={personalInfo.picture || author}
                alt="avatar"
              />
            </div>
            <div className="section-content">
              <div className="section-text">
                <h1 className="section-title">
                  {personalInfo.firstName} {personalInfo.lastName}
                </h1>
                <p className="section-subtitle">{personalInfo.email}</p>
              </div>
              {isMyProfile && (
                <Button label="Edit" className="btn btn-primary" />
              )}
            </div>
          </section>

          <section className="section section-list section-post">
            <div className="section-header">
              <h2 className="section-title">Articles</h2>
            </div>
            <PostList
              posts={personalInfo.Posts || []}
              userInfo={{
                displayName: personalInfo.displayName,
                picture: personalInfo.picture,
              }}
              className="col-12 col-sm-6 com-md-3"
            />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Profile;

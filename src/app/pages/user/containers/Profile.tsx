import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Button } from '@shared/components/partials';
import { PostListLoadMore } from '@shared/components/PostListLoadMore';
import { UserWithPost } from '@shared/models/user';
import { UserService } from '@shared/services/user.service';

import avatar from '@assets/icons/avatar.svg';
import { useAppSelector } from '@app/store/hook/useAppSelector';

const Profile = () => {
  const userService = new UserService();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserWithPost | null>(null);
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const targetId = id || user?.id || 'me';
        const data = await userService.getPersonalInfo(targetId);
        setUserInfo(data);
      } catch (error) {
        throw error;
      } finally {
        setIsLoading(false);
      }
    };

    if (id || user?.id) {
      fetchUserData();
    }
  }, [id, user?.id]);

  return (
    <div className="page page-profile">
      <div className="container">
        <div className="wrapper wrapper-padding">
          <section className="section section-info">
            <div className="section-image">
              <img className="img avatar" src={userInfo?.picture || avatar} />
            </div>
            <div className="section-content">
              {userInfo && (
                <div className="section-text">
                  <h1 className="section-title">
                    {userInfo.firstName} {userInfo.lastName}
                  </h1>
                  <p className="section-subtitle">{userInfo.email}</p>
                </div>
              )}

              <Button label="Edit" className="btn btn-primary" />
            </div>
          </section>
          <div className=""></div>
          <section className="section section-list section-post">
            <div className="section-header">
              <h2 className="section-title">Articles</h2>
              {userInfo && (
                <PostListLoadMore
                  posts={userInfo.Posts || []}
                  userInfo={{
                    displayName: userInfo.displayName,
                    picture: userInfo.picture,
                  }}
                  className="col-12 col-sm-6 com-md-3"
                />
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Profile;

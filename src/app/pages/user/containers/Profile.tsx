import React, { useContext, useEffect, useState } from 'react';

import { Button } from '@shared/components/partials';
import { PostComponent } from '@shared/components/Post';
import { AuthContext } from '@shared/contexts/auth.context';
import { UserWithPost } from '@shared/models/user';
import { getUserInfo } from '@shared/services/user.service';

import avatar from '@assets/icons/avatar.svg';

const Profile = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState<UserWithPost | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const data = await getUserInfo(user.id);
        setUserInfo(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, [user.id]);

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
              <h2 className="section-title">My Article</h2>
              {userInfo?.Posts?.length > 0 ? (
                <ul className="list list-posts row">
                  {userInfo.Posts.map((post) => (
                    <PostComponent
                      key={post.id}
                      post={post}
                      className={'col-12 col-sm-6 com-md-3'}
                    />
                  ))}
                </ul>
              ) : (
                <p>No post here</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Profile;

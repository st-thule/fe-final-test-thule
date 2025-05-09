import React from 'react';

import calendarIcon from '@assets/icons/calendar.svg';

const PostDetail = () => {
  return (
    <div className="page page-post">
      <div className="container">
        <div className="wrapper">
          <section className="section section-user">
            <div className="section-image">
              <img className="img" src="/assets/images/author.png" />
            </div>
            <div className="section-content">
              <h2 className="section-title">Cruz Mcintype</h2>
              <p className="section-subtitle">Author</p>
            </div>
          </section>

          <section className="section section-post">
            <h2 className="section-title"></h2>
            <p className="section-subtitle"></p>
            <img className="img thumbnail" src="/assets/images/banner.png" />
            <div className="section-meta meta">
              <img className="img" src={calendarIcon} />
              <p className="meta-value"></p>
            </div>
            <p className="section-content">
              Before embarking on your journey, take the time to research your
              destination. This includes understanding the local culture,
              customs, and laws, as well as identifying top attractions,
              restaurants, and accommodations. Doing so will help you navigate
              your destination with confidence and avoid any cultural faux pas.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. In
              hendrerit gravida rutrum quisque non tellus orci ac auctor. Mi
              ipsum faucibus vitae aliquet nec ullamcorper sit amet. Aenean
              euismod elementum nisi quis eleifend quam adipiscing vitae.
              Viverra adipiscing at in tellus.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;

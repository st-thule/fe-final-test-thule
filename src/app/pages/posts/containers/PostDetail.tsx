import React from 'react';
import { Link } from 'react-router-dom';

import calendarIcon from '@assets/icons/calendar.svg';

const PostDetail = () => {
  return (
    <div className="page page-post">
      <div className="container">
        <div className="wrapper">
          <section className="section section-post">
            <Link className="section-tag" to={''}>
              Technology
            </Link>
            <h2 className="section-title">
              Creating a Modal Component: The Redux Way
            </h2>
            <p className="section-subtitle">
              I recently interviewed for a Senior Frontend Engineer role at
              Quizizz. The overall process was smooth, with four rounds covering
              JavaScript
            </p>

            <section className="section section-meta meta">
              <div className="meta-group">
                <img className="img meta-img" src="/assets/images/author.png" />
                <p className="meta-title">Cruz Mcintype</p>
              </div>
              <div className="meta-group">
                <img className="img meta-img" src={calendarIcon} />
                <p className="meta-title">21/09/2025</p>
              </div>
            </section>
            <img
              className="img section-thumbnail"
              src="/assets/images/banner.png"
            />
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

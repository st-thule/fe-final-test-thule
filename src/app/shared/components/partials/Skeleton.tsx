import React from 'react';

interface SkeletonPostProps {
  className?: string;
}

export const SkeletonPost: React.FC<SkeletonPostProps> = ({ className }) => {
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
};

export const SkeletonPostDetail = () => {
  return (
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
  );
};

export const SkeletonProfile = () => {
  return (
    <section className="section section-info">
      <div className="section-image skeleton-avatar"></div>

      <div className="section-content skeleton-content">
        <div className="skeleton-title" />
        <div className="skeleton-text" />
        <div className="skeleton-text" />
        <div className="skeleton-text" />
      </div>
    </section>
  );
};

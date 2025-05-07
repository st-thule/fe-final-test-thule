import React from 'react';

const AppErrorBoundaryFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div className="pages-container">
      <h2 className="txt-bold">Opps, Something went wrong...</h2>
      <p className="error-message">{error.message}</p>
      <button onClick={resetErrorBoundary} className="btn btn-primary">
        Try again
      </button>
    </div>
  );
};

export default AppErrorBoundaryFallback;

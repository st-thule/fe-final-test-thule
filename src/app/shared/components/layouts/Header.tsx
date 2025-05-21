import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { AppRoutes } from '@app/core/constants/app-routes';
import { logoutThunk } from '@app/store/auth/thunk/authThunk';
import { useAppDispatch } from '@app/store/hook/useAppDispatch';
import { useAppSelector } from '@app/store/hook/useAppSelector';
import { ModalComponent } from '../Modal';
import { Button } from '../partials/Button';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const [hidden, setHidden] = useState(false);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const isAuthenticated = !!user;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const onLogoutConfirm = () => {
    dispatch(logoutThunk());
    toast.success('Logout successfully');
    setModalOpen(false);
    navigate(window.location.pathname, { replace: true });
  };

  return (
    <header className={`header ${hidden ? 'header-hidden' : ''}`}>
      <div className="container">
        <div className="wrapper wrapper-flex">
          <h2 className="logo">
            <Link to="/">
              <img src="/assets/images/logo.png" />
            </Link>
          </h2>
          <div className="header-action">
            {isAuthenticated ? (
              <div className="dropdown">
                <div
                  className="dropdown-toggle"
                  onClick={() => setIsOpen((prev) => !prev)}
                >
                  <p className="dropdown-title">{user.displayName}</p>
                  {!user.picture?.trim() ? (
                    <i className="fas fa-user"></i>
                  ) : (
                    <img src={user.picture} alt="User Avatar" />
                  )}
                </div>

                {isOpen && (
                  <nav className="dropdown-menu" ref={dropdownRef}>
                    <ul className="list list-dropdown">
                      <li className="list-item">
                        <Link className="list-link" to={`${AppRoutes.USER}/me`}>
                          Profile
                        </Link>
                      </li>
                      <li className="list-item">
                        <Link
                          className="list-link"
                          to={`${AppRoutes.POSTS}/${AppRoutes.POSTADD}`}
                        >
                          + Add post
                        </Link>
                      </li>
                      <li
                        className="list-item"
                        onClick={() => setModalOpen(true)}
                      >
                        <span className="list-link">Sign out</span>
                      </li>
                    </ul>
                  </nav>
                )}
              </div>
            ) : (
              <Link
                to={{
                  pathname: `${AppRoutes.AUTH}/${AppRoutes.LOGIN}`,
                }}
                state={{ from: window.location.pathname }}
              >
                <Button className="btn btn-primary" label="Login" />
              </Link>
            )}
          </div>
        </div>
      </div>

      <ModalComponent
        isOpen={modalOpen}
        title="Confirm logout"
        message="Are you sure you want to logout?"
        onConfirm={onLogoutConfirm}
        onCancel={() => setModalOpen(false)}
      />
    </header>
  );
};

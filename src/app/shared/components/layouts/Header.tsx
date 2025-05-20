import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { AppRoutes } from '@app/core/constants/app-routes';
import { authStorage } from '@app/core/services/auth-storage.service';
import { AuthContext } from '@shared/contexts/auth.context';
import { Button } from '../partials/Button';
import { openModal } from '@app/store/modal/action/modalAction';
import { ModalTypes } from '@shared/utils/modalTypes';

export const Header = () => {
  const { user, isAuthenticated, clearUserSession } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

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
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const currentUrl = window.location.pathname;

  const handleClickDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    clearUserSession();
    authStorage.removeToken();
    toast.success('Logout successfully');
    navigate(currentUrl, { replace: true });
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
                <div className="dropdown-toggle">
                  <p className="dropdown-title">{user.displayName}</p>
                  {!user.picture?.trim() ? (
                    <i
                      className="fas fa-user"
                      onClick={handleClickDropdown}
                    ></i>
                  ) : (
                    <img src={user.picture} alt="User Avatar" />
                  )}
                </div>

                {isOpen && (
                  <nav className="dropdown-menu" ref={dropdownRef}>
                    <ul className="list list-dropdown">
                      <li className="list-item">
                        <Link
                          className="list-link"
                          to={`${AppRoutes.USER}/${AppRoutes.PROFILE}`}
                        >
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
                        onClick={() =>
                          dispatch(
                            openModal({
                              modalType: ModalTypes.CONFIRM,
                              modalProps: {
                                title: 'Confirm logout',
                                message: 'Are you sure you want to logout ?',
                                onConfirm: () => {
                                  handleLogout();
                                },
                              },
                            })
                          )
                        }
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
                state={{ from: location.pathname }}
              >
                <Button className="btn btn-primary" label="Login" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

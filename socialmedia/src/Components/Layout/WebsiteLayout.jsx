import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import ProtectedRoute from '../../Routes/ProtectedRoute';
import { useSelector } from 'react-redux';
import axios from 'axios';

import Login from "../Account/Login"
import Signup from "../Account/Signup"
import Dashboard from '../Dashboard';
import Header from '../Header';
import MessageLayout from '../Messages/MessgaeLayout';
import UserProfileLayout from '../Profile/UserProfileLayout';
import BlogLayout from '../Blog/BlogLayout';
import BlogContent from '../Blog/BlogContent';
import CreateBlog from '../Blog/CreateBlog';
import BlogPage from '../Blog/BlogPage';
import News from '../Other/News';
import FrinedList from '../Profile/FrinedList';
import UpdateProfile from '../Setting/updateProfile';
import SearchedPerosn from '../SearchedPerson/SearchedPerosn';
import CreateStory from '../Story/CreateStory';
import CreatePost from '../Post/CreatePost';
import ShowSelectedStory from '../Story/showSelectedStory';
import SettingsOptions from '../Setting/settingsOptions';
import UpdatePassword from '../Setting/updatePassword';
import PageNotFound from '../Animation/PageNotFound';
import AuthFailed from '../Animation/AuthFailed';
import MessageBox from '../Messages/MessageBox';

const WebsiteLayout = () => {
  const loggedUserId = useSelector((state) => state.LoginSlice.loggedUserId);

  const [userPhoto, setUserPhoto] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error , setError] = useState()

  useEffect(() => {
    if (loggedUserId && loggedUserId !== null) {
      axios.post("http://127.0.0.1:8080/auth/userLoggedDetails", { loggedUserId: loggedUserId })
        .then((res) => {
          setUserPhoto(res.data);
        })
        .catch((error) => {
          setError(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [loggedUserId]);

  const [dashboard, setDashboard] = useState(false);

  const dashboardDisplay = (value) => {
    setDashboard(value);
  };


  const location = useLocation();
  const hideHeaderAndDashboard = ['/', '/signup', '/auth-failed', "/"].includes(location.pathname);

  return (
    <div className=''>
      {!hideHeaderAndDashboard && !isLoading && (
        <ProtectedRoute>
          <Header userPhoto={userPhoto} dashboardDisplay={dashboardDisplay} />
        </ProtectedRoute>
      )}
      <div className={!hideHeaderAndDashboard ? 'mt-[55px]' : null}>
        {!hideHeaderAndDashboard && !isLoading && (
          <ProtectedRoute>
            <Dashboard dashboard={dashboard} />
          </ProtectedRoute>
        )}
        <div>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route path="/home" element={<ProtectedRoute><UserProfileLayout userPhoto={userPhoto}/></ProtectedRoute>} />

            <Route path="/message" element={<ProtectedRoute><MessageLayout userPhoto={userPhoto} /></ProtectedRoute>} />
            <Route path="/message/:roomID" element={<ProtectedRoute><MessageBox /></ProtectedRoute>} />

            <Route path="/friends" element={<ProtectedRoute><FrinedList /></ProtectedRoute>} />

            <Route path="/blog" element={<ProtectedRoute><BlogLayout /></ProtectedRoute>} />
            <Route path="/blog" element={<ProtectedRoute><BlogPage /></ProtectedRoute>} />
            <Route path="/blog/ReadContent/:articleName/:id" element={<ProtectedRoute><BlogContent /></ProtectedRoute>} />
            <Route path="/blog/CreateBlog" element={<ProtectedRoute><CreateBlog /></ProtectedRoute>} />

            <Route path="/news" element={<ProtectedRoute><News /></ProtectedRoute>} />

            <Route path="/account-setting" element={<ProtectedRoute><SettingsOptions /></ProtectedRoute>} />
            <Route path="/update-profile" element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} />
            <Route path="/update-password" element={<ProtectedRoute><UpdatePassword /></ProtectedRoute>} />

            <Route path="/create-story" element={<ProtectedRoute><CreateStory /></ProtectedRoute>} />
            <Route path="/story/view-story/:storyId" element={<ProtectedRoute><ShowSelectedStory /></ProtectedRoute>} />

            <Route path="/create-post" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />

            <Route path="/searched-person/:searchedUserId" element={<ProtectedRoute><SearchedPerosn /></ProtectedRoute>} />

            <Route path="/auth-failed" element={<AuthFailed />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default WebsiteLayout;

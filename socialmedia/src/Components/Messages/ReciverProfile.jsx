import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

import noProfilePicture from '../../Assets/NoProileImage.png';

const ReciverProfile = ({ toggleprofileDisplay }) => {

  const [Profile, setProfile] = useState();
  const reciver_id = useSelector((state) => state.messageSlice.receiverId);
  const reciver_photo = useSelector((state) => state.messageSlice.reciverPhoto);

  useEffect(() => {
    if (reciver_id) {
      axios.post("http://127.0.0.1:8080/auth/getUserProfile", { userId: reciver_id })
        .then((res) => {
          setProfile(res.data);
        })
        .catch((error) => {
          console.error('Error fetching user profile:', error);
        });
    }
  }, [reciver_id]);

  return (
    <div>
      <div className="shadow-inner h-[100%] w-full sm:w-1/2 lg:w-2/4 xl:w-1/4 mt-16 backdrop-blur-2xl fixed right-0 top-0 z-40 dark:bg-dark2 dark:border-slate-700">
        <div className="h-1 bg-gradient-to-r to-blue-500 via-blue-600 from-blue-900"></div>
        <svg onClick={() => { toggleprofileDisplay(0) }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 absolute top-5 right-5 rounded-full p-1 active:bg-black/30">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
        <div className="py-5 pb-0 text-center text-sm ">
          {reciver_photo ? 
            <img src={reciver_photo} className="w-24 h-24 rounded-full mx-auto" alt="avatar" />
            : 
            <img src={noProfilePicture} className="w-24 h-24 rounded-full mx-auto" alt="avatar" />
          }
          <div className="mt-2">
            <div className="md:text-xl text-base font-medium text-black dark:text-white">{Profile?.userProfile1.firstName} {Profile?.userProfile1.lastName}</div>
            <div className="text-gray-500 text-sm mt-1 dark:text-white/80">{Profile?.userProfile1.userName}</div>
          </div>
          <div className="mt-1">
            <Link to={`/searched-person/${reciver_id}`} style={{ textDecoration: "none" }} className="inline-block rounded-full px-4 py-1.5 text-sm font-semibold bg-slate-200">View profile</Link>
          </div>
        </div>
        <hr className="opacity-80 " />
      </div>
    </div>
  );
};

export default React.memo(ReciverProfile);
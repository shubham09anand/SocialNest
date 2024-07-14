import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import MessgaeSection from './MessgaeSection';
import ReciverProfile from './ReciverProfile';
import ScheduledMessage from './ScheduledMessage';
import { Link } from "react-router-dom";

import noProfilePicture from '../../Assets/NoProileImage.png';

const MessageBox = ({ userPhoto }) => {

  const [Profile, setProfile] = useState();
  const [display, setDisplay] = useState(0);
  const reciver_id = useSelector((state) => state.messageSlice.receiverId);

  const toggleprofileDisplay = (value) => {
    console.log(value)
    setDisplay(value);
  };

  useEffect(() => {
    axios.post("http://127.0.0.1:8080/auth/getUserProfile", { userId: reciver_id })
      .then((res) => {
        setProfile(res.data);
      })
      .catch((error) => {
        console.error('Error');
      });
  }, [reciver_id]);

  return (
    <>
      <div className="mt-2 flex fixed w-full xl:w-[80%] 2xl:w-[83%] right-0 bg-white items-center justify-between gap-2 px-6 z-10 border-2  border-r-0 border-t-0 shadow-inner rounded-lg py-2 example">
        <div className='flex space-x-4 items-center place-content-center'>
          <Link to="/message">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-6 h-6 active:opacity-60 cursor-pointer">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </Link>
          <div className="flex items-center sm:gap-4 gap-2">
            <div className="relative cursor-pointer">
              {Profile?.userProfile2 ?
                <img src={Profile?.userProfile2?.profilePhoto} alt="" className="select-none w-9 h-9 rounded-full shadow object-contain" />
                :
                <img src={noProfilePicture} alt="" className="w-8 h-8 rounded-full shadow" />
              }
              <div className="w-2 h-2 bg-teal-500 rounded-full absolute right-0 bottom-0 m-px"></div>
            </div>
            <Link to={`/searched-person/${reciver_id}`} style={{ textDecoration: "none" }} className="cursor-pointer">
              <div className="text-base font-bold">{Profile?.userProfile1.firstName} {Profile?.userProfile1.lastName}</div>
              <div className="text-xs text-green-500 font-semibold">{Profile?.userProfile1.userName}</div>
            </Link>
          </div>
        </div>
        <div className='flex gap-x-5 place-content-center items-center'>
          <div className='bg-slate-300 cursor-pointer active:opacity-70 rounded-full w-9 h-9 flex p-2 items-center place-content-center' title='Video Calling'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-camera-video w-6 h-6 " viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2zm11.5 5.175 3.5 1.556V4.269l-3.5 1.556zM2 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1z" />
            </svg>
          </div>
          <div onClick={() => toggleprofileDisplay(2)} className='relative cursor-pointer active:opacity-60 bg-slate-300 rounded-full p-2 scale-90' title='scheduled messages'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-clock-history w-3 h-3 absolute bottom-2 right-2 border-2 z-20 bg-white rounded-full" viewBox="0 0 16 16">
              <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z" />
              <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z" />
              <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5" />
            </svg>
          </div>
          <div onClick={() => toggleprofileDisplay(1)} className="bg-slate-300 rounded-full active:opacity-60 flex items-center gap-2">
            <button type="button" className="p-1.5 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {
        display === 1 ? <ReciverProfile toggleprofileDisplay={toggleprofileDisplay} /> :
          display === 2 ? <ScheduledMessage toggleprofileDisplay={toggleprofileDisplay} /> :
            null
      }

      <MessgaeSection userPhoto={userPhoto} />

    </>
  );
};

export default React.memo(MessageBox);
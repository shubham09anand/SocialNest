
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import noProfilePicture from '../../Assets/NoProileImage.png';
import backgroundPicture from '../../Assets/images/avatars/profile-cover.jpg';

import UserProfile from '../Profile/UserProfile';
import SearchedPersonPost from './searchedPersonPost';
import CheckFriendStatus from './CheckFriendStatus';

const SearchedPerson = () => {

  const loggedUser = useSelector((state) => (state.LoginSlice.loggedUserId));

  const { searchedUserId } = useParams();

  const [ListDisplay, setListDisplay] = useState(0);
  const [info, setInfo] = useState(null);
  const [UserData, setUserData] = useState({});

  const toggleListDisplay = (value) => {
    setListDisplay(value);
  };

  useEffect(() => {
    if (searchedUserId) {
      axios
        .post("http://127.0.0.1:8080/auth/getUserProfile", { userId: searchedUserId })
        .then((res) => {
          setUserData(res.data);
        })
        .catch((error) => {
          console.error('Error fetching user profile:', error);
        });
    }
  }, [searchedUserId]);

  //getting user frined and post count
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://127.0.0.1:8080/auth/userDetails", { userId: searchedUserId });
        setInfo(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();

  }, [searchedUserId]);

  // console.log(UserData)

  return (
    <>
      <div className='w-full xl:w-[80%] 2xl:w-[83%] overflow-x-hidden xl:p-5 xl:absolute right-0 -z-10'>
        <div className="pb-2 w-full bg-white shadow lg:rounded-b-2xl lg:-mt-10 dark:bg-dark2">
          <div className="relative overflow-hidden w-full lg:h-72 h-48">
          {UserData?.userProfile2?.backGroundPhoto ?
                                   <img src={UserData?.userProfile2?.backGroundPhoto} alt="backgroundPicture" className="h-full w-full object-fill" />
                                   :
                                   <div className='bg-gradient-to-br from-sky-200 via-sky-300 to-sky-700 h-full w-full'></div>
                              }          </div>
          <div className="p-3">

            <div className="flex flex-col justify-center md:items-center lg:-mt-32 sm:-mt-16 -mt-20">
              <div className="relative z-10">
                <div className="mx-auto relative overflow-hidden rounded-full h-24 w-24 md:h-32 md:w-32 lg:h-48 lg:w-48 md:border-[6px] border-gray-100 shrink-0 shadow">
                  {UserData.userProfile2 ? <img src={UserData.userProfile2?.profilePhoto} alt="" className="h-24 w-24 md:h-32 md:w-32 lg:h-48 lg:w-48 object-cover inset-0" /> : <img src={noProfilePicture} alt="" className="h-24 w-24 md:h-32 md:w-32 lg:h-48 lg:w-48 object-cover inset-0" />}
                </div>
              </div>
            </div>

            {UserData.userProfile1 ? (
              <>
                <h3 className="md:text-4xl sm:text-3xl text-2xl font-bold text-black dark:text-white text-center">
                  {`${UserData.userProfile1.firstName} ${UserData.userProfile1.lastName}`}
                </h3>
                <div className='text-sm mt-2 text-center md:px-20 lg:w-1/2 mx-auto font-extrabold font-mono'>
                  {UserData.userProfile2 && UserData.userProfile2.description}
                </div>
              </>
            ) : (
              <div className="animate-pulse flex space-x-4 border-0 mx-auto w-fit">
                <div className="space-y-2">
                  <div className="h-2 bg-slate-200 rounded w-20 mx-auto"></div>
                  <div className="h-2 bg-slate-200 rounded w-60 mx-auto"></div>
                </div>
              </div>
            )}
            <div className="pb-2 sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto pt-2 bg-white shadow-lg rounded-lg text-gray-900">
              <ul className=" text-gray-700 flex items-center justify-around">
                <li className="flex flex-col items-center justify-around">
                  <div className='text-2xl font-semibold font-mono'>Friends</div>
                  {info?.friendCount || info?.friendCount === 0 ? 
                    <div className='text-2xl font-semibold font-mono'>{info?.friendCount}</div>
                      : 
                    <div className='text-2xl font-semibold font-mono'>{<div className='animate-pulse w-10 h-2 rounded bg-gray-300 mx-auto'></div>}</div>
                  }
                </li>
                <li className="flex flex-col items-center justify-between">
                  <div className='text-2xl font-semibold font-mono'>Post</div>
                  {info?.postCount || info?.postCount === 0 ? 
                    <div className='text-2xl font-semibold font-mono'>{info?.postCount}</div>
                      : 
                    <div className='text-2xl font-semibold font-mono'>{<div className='animate-pulse w-10 h-2 rounded bg-gray-300 mx-auto'></div>}</div>
                  }
                </li>
              </ul>
              {loggedUser !== searchedUserId ? (<><CheckFriendStatus searchedUserId={searchedUserId} /></>) : null}
            </div>
          </div>
          <div className='md:hidden'>
            <div className="flex w-full mt-3 border-t border-gray-100 max-lg:flex-col dark:border-slate-700">
              <nav className="flex -mb-px text-gray-600 font-medium text-[15px] w-full dark:text-white max-md:w-full max-md:overflow-x-auto">
                <div onClick={() => toggleListDisplay(0)} className="cursor-pointer w-full text-center bg-gray-200 hover:bg-gray-500  py-3 leading-8">Post</div>
                <div onClick={() => toggleListDisplay(2)} className="cursor-pointer w-full text-center bg-gray-200 hover:bg-gray-500  py-3 leading-8">About</div>
              </nav>
            </div>
          </div>
        </div>
        <div className='lg:pt-5 md:flex mt-2'>
          {(() => {
            if (ListDisplay === 0) {
              return (
                <>
                  {searchedUserId ? <SearchedPersonPost searchedUserId={searchedUserId} /> : null}
                  <div className='hidden ml-2 md:block h-fit'>
                    <UserProfile userProfile={UserData.userProfile2} userName={UserData.userProfile1?.userName} joinedOn={UserData.userProfile1?.createdAt} />
                  </div>
                </>
              );
            } else if (ListDisplay === 1) {
              return null;
            } else if (ListDisplay === 2) {
              return <div className='md:hidden'><UserProfile userProfile={UserData.userProfile2} /></div>;
            }
          })()}
        </div>
      </div>
    </>
  );
};

export default SearchedPerson;

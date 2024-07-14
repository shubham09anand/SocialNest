import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';

import noProfilePicture from '../../Assets/NoProileImage.png';
import backgroundPicture from '../../Assets/images/avatars/profile-cover.jpg';

import Post from '../Post/Post';
import UserProfile from './UserProfile';
import { Link } from 'react-router-dom';

const UserProfileLayout = ({ userPhoto }) => {

     const userId = useSelector((state) => (state.LoginSlice.loggedUserId));
     // console.log(userId)

     const [ListDisplay, setListDisplay] = useState(0);
     const [info, setInfo] = useState(null);
     const [UserData, setUserData] = useState({});

     const toggleListDisplay = (value) => {
          setListDisplay(value);
     }

     useEffect(() => {
          axios.post("http://127.0.0.1:8080/auth/getUserProfile", { userId: userId })
               .then((res) => {
                    // console.log(res.data);
                    setTimeout(() => {
                         setUserData(res.data);
                    }, 2000)
               })
               .catch((error) => {
                    console.log(error);
               });
     }, [userId])

     //getting user frined and post count
     useEffect(() => {
          const fetchData = async () => {
               try {
                    const response = await axios.post("http://127.0.0.1:8080/auth/userDetails", { userId: userId });
                    setTimeout(() => {
                         setInfo(response.data);
                    }, 3000);
               } catch (error) {
                    console.error('Error:', error);
               }
          };
          fetchData();
     }, [userId]);

     return (
          <>
               <div className='w-full xl:w-[80%] 2xl:w-[83%] overflow-x-hidden xl:p-5 xl:absolute right-0 -z-10'>
                    <div className="w-full bg-white shadow lg:rounded-b-2xl lg:-mt-10">
                         <div className="relative overflow-hidden w-full lg:h-72 h-48">
                              {UserData?.userProfile2?.backGroundPhoto ?
                                   <img src={UserData?.userProfile2?.backGroundPhoto} alt="backgroundPicture" className="h-full w-full object-fill" />
                                   :
                                   <div className='bg-gradient-to-br from-sky-200 via-sky-300 to-sky-700 h-full w-full'></div>
                              }
                         </div>
                         <div className="p-3">
                              <div className="flex flex-col justify-center md:items-center lg:-mt-32 sm:-mt-16 -mt-24">
                                   <div className="relative z-10">
                                        <div className="mx-auto relative overflow-hidden rounded-full h-24 w-24 md:h-32 md:w-32 lg:h-48 lg:w-48 border-[6px] border-gray-100 shrink-0 shadow">
                                             {UserData?.userProfile2 ? <img src={UserData?.userProfile2?.profilePhoto} alt="" className="h-24 w-24 md:h-32 md:w-32 lg:h-48 lg:w-48 object-contain backdrop-blur-xl bg-white" /> : <img src={noProfilePicture} alt="" className="h-24 w-24 md:h-32 md:w-32 lg:h-48 lg:w-48 object-cover inset-0" />}
                                        </div>
                                   </div>
                              </div>
                              <h3 className="md:text-3xl text-xl font-bold text-black dark:text-white text-center"> </h3>
                              {
                                   UserData?.userProfile1 ? (
                                        <>
                                             <h3 className="md:text-4xl sm:text-3xl text-2xl font-bold text-black dark:text-white text-center">
                                                  {UserData?.userProfile1 && `${UserData?.userProfile1.firstName} ${UserData?.userProfile1.lastName}`}
                                             </h3>
                                             <div className='text-sm mt-2 text-center md:px-20 lg:w-1/2 mx-auto font-extrabold font-mono'>
                                                  {UserData?.userProfile2 && `${UserData?.userProfile2.description}`}
                                             </div>
                                        </>
                                   ) : (
                                        <div className="animate-pulse flex space-x-4 border-0 mx-auto w-fit mt-3">
                                             <div className="space-y-2">
                                                  <div className="h-8 mb-2 bg-slate-500 rounded-2xl w-60 mx-auto"></div>
                                                  <div className='flex justify-between gap-x-2'>
                                                       <div className="h-1 bg-slate-500 rounded-lg w-20 mx-auto"></div>
                                                       <div className="h-1 bg-slate-500 rounded-lg w-10 mx-auto"></div>
                                                       <div className="h-1 bg-slate-500 rounded-lg w-20 mx-auto"></div>
                                                  </div>
                                                  <div className='flex justify-between gap-x-2'>
                                                       <div className="h-1 bg-slate-500 rounded-lg w-40 mx-auto"></div>
                                                       <div className="h-1 bg-slate-500 rounded-lg w-10 mx-auto"></div>
                                                       <div className="h-1 bg-slate-500 rounded-lg w-1 mx-auto"></div>
                                                       <div className="h-1 bg-slate-500 rounded-lg w-10 mx-auto"></div>
                                                  </div>
                                             </div>
                                        </div>
                                   )
                              }

                              <div className=" sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-2 bg-white shadow-xl rounded-lg text-gray-900">
                                   {info ?
                                        <ul className="text-gray-700 flex items-center justify-around">
                                             <Link to="/friends" style={{ textDecoration: "none" }} className="flex flex-col items-center justify-around">
                                                  <div className='text-xl md:text-2xl font-semibold font-mono'>Friends</div>
                                                  <div className='my-1 text-xl md:text-2xl font-semibold font-mono'>{info?.friendCount}</div>
                                             </Link>
                                             <li className="flex flex-col items-center justify-between">
                                                  <div className='text-xl md:text-2xl font-semibold font-mono'>Posts</div>
                                                  <div className='my-1 text-xl md:text-2xl font-semibold font-mono'>{info?.postCount}</div>
                                             </li>
                                        </ul>
                                        :
                                        <ul className="text-gray-700 flex items-center justify-around">
                                             <div className="flex flex-col items-center justify-around">
                                                  <div className='text-xl md:text-2xl font-semibold font-mono'>Friends</div>
                                                  <div className='bg-slate-400 rounded-xl animate-pulse w-20 h-3 my-3'></div>
                                             </div>
                                             <li className="flex flex-col items-center justify-between">
                                                  <div className='text-xl md:text-2xl font-semibold font-mono'>Post</div>
                                                  <div className='bg-slate-400 rounded-xl animate-pulse w-20 h-3 my-3'></div>
                                             </li>
                                        </ul>
                                   }
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
                                   return <><Post userPhoto={userPhoto} /> <div className='hidden ml-2 md:block h-fit'><UserProfile userProfile={UserData?.userProfile2} userName={UserData.userProfile1?.userName} joinedOn={UserData.userProfile1?.createdAt} /></div></>;
                              } else if (ListDisplay === 1) {
                                   return null;
                              } else if (ListDisplay === 2) {
                                   return <div className='md:hidden'><UserProfile userProfile={UserData?.userProfile2} /></div>;
                              }
                         })()}
                    </div>
               </div>
          </>
     )
}
export default UserProfileLayout
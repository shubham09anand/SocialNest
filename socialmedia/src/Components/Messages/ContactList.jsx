import React, { useState, useEffect } from 'react'
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { setMessagingData } from "../../Features/Counter/counterSlice";
import { Link } from "react-router-dom";

import FriendProfileLoadingAnimation from "../Animation/FriendProfileLoadingAnimation";
import noProfilePicture from '../../Assets/NoProileImage.png';

const ContactList = ({ toggleDisplay }) => {

     function getChatLink(loggedUser, personId) {
          const user1IdString = loggedUser.toString();
          const user2IdString = personId.toString();
          const sortedUserIds = [user1IdString, user2IdString].sort().join('');
          const convoId = sortedUserIds;
          return `/message/${convoId}`;
     }

     const dispatch = useDispatch()
     const loggedUser = useSelector((state) => state.LoginSlice.loggedUserId);

     const [chatList, setchatList] = useState("");
     const [isLaoding, setIsLaoding] = useState(true)

     const getChatList = () => {
          axios.post("http://127.0.0.1:8080/auth/contactList")
               .then((res) => {
                    setTimeout(() => {
                         setchatList(res.data);
                         setIsLaoding(false)
                    }, 1);
               })
               .catch((error) => {
                    console.log(error);
               });
     };

     useEffect(() => {
          getChatList();
     }, []);

     const handleItemClick = (senderId, receiverId, reciverPhoto) => {
          localStorage.setItem('receiverId', receiverId); 
          dispatch(setMessagingData({ senderId: senderId, receiverId: receiverId, reciverPhoto: reciverPhoto }))
          toggleDisplay(false);
     };
     return (
          <div className='select-none w-screen pr-2 border-r example relative'>
               <div className="h-screen overflow-y-scroll example relative mt-26">
                    <div id="side-chat" className="top-0 left-0  bg- z-50">
                         <div className="z-50 w-full">
                              <div className="flex pl-2 pb-2">
                                   <div className="text-3xl font-bold text-black text-left pt-2">Chats</div>
                              </div>
                         </div>
                         {isLaoding ?
                              (
                                   <>
                                        {[...Array(9)].map((_, index) => (
                                             <div key={index}>
                                                  <FriendProfileLoadingAnimation />
                                             </div>
                                        ))}
                                   </>
                              ) : (
                                   <div className="space-y-2 p-2 overflow-y-auto">
                                        {chatList.chatList?.filter(person => person._id !== loggedUser).map((person, index) => (
                                             <Link to={getChatLink(loggedUser, person._id)} style={{ textDecoration: 'none' }} key={index} onClick={() => handleItemClick(loggedUser, person._id, person.secondPerson[0]?.profilePhoto)} className="border-b cursor-pointer relative flex items-center gap-4 p-2 duration-200 active:opacity-60">
                                                  <div className="relative w-14 h-14 shrink-0">
                                                       {person.secondPerson[0]?.profilePhoto ?
                                                            <img src={person.secondPerson[0]?.profilePhoto} alt="" className="  object-cover w-full h-full rounded-full" /> : <img src={noProfilePicture} alt="" className="object-cover w-full h-full rounded-full" />
                                                       }
                                                  </div>
                                                  <div className="flex-1 min-w-0">
                                                       <div className="flex items-center gap-2 mb-1.5">
                                                            <div className="mr-auto text-sm text-black dark:text-white font-medium">{person?.firstName} {person?.lastName}</div>
                                                       </div>
                                                       <div className="font-medium overflow-hidden text-ellipsis text-sm whitespace-nowrap">{person?.userName}</div>
                                                  </div>
                                             </Link>
                                        ))}

                                   </div>
                              )
                         }
                    </div>
                    <div id="side-chat" className="bg-slate-100/40 backdrop-blur w-full h-full dark:bg-slate-800/40 z-40 fixed inset-0 max-md:-translate-x-full md:hidden" uk-toggle="target: #side-chat ; cls: max-md:-translate-x-full"></div>
                    <div className='text-xs text-center text-gray-500 font-thin'>List Ends Here</div>
               </div>
          </div>
     )
}

export default ContactList;
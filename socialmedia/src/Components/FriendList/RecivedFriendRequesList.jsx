import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import noProfilePicture from '../../Assets/NoProileImage.png';
import FriendProfileLoadingAnimation from "../Animation/FriendProfileLoadingAnimation";

const RecivedFriendRequesList = () => {
  const [RecivedRequest, setRecivedRequest] = useState();
  const [action, setAction] = useState(true);

  const userId = useSelector((state) => (state.LoginSlice.loggedUserId))
  // console.log(userId)

  useEffect(() => {
    const recivedRequest = async () => {
      try {
        const response = await axios.post("http://127.0.0.1:8080/auth/recivedFriendRequest", { userId: userId });
        setRecivedRequest(response.data);
        setAction(false);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    recivedRequest();
  }, [userId]);

  const updateFriendStatus = async (action, senderId) => {
    try {
      await axios.post("http://127.0.0.1:8080/auth/processFriendRequest", {
        senderId: senderId,
        reciverId: userId,
        action: action,
      });

      //update friend list
      setRecivedRequest((prevFriendList) => {
        const updatedFriendList = { ...prevFriendList };
        updatedFriendList.FriendRequestList = updatedFriendList.FriendRequestList.filter((friend) => friend.senderProfile[0]?._id !== senderId);
        return updatedFriendList;
      });
    } catch (error) {
      console.error("Error updating friend status", error);
    }
  };

  return (
    <>
      <div className="text-3xl font-semibold border-b mt-6 flex place-content-center items-center space-x-5 pb-2">
        <div>Received Request</div>
        <div className="rotate-180">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
            <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
          </svg>
        </div>
      </div>
      {action ? (
        <>
          <FriendProfileLoadingAnimation />
          <FriendProfileLoadingAnimation />
          <FriendProfileLoadingAnimation />
          <FriendProfileLoadingAnimation />
        </>
      ) : RecivedRequest.FriendRequestList.length !== 0 ? (
        <div className="w-full">
          <ul className="w-full divide-y divide-gray-200 dark:divide-gray-700">
            {RecivedRequest.FriendRequestList.map((friend, index) => (
              <li key={friend._id} className="lg:px-40 py-3 pb-0 flex flex-col sm:flex-row space-y-4 md:space-y-0 justify-between place-content-center items-center">
                <Link to={`/searched-person/${friend.senderProfile[0]?._id}`} style={{ textDecoration: "none" }} className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div className="flex-shrink-0">

                    {friend?.senderPhoto[index]?.profilePhoto ?
                      <img className="w-16 h-16 rounded-full object-cover" src={friend?.senderPhoto[index]?.profilePhoto} alt="Profile avatar" />
                      :
                      <img className="w-16 h-16 rounded-full object-cover" src={noProfilePicture} alt="Profile avatar" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">{friend?.senderProfile[0]?.firstName} {friend?.senderProfile[0]?.lastName}</p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">{friend?.senderProfile[0]?.userName}</p>
                  </div>
                </Link>
                <div className="flex space-x-5">
                  <div onClick={() => updateFriendStatus("Accepted", friend?.senderProfile[0]?._id)} className="bg-blue-600 text-white cursor-pointer select-none active:opacity-75 rounded-md px-4 py-1 w-fit h-fit">Accept</div>
                  <div onClick={() => updateFriendStatus("Rejected", friend?.senderProfile[0]?._id)} className="bg-red-600 text-white cursor-pointer select-none active:opacity-75 rounded-md px-4 py-1 w-fit h-fit">Reject</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="text-grey-700 mt-2 text-center">No Friend Request. Well Seems like No One likes You !!!</div>
      )}
    </>
  );
};

export default RecivedFriendRequesList;
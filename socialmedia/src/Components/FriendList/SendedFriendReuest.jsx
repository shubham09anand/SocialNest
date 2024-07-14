import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import FriendProfileLoadingAnimation from "../Animation/FriendProfileLoadingAnimation";

import noProfilePicture from '../../Assets/NoProileImage.png';
import avatar5 from '../../Assets/images/avatars/avatar-5.jpg';

const SendedFriendReuest = () => {
  const [sendedRequest, setSendedRequest] = useState([]);
  const [action, setAction] = useState(true);

  const userId = useSelector((state) => state.LoginSlice.loggedUserId);
  // console.log(userId);

  useEffect(() => {
    const fetchSendedRequest = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:8080/auth/sendedRequest', { userId: userId });
        setSendedRequest(response.data);
        setAction(false);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchSendedRequest();
  }, [userId]);

  const handleCancle = async (reciverId) => {
    try {
      const response = await axios.post('http://127.0.0.1:8080/auth/deleteSendedRequest', { senderId: userId, reciverId: reciverId });
      // console.log(response.status)
      setSendedRequest((prevFriendList) => {
        const updatedFriendList = { ...prevFriendList };
        updatedFriendList.FriendRequestList = updatedFriendList.FriendRequestList.filter((friend) => friend.reciverId !== reciverId);
        return updatedFriendList;
      });
    }
    catch (error) {
      console.error('Error:', error);
    }
  }

  // console.log(sendedRequest)

  return (
    <div>
      <div className="w-full text-3xl font-semibold border-b mt-6 flex place-content-center items-center space-x-5 pb-2">
        <div>Sent Request</div>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
            <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
          </svg>
        </div>
      </div>
      <div className="w-full px-2">
        {action ? (
          <>
            <FriendProfileLoadingAnimation />
            <FriendProfileLoadingAnimation />
            <FriendProfileLoadingAnimation />
            <FriendProfileLoadingAnimation />
          </>
        ) : sendedRequest?.FriendRequestList.length !== 0 ? (
          <ul className="w-full divide-y divide-gray-200 dark:divide-gray-700">
            {sendedRequest?.FriendRequestList.map((request, index) => (
              <li key={request?._id} className="lg:px-40 py-3 pb-0 flex flex-col sm:flex-row space-y-4 md:space-y-0 justify-between place-content-center items-center">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div className="flex-shrink-0">
                    {request?.senderPhoto.length > 0 ? 
                      <img className="w-16 h-16 rounded-full" src={request.senderPhoto[0].profilePhoto} alt="Profile avatar" />
                      : 
                      <img className="w-16 h-16 rounded-full" src={noProfilePicture} alt="Profile avatar" />
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      {request?.reciverProfile[0]?.firstName} {request.reciverProfile[0]?.lastName}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">{request?.reciverProfile[0]?.userName}</p>
                  </div>
                </div>
                <div className="flex space-x-5">
                  <div onClick={() => handleCancle(request.reciverProfile[0]._id)} className="bg-red-600 text-white cursor-pointer select-none active:opacity-75 rounded-md px-4 py-1 w-fit h-fit">
                    Cancel
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-6 text-center">No requests Sent. Don't Be Intovert, Send Request !!!</div>
        )}
      </div>
    </div>
  );
};

export default SendedFriendReuest;

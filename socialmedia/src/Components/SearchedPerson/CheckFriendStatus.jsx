import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CheckFriendStatus = ({ searchedUserId }) => {
  const [friedndstatus, setFriedndStatus] = useState(false);
  const [friedndRequeststatus, setFriedndRequeststatus] = useState(false);
  
  const logedInPersonId = useSelector((state) => state.LoginSlice.loggedUserId);
  // console.log(logedInPersonId);

  const sendFreindRequest = async () => {
    try {
      await axios.post("http://127.0.0.1:8080/auth/sendFriendRequest", { senderId: logedInPersonId, reciverId: searchedUserId });
      window.location.reload();
      toast.success("Friend Request Send");
    } catch (error) {
      toast.warning("Something Went Wrong !!!");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://127.0.0.1:8080/auth/checkFreiendshipStatus", { person_1: logedInPersonId, person_2: searchedUserId });
        setFriedndStatus(response.data.status);

        // If friendship exists, no need to check friend request status
        if (!response.data.status) {
          const requestStatusResponse = await axios.post("http://127.0.0.1:8080/auth/checkFriendRequestStatus", { person_1: logedInPersonId, person_2: searchedUserId });
          setFriedndRequeststatus(requestStatusResponse.data.status);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [logedInPersonId, searchedUserId]);

  return (
    <div className='mx-auto w-full'>
      <ToastContainer style={{ zIndex: "200" }} />
      {friedndstatus ? (
        <div className="w-fit mx-auto text-white bg-blue-700 select-none focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
          Friends
        </div>
      ) : friedndRequeststatus ? (
        <div className="w-fit mx-auto cursor-pointer focus:outline-none text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
          Friend Request Pending
        </div>
      ) : (
        <div
          onClick={sendFreindRequest}
          className="select-none cursor-pointer w-fit mx-auto text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        >
          Send Friend Request
        </div>
      )}
    </div>
  );
};

export default CheckFriendStatus;

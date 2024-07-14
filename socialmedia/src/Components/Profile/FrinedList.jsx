import React, { useState, useEffect } from "react";
import axios from "axios";
import AcceptedFriendList from "../FriendList/AcceptedFriendList";
import RecivedFriendRequesList from "../FriendList/RecivedFriendRequesList";
import SendedFriendReuest from "../FriendList/SendedFriendReuest";


const FrinedList = () => {
  const reciverId = "65a7cd740c7f7fb8b66ec535";
  const [FriendList, setFriendList] = useState();
  const [SelectFiled, setSelectFiled] = useState("Friends With");


  useEffect(() => {
    axios
      .post("http://127.0.0.1:8080/auth/recivedFriednRequestList", {
        reciverId: reciverId,
      })
      .then((res) => {
        setFriendList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  return (
    <div className="w-screen xl:w-[80%] 2xl:w-[83%] xl:p-5 xl:absolute right-0 -z-10">
      <div className=" mt-2 mx-auto lg:ml-0">
        <div className=" mx-auto w-fit dropdown show ">
          <div
            className="btn btn-primary w-60 dropdown-toggle"
            role="button"
            id="dropdownMenuLink"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {SelectFiled}
          </div>

          <div
            className="dropdown-menu"
            aria-labelledby="dropdownMenuLink"
          >
            <div
              onClick={() => {
                setSelectFiled("Friends With");
              }}
              className="dropdown-item cursor-pointer  w-60"
            >
              Friends With
            </div>
            <div
              onClick={() => {
                setSelectFiled("Recived Request");
              }}
              className="dropdown-item cursor-pointer  w-60"
            >
              Recived Request
            </div>
            <div
              onClick={() => {
                setSelectFiled("Sended Request");
              }}
              className="dropdown-item cursor-pointer  w-60"
            >
              Sended Request
            </div>
          </div>
        </div>
      </div>

      {SelectFiled === "Friends With" && (
        <AcceptedFriendList />
      )}

      {SelectFiled === "Recived Request" && (
        <RecivedFriendRequesList />
      )}

      {SelectFiled === "Sended Request" && (
        <SendedFriendReuest />
      )}
    </div>
  );
};

export default FrinedList;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";

import noProfilePicture from '../Assets/NoProileImage.png';
import HeaderAnimation from "./Animation/HeaderAnimation";
import socialNest from '../Assets/images/socialNest.png';



const Header = ({ dashboardDisplay, userPhoto }) => {

    const [display, setDisplay] = useState(true);
    const [isHeaderLoading, seIsHeaderLoading] = useState(true);

    const logedin_user_Id = useSelector((state) => (state.LoginSlice.loggedUserId));

    const [userInput, setuserInput] = useState("");
    const [users, setusers] = useState({ filterData: [] });
    const [isInputFocused, setIsInputFocused] = useState(false);

    useEffect(() => {
        if (userInput !== "") {
            axios.post("http://127.0.0.1:8080/auth/filterUser", { userInput: userInput })
                .then((res) => {
                    // console.log(res.status);
                    setusers(res.data);
                })
                .catch((error) => {
                    console.log("Error:", error);
                });
        }
    }, [userInput]);

    const handleDashboardDisplay = () => {
        console.log("hi")
        if (display === false) {
            dashboardDisplay(true)
        } else {
            dashboardDisplay(true)
        }
    }

    useEffect(() => {
        setTimeout(() => {
            seIsHeaderLoading(false)
        }, 1000)
    }, [seIsHeaderLoading])

    return (
        <>
            {isHeaderLoading ? <HeaderAnimation /> : <header className="fixed top-0 w-screen bg-white z-40 ">
                <div className="flex justify-between place-content-center items-center py-2 w-full xl:px-6 lg:gap-5 space-x-3 px-2">
                    <div className="w-fit">
                        <div className="flex items-center gap-1">
                            <button onClick={handleDashboardDisplay} className="flex items-center justify-center w-8 h-8 text-xl rounded-full hover:bg-gray-100 xl:hidden" aria-expanded="false">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="flex place-content-center items-center -translate-x-2 mt-1">
                        <img src={socialNest} draggable={false} className=" h-10 w-10 hidden lg:block" alt="" />
                        <div className="select-none text-base font-extrabold mt-3 hidden lg:block">Social<span className="text-[#6e8de0]">Nest</span></div>
                    </div>
                    <div className="w-full bg-[#f1f5f9] rounded-lg">
                        <div className="mx-auto w-full">
                            <div className="flex w-full relative space-x-3 pl-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="top-2.5 absolute w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>
                                <input
                                    onFocus={() => setIsInputFocused(true)}
                                    onBlur={() => setTimeout(() => { setIsInputFocused(false) }, 1000)}
                                    onChange={(e) => setuserInput(e.target.value)}
                                    value={userInput}
                                    type="text"
                                    placeholder="Search People"
                                    className="bg-[#f1f5f9] w-full pl-4 outline-none !font-normal h-12 !text-sm rounded-lg"
                                />
                            </div>
                            {isInputFocused && (
                                <nav className={`absolute w-screen scale-x-95 m top-14 left-0 text-sm font-medium text-black mt-2 rounded-md bg-gray-200`}>
                                    {users.filterData && users.filterData.length > 0 ? (
                                        users.filterData.filter(user => user._id !== logedin_user_Id).map((user) => (
                                            <Link to={`/searched-person/${user._id}`} key={user._id} style={{ textDecoration: "none" }} className="cursor-pointer hover:bg-white relative px-3 py-1.5 flex items-center gap-4 hover:bg-secondery dark:hover:bg-white/10">
                                                {user.searchedPersonProfile[0]?.profilePhoto ?
                                                    <img src={user.searchedPersonProfile[0]?.profilePhoto} className="w-9 h-9 rounded-full" alt={`Avatar of ${user.firstName} ${user.lastName}`} />
                                                    :
                                                    <img src={noProfilePicture} className="w-9 h-9 rounded-full" alt={`Avatar of ${user.firstName} ${user.lastName}`} />
                                                }
                                                <div>
                                                    <div className="font-semibold">{`${user.firstName} ${user.lastName}`}</div>
                                                    <div className="text-blue-500 text-xs">{`${user.userName}`}</div>
                                                </div>
                                            </Link>
                                        ))
                                    ) : (
                                        <div className="text-center py-2 text-gray-500 dark:text-gray-300">No data available</div>
                                    )}
                                </nav>)}
                        </div>
                    </div>
                    {!isInputFocused && (
                        <>
                            <Link to='/create-post'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7 cursor-pointer active:opacity-80">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                </svg>
                            </Link>
                            <Link to='/create-story' className="border-dashed border-2 border-black rounded-full w-fit h-fit active:opacity-60 cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 p-1 hover:border-white">

                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                            </Link>
                        </>
                    )
                    }
                    <Link to={`/searched-person/${logedin_user_Id}`} className="rounded-full relative bg-secondery cursor-pointer shrink-0" tabIndex="0" aria-haspopup="true" aria-expanded="false">
                        {userPhoto?.user.profilePhoto ? <img src={userPhoto?.user.profilePhoto} alt="" className="sm:w-10 sm:h-10 w-10 h-10 object-cover rounded-full shadow shrink-0" />
                            : <img src={noProfilePicture} alt="" className="sm:w-10 sm:h-10 w-10 h-10 object-cover rounded-full shadow shrink-0" />
                        }
                    </Link>
                </div>
            </header>}
        </>

    );
}

export default Header;
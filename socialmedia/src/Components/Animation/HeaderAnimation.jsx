import React from "react";

import Logo_0 from "../../Assets/images/logo.png";
import noProfilePicture from '../../Assets/NoProileImage.png';

const HeaderAnimation = () => {

    return (
        <header className="fixed top-0 w-screen bg-white z-40 ">
            <div className="flex justify-between place-content-center items-center py-2 w-full xl:px-6 lg:gap-5 space-x-3 px-2">
                <div className="w-fit">
                    <div className="flex items-center gap-1">
                        <button className="flex items-center justify-center w-8 h-8 text-xl rounded-full hover:bg-gray-100 xl:hidden dark:hover:bg-slate-600" aria-expanded="false">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="flex space-x-2 place-content-center items-center">
                    <div className="w-10 h-10 cursor-pointer bg-gray-600 animate-pulse rounded-lg"></div>
                    <div className="flex flex-col space-y-3">
                        <div className="w-12 h-2 cursor-pointer bg-gray-400 animate-pulse rounded-lg"></div>
                        <div className="w-12 h-2 cursor-pointer bg-gray-500 animate-pulse rounded-lg"></div>
                    </div>
                </div>
                <div className="w-full bg-[#f1f5f9] rounded-lg">
                    <div className="mx-auto w-full">
                        <div className="flex w-full relative space-x-3 pl-2 animate-pulse bg-slate-300 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="top-2.5 absolute w-6 h-6 opacity-50">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                            <div
                                className=" w-full pl-4 outline-none !font-normal h-12 !text-sm rounded-lg animate-pulse"
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <div className="w-7 h-7 cursor-pointer bg-gray-400 animate-pulse rounded-lg"></div>
                </div>
                <div>
                    <div className="w-7 h-7 cursor-pointer bg-gray-400 animate-pulse rounded-lg"></div>
                </div>
                <div className="rounded-full relative bg-secondery cursor-pointer shrink-0" tabIndex="0" aria-haspopup="true" aria-expanded="false">
                    <img src={noProfilePicture} alt="" className="sm:w-10 sm:h-10 animate-pulse w-10 h-10 object-cover rounded-full shadow shrink-0" />
                </div>
            </div>
        </header>
    );
}

export default HeaderAnimation;
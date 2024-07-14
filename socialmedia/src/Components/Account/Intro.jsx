import React from "react";

import message from '../../Assets/images/icons/message.png';
import blog from '../../Assets/images/icons/blog.png';
import friends from '../../Assets/images/icons/group-2.png';
import post from '../../Assets/images/icons/post.png';
import story from '../../Assets/images/icons/story.jpg';
import news from '../../Assets/images/icons/news.png';
import aiImage from '../../Assets/images/icons/aiImage.jpeg';
import aiText from '../../Assets/images/icons/aitext.png';
import responsive from '../../Assets/images/icons/responsive.png';
import devploer from '../../Assets/images/icons/devploer.jpg';
import shubham from '../../Assets/images/icons/Me.jpg';
import utkrash from '../../Assets/images/icons/Fatty.jpg';
import saket from '../../Assets/images/icons/saket.jpg';
import socialNest from '../../Assets/images/socialNest.png';


const Intro = () => {

    return (
        <div id="carouselExampleControls" className="hidden lg:block carousel slide w-full" data-ride="carousel">

            <div className="carousel-inner rounded-xl">

            <div className="carousel-item active bg-white h-full">
                <div className="pt-32 space-y-4 mx-auto w-full text-center h-[550px] text-gray-900 inrto rounded-xl border border-gray-100 shadow">
                        <img src={socialNest} alt="" className="w-32 h-32 mx-auto border-4 border-black" />
                        <div className="text-6xl font-extrabold">Social<span className="text-[#6e8de0]">Nest</span></div>
                    </div>
                </div>

                <div className="carousel-item bg-white h-full">
                    <div className="pt-16 space-y-4 mx-auto w-full text-center h-[550px]  text-gray-900 bg-gradient-to-br from-gray-100 via-gray-300 to-gray-300 rounded-xl border border-gray-100 shadow">
                        <div className="flex justify-center items-baseline">
                            <span className="mr-2 text-5xl font-extrabold">Chat</span>
                        </div>
                        <img src={message} alt="" className="w-20 h-20 mx-auto border-4 border-black" />
                        <ul role="list" className="mt-96 pt-10 space-y-4 text-left ml-5 pr-5">
                            <li className="flex items-center space-x-3">
                                <svg className="flex-shrink-0 w-5 h-5 text-white bg-green-500 flex place-content-center items-center rounded-full p-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>Chat With Your <span className="font-extrabold font-signature1">Friends</span> and <span className="font-extrabold font-signature1">Family</span></span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <svg className="flex-shrink-0 w-5 h-5 text-white bg-green-500 flex place-content-center items-center rounded-full p-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>Chat With New people</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <svg className="flex-shrink-0 w-5 h-5 text-white bg-green-500 flex place-content-center items-center rounded-full p-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>Support Different type of Image Format <span className="font-extrabold font-signature1">(jpeg, jpg, svg , png , webp)</span></span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <svg className="flex-shrink-0 w-5 h-5 text-white bg-green-500 flex place-content-center items-center rounded-full p-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>Support Different type of Document Format <span className="font-extrabold font-signature1">(word, pdf, powepoint, html , css , javascript and many more)</span></span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="carousel-item bg-white h-full">
                    <div className="pt-16 space-y-4 mx-auto w-full text-center h-[550px]  text-gray-900 bg-gradient-to-br from-gray-100 via-gray-300 to-gray-300 rounded-xl border border-gray-100 shadow">
                        <div className="flex justify-center items-baseline">
                            <span className="mr-2 text-5xl font-extrabold">Schedule Message</span>
                        </div>
                        <div className='bg-gradient-to-r mt-4 to-blue-500 via-blue-600 from-blue-900 w-fit relative cursor-help mx-auto rounded-full p-2 scale-90' title='scheduled messages'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="white" className="w-20 h-20">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-clock-history w-6 h-6 absolute bottom-0 right-2 border-2 z-20 bg-white rounded-full" viewBox="0 0 16 16">
                                <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z" />
                                <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z" />
                                <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5" />
                            </svg>
                        </div>
                        <ul role="list" className="mt-96 pt-10 space-y-4 text-left ml-5 pr-5">
                            <li className="flex items-center space-x-3">
                                <svg className="flex-shrink-0 w-5 h-5 text-white bg-green-500 flex place-content-center items-center rounded-full p-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span><span className="font-extrabold font-signature1 uppercase">Schedule A Message</span> For Future Referneces</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <svg className="flex-shrink-0 w-5 h-5 text-white bg-green-500 flex place-content-center items-center rounded-full p-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>Now Send <span className="font-extrabold font-signature1 uppercase">Birthday Wishes And Other <span className="font-extrabold font-signature1 uppercase">Timing Related Message</span></span> With More Accuracy</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <svg className="flex-shrink-0 w-5 h-5 text-white bg-green-500 flex place-content-center items-center rounded-full p-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>You Have To Just Give The Time And Date And Message. When The Time Arrived The Message Will Be Send.</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="carousel-item bg-white h-full">
                    <div className="pt-16 space-y-4 mx-auto w-full text-center h-[550px]  text-gray-900 bg-gradient-to-br from-gray-100 via-gray-300 to-gray-300 rounded-xl border border-gray-100 shadow">
                        <div className="flex justify-center items-baseline">
                            <span className="mr-2 text-5xl font-extrabold">Text-to-Image</span>
                        </div>
                        <img src={aiImage} alt="" className="w-20 h-20 mx-auto border-4 border-black rounded-full bg-white shadow-2xl object-fill" />
                        <ul role="list" className="mt-96 pt-20 space-y-4 text-left ml-5 pr-5">
                            <li className="flex items-center space-x-3">
                                <svg className="flex-shrink-0 w-5 h-5 text-white bg-green-500 flex place-content-center items-center rounded-full p-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>Genrate <span className="font-extrabold font-signature1 uppercase">Photo</span> From Text And Send Them</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <svg className="flex-shrink-0 w-5 h-5 text-white bg-green-500 flex place-content-center items-center rounded-full p-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>No Need To Download <span className="font-extrabold font-signature1 uppercase">AI Genrated Picture</span> , Save Your <span className="font-extrabold font-signature1 uppercase">Device Storage</span></span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="carousel-item bg-white h-full">
                    <div className="pt-16 space-y-4 mx-auto w-full text-center h-[550px]  text-gray-900 bg-gradient-to-br from-gray-100 via-gray-300 to-gray-300 rounded-xl border border-gray-100 shadow">
                        <div className="flex justify-center items-baseline">
                            <span className="mr-2 text-5xl font-extrabold">Text-to-Text</span>
                        </div>
                        <img src={aiText} alt="" className="w-20 h-20 mx-auto border-4 border-black rounded-full bg-white shadow-2xl object-fill" />
                        <ul role="list" className="mt-96 pt-20 space-y-4 text-left ml-5 pr-5">
                            <li className="flex items-center space-x-3">
                                <svg className="flex-shrink-0 w-5 h-5 text-white bg-green-500 flex place-content-center items-center rounded-full p-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>Don't Know What to Message <span className="font-extrabold font-signature1 uppercase">Ask AI</span> For Help</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <svg className="flex-shrink-0 w-5 h-5 text-white bg-green-500 flex place-content-center items-center rounded-full p-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>Genrate <span className="font-extrabold font-signature"> Custom Message </span> With <span className="font-extrabold font-signature">AI</span></span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="carousel-item bg-white h-full">
                    <div className="pt-16 space-y-4 mx-auto w-full text-center h-[550px]  text-gray-900 bg-gradient-to-br from-gray-100 via-gray-300 to-gray-300 rounded-xl border border-gray-100 shadow">
                        <div className="flex justify-center items-baseline">
                            <span className="mr-2 text-5xl font-extrabold">Make Friends</span>
                        </div>
                        <img src={friends} alt="" className="w-20 h-20 mx-auto border-4 border-black bg-white shadow-2xl" />
                        <ul role="list" className="mt-96 pt-20 space-y-4 text-left ml-5 pr-5">
                            <li className="flex items-center space-x-3">
                                <svg className="flex-shrink-0 w-5 h-5 text-white bg-green-500 flex place-content-center items-center rounded-full p-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>Make New <span className="font-extrabold font-signature1 uppercase">Friends</span></span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <svg className="flex-shrink-0 w-5 h-5 text-white bg-green-500 flex place-content-center items-center rounded-full p-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>Stay in Touch With Your Friends</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="carousel-item bg-white h-full">
                    <div className="pt-16 space-y-4 mx-auto w-full text-center h-[550px]  text-gray-900 bg-gradient-to-br from-gray-100 via-gray-300 to-gray-300 rounded-xl border border-gray-100 shadow">
                        <div className="flex justify-center items-baseline">
                            <span className="mr-2 text-3xl font-extrabold">Create Your Blog And Read Other Blogs</span>
                        </div>
                        <img src={blog} alt="" className="w-20 h-20 mx-auto border-4 border-black rounded-full bg-white shadow-2xl" />
                        <ul role="list" className="mt-96 pt-20 space-y-4 text-left ml-5 pr-5">
                            <li className="flex items-center space-x-3">
                                <svg className="flex-shrink-0 w-5 h-5 text-white bg-green-500 flex place-content-center items-center rounded-full p-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>Create <span className="font-extrabold font-signature1 uppercase">Blog/Articles</span></span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <svg className="flex-shrink-0 w-5 h-5 text-white bg-green-500 flex place-content-center items-center rounded-full p-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>Share Your <span className="font-extrabold font-signature1 uppercase"><span className="font-extrabold font-signature1 uppercase">Views, Experinces</span> With Others</span></span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <svg className="flex-shrink-0 w-5 h-5 text-white bg-green-500 flex place-content-center items-center rounded-full p-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>Read Other People Blogs</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="carousel-item bg-white h-full">
                    <div className="pt-16 space-y-4 mx-auto w-full text-center h-[550px]  text-gray-900 bg-gradient-to-br from-gray-100 via-gray-300 to-gray-300 rounded-xl border border-gray-100 shadow">
                        <div className="flex justify-center items-baseline">
                            <span className="mr-2 text-5xl font-extrabold">Create Your Post</span>
                        </div>
                        <img src={post} alt="" className="w-20 h-20 mx-auto border-4 border-black rounded-full bg-white shadow-2xl object-fill" />
                        <ul role="list" className="mt-96 pt-20 space-y-4 text-left ml-5 pr-5">
                            <li className="flex items-center space-x-3">
                                <svg className="flex-shrink-0 w-5 h-5 text-white bg-green-500 flex place-content-center items-center rounded-full p-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>Share Highlits of Your <span className="font-extrabold font-signature1 uppercase">Life , Experinces , Achivements And Other Milestones</span></span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="carousel-item bg-white h-full">
                    <div className="pt-16 space-y-4 mx-auto w-full text-center h-[550px]  text-gray-900 bg-gradient-to-br from-gray-100 via-gray-300 to-gray-300 rounded-xl border border-gray-100 shadow">
                        <div className="flex justify-center items-baseline">
                            <span className="mr-2 text-5xl font-extrabold">Create Your Story</span>
                        </div>
                        <img src={story} alt="" className="w-20 h-20 mx-auto border-4 border-black rounded-full bg-white shadow-2xl object-fill" />
                        <ul role="list" className="mt-96 pt-20 space-y-4 text-left ml-5 pr-5">
                            <li className="flex items-center space-x-3">
                                <svg className="flex-shrink-0 w-5 h-5 text-white bg-green-500 flex place-content-center items-center rounded-full p-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>Share Highlits of <span className="font-extrabold font-signature1 uppercase">Day</span> as <span className="font-extrabold font-signature1 uppercase">Story</span></span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <svg className="flex-shrink-0 w-5 h-5 text-white bg-green-500 flex place-content-center items-center rounded-full p-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>Set Duration For How Long You Want to Keep Your Story <span className="font-extrabold font-signature1 uppercase">(24 hrs , 12 hrs , 6 hrs , 3 hrs)</span></span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="carousel-item bg-white h-full">
                    <div className="pt-16 space-y-4 mx-auto w-full text-center h-[550px]  text-gray-900 bg-gradient-to-br from-gray-100 via-gray-300 to-gray-300 rounded-xl border border-gray-100 shadow">
                        <div className="flex justify-center items-baseline">
                            <span className="mr-2 text-5xl font-extrabold">Read News</span>
                        </div>
                        <img src={news} alt="" className="w-20 h-20 mx-auto border-4 border-black rounded-full bg-white shadow-2xl object-fill" />
                        <ul role="list" className="mt-96 pt-20 space-y-4 text-left ml-5 pr-5">
                            <li className="flex items-center space-x-3">
                                <svg className="flex-shrink-0 w-5 h-5 text-white bg-green-500 flex place-content-center items-center rounded-full p-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>Read <span className="font-extrabold font-signature1 uppercase">News</span> On Different Topics</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="carousel-item bg-white h-full">
                    <div className="pt-16 space-y-4 mx-auto w-full text-center h-[550px]  text-gray-900 bg-gradient-to-br from-gray-100 via-gray-300 to-gray-300 rounded-xl border border-gray-100 shadow">
                        <div className="flex justify-center items-baseline">
                            <span className="mr-2 text-5xl font-extrabold">User Friendly UI</span>
                        </div>
                        <img src={responsive} alt="" className="w-20 h-20 mx-auto border-4 border-black rounded-full bg-white shadow-2xl object-fill" />
                        <ul role="list" className="mt-96 pt-20 space-y-4 text-left ml-5 pr-5">
                            <li className="flex items-center space-x-3">
                                <svg className="flex-shrink-0 w-5 h-5 text-white bg-green-500 flex place-content-center items-center rounded-full p-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span> <span className="font-extrabold font-signature1 uppercase">Responsive</span> And <span className="font-extrabold font-signature1 uppercase">Compatible</span> Accross All Device</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <svg className="flex-shrink-0 w-5 h-5 text-white bg-green-500 flex place-content-center items-center rounded-full p-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>Easy To <span className="font-extrabold font-signature1 uppercase">Navigate </span> And <span className="font-extrabold font-signature1 uppercase">Access Differnet Features</span></span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="carousel-item bg-white h-full">
                    <div className="pt-16 space-y-4 mx-auto w-full text-center h-[550px]  text-gray-900 bg-gradient-to-br from-gray-100 via-gray-300 to-gray-300 rounded-xl border border-gray-100 shadow">
                        <div className="flex justify-center items-baseline">
                            <span className="mr-2 text-5xl font-extrabold">Devploers</span>
                        </div>
                        <img src={devploer} alt="" className="w-20 h-20 mx-auto border-4 border-black rounded-full bg-white shadow-2xl object-fill" />
                        <ul role="list" className="mt-96 pt- space-y-4 text-left ml-5 pr-5">
                            <li class="bg-gray-200 introAnimation mx-auto max-w-sm shadow-lg rounded-lg overflow-hidden py-2">
                                <div class="sm:flex sm:items-center px-4">
                                    <img class="block h-16 sm:h-16 w-16 rounded-full object-contain mx-auto sm:mb-0 sm:mr-4 sm:ml-0" src={shubham} alt="" />
                                    <div class="text-center sm:text-left sm:flex-grow">
                                        <div class="">
                                            <p class="text-base font-extrabold leading-tight">Shubham Anand</p>
                                        </div>
                                        
                                        <div className="flex mx-auto gap-3 w-fit mt-2">

                                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-envelope-fill w-5 h-5 cursor-pointer" viewBox="0 0 16 16">
                                                <title>shubham09anand@gmail.com</title>
                                                <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                                            </svg>

                                            <svg fill="currentColor" className="w-5 h-5 cursor-pointer" viewBox="0 0 24 24" role="img">
                                                <title>shubham09anand</title>
                                                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path>
                                            </svg>

                                            <svg fill="currentColor" role="img" className="w-5 h-5 cursor-pointer" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <title>shubham09anand</title>
                                                <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"></path>
                                            </svg>

                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li class="bg-gray-200 introAnimation mx-auto max-w-sm shadow-lg rounded-lg overflow-hidden py-2">
                                <div class="sm:flex sm:items-center px-4">
                                    <img class="block h-16 sm:h-16 rounded-full mx-auto sm:mb-0 sm:mr-4 sm:ml-0" src={utkrash} alt="" />
                                    <div class="text-center sm:text-left sm:flex-grow">
                                        <div class="">
                                            <p class="text-base font-extrabold leading-tight">Utkrash Thakur</p>
                                        </div>
                                        <div className="flex mx-auto gap-3 w-fit mt-2">

                                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-envelope-fill w-5 h-5 cursor-pointer" viewBox="0 0 16 16">
                                                <title>shubham09anand@gmail.com</title>
                                                <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                                            </svg>

                                            <svg fill="currentColor" className="w-5 h-5 cursor-pointer" viewBox="0 0 24 24" role="img">
                                                <title>shubham09anand</title>
                                                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path>
                                            </svg>

                                            <svg fill="currentColor" role="img" className="w-5 h-5 cursor-pointer" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <title>shubham09anand</title>
                                                <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"></path>
                                            </svg>

                                        </div>

                                    </div>
                                </div>
                            </li>
                            <li class="bg-gray-200 introAnimation mx-auto max-w-sm shadow-lg rounded-lg overflow-hidden py-2">
                                <div class="sm:flex sm:items-center px-4">
                                    <img class="block h-16 w-16 object-contain sm:h-16 rounded-full mx-auto sm:mb-0 sm:mr-4 sm:ml-0" src={saket} alt="" />
                                    <div class="text-center sm:text-left sm:flex-grow">
                                        <div class="">
                                            <p class="text-base font-extrabold leading-tight">Saket Yadav</p>

                                            <div className="flex mx-auto gap-3 w-fit mt-2">

                                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-envelope-fill w-5 h-5 cursor-pointer" viewBox="0 0 16 16">
                                                    <title>shubham09anand@gmail.com</title>
                                                    <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                                                </svg>

                                                <svg fill="currentColor" className="w-5 h-5 cursor-pointer" viewBox="0 0 24 24" role="img">
                                                    <title>shubham09anand</title>
                                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path>
                                                </svg>

                                                <svg fill="currentColor" role="img" className="w-5 h-5 cursor-pointer" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <title>shubham09anand</title>
                                                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"></path>
                                                </svg>

                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
            <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a onClick={() => console.log("Clicked!")} id="next-Button" className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </a>
        </div>
    )
}

export default Intro;
import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

const UserProfile = ({ userProfile, userName, joinedOn }) => {
     return (
          <div className="w-full md:w-72 lg:w-96 border-b m-1 space-y-10 bg-white">
               {/* user info */}
               <div className="box py-2 px-3">
                    <div className="flex items-ce justify-between text-black dark:text-white">
                         <h3 className="font-semibold text-3xl mb-4"> Intro </h3>
                    </div>
                    <ul className="text-gray-700 space-y-4 text-sm dark:text-white/80">
                         {userName && (
                              <li className="flex items-center gap-3">
                                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
                                   </svg>
                                   <div>
                                        User Name{" "} <span className="font-semibold text-black dark:text-white">{userName}</span>
                                   </div>
                              </li>
                         )}
                         {joinedOn && (
                              <li className="flex items-center gap-3">
                                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                                   </svg>
                                   <div>
                                        Joined On{" "} <span className="font-semibold text-black dark:text-white">{moment(joinedOn).format("MMMM DD, YYYY")}</span>
                                   </div>
                              </li>
                         )}

                         {userProfile === null ?
                              <div className="cursor-pointer w-full text-center h-fit px-4 py-2 bg-blue-600 text-white font-semibold active:opacity-75 rounded-md mx-auto">
                                   <Link style={{ textDecoration: "none", color: "white" }} to="/update-profile">Complete Your Profile</Link>
                              </div>
                              :
                              <>
                                   {userProfile &&
                                        (userProfile?.city ||
                                             userProfile?.state ||
                                             userProfile?.country) && (
                                             <li className="flex items-center gap-3 text-base">
                                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                       <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                                       <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                                  </svg>
                                                  <div>
                                                       Live In{" "} <span className="font-semibold text-black dark:text-white">{`${userProfile.city} ${userProfile.state} ${userProfile.country}`}</span>
                                                  </div>
                                             </li>
                                        )}

                                   {userProfile?.phoneNumber && (
                                        <li className="flex items-center gap-3 text-base">
                                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                             </svg>
                                             <div>
                                                  Phone Number{" "} <span className="font-semibold text-black dark:text-white">{userProfile.phoneNumber}</span>
                                             </div>
                                        </li>
                                   )}

                                   {userProfile?.dateOfBirth && (
                                        <li className="flex items-center gap-3 text-base">
                                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.38a48.474 48.474 0 00-6-.37c-2.032 0-4.034.125-6 .37m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.17c0 .62-.504 1.124-1.125 1.124H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12.265 3.11a.375.375 0 11-.53 0L12 2.845l.265.265zm-3 0a.375.375 0 11-.53 0L9 2.845l.265.265zm6 0a.375.375 0 11-.53 0L15 2.845l.265.265z" />
                                             </svg>
                                             <div>
                                                  Date of birth{" "} <span className="font-semibold text-black dark:text-white">{moment(userProfile.dateOfBirth).format("MMMM DD, YYYY")}</span>
                                             </div>
                                        </li>
                                   )}

                                   {userProfile?.studiedAt && (
                                        <li className="flex items-center gap-3 text-base">
                                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                                             </svg>
                                             <div>
                                                  Studied at{" "}<span className="font-semibold text-black dark:text-white">{userProfile.studiedAt}</span>
                                             </div>
                                        </li>
                                   )}

                                   {userProfile?.youAre && (
                                        <li className="flex items-center gap-3 text-base">
                                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                                             </svg>
                                             <div>
                                                  Currently{" "}<span className="font-semibold text-black dark:text-white">{userProfile.youAre}</span>
                                             </div>
                                        </li>
                                   )}

                                   <div className="cursor-pointer w-full text-center h-fit px-4 py-2 bg-blue-600 text-white font-semibold active:opacity-75 rounded-md mx-auto">
                                        <Link style={{ textDecoration: "none", color: "white" }} to="/update-profile">Edit Profile</Link>
                                   </div>
                              </>
                         }
                    </ul>
               </div>
          </div>
     );
};
export default UserProfile;
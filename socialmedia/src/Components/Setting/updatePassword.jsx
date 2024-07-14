import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdatePassword = () => {
     const [password, setPassword] = useState();
     const [confirmPassword, setConfirmPassword] = useState();

     // const userId = "65a7cd740c7f7fb8b66ec535";
     const userId = useSelector((state) => state.LoginSlice.loggedUserId);
     console.log(userId);

     const handleSubmit = () => {
          const trimmedPassword = password ? password.trim() : '';
          const trimmedConfirmPassword = confirmPassword ? confirmPassword.trim() : '';

          // console.log(trimmedConfirmPassword)
          // console.log(trimmedPassword)

          if (trimmedPassword && trimmedConfirmPassword) {
               if (trimmedPassword === trimmedConfirmPassword) {
                    if (trimmedPassword.length >= 8) {
                         axios.post('http://127.0.0.1:8080/auth/updatePassword', { userId: userId, newPassword: trimmedPassword })
                              .then((res) => {
                                   // console.log(res.status);
                                   toast.success("Password Updated Successfully");
                                   setPassword('');
                                   setConfirmPassword('');
                              })
                              .catch((error) => {
                                   console.log(error);
                                   toast.warning("Something went wrong");
                              });
                    } else {
                         toast.warning("Password should contain at least 8 characters");
                    }
               } else {
                    toast.warning("Password and Confirm Password should match");
               }
          } else {
               toast.warning("Fill Password and Confirm Password fields");
          }
     };


     return (
          <div>
               <ToastContainer />
               <section className="w-full xl:w-[80%] xl:p-2 xl:absolute right-0 -z-10">
                    <div className="flex flex-col items-center mt-10 px-6 py-8 mx-auto md:h-screen lg:py-0">
                         <div className="w-full p-6 bg-white rounded-lg md:shadow-inner dark:border md:mt-0 sm:max-w-md sm:p-8">
                              <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl dark:text-white">
                                   Change Password
                              </h2>
                              <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
                                   <div>
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                                        <input onChange={(e) => setPassword(e.target.value)} value={password} type="text" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                   </div>
                                   <div>
                                        <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                                        <input onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} type="text" name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                   </div>
                                   <button
                                        onClick={handleSubmit}
                                        type="button"
                                        className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold cursor-pointer rounded-lg text-sm px-5 py-2.5 text-center"
                                   >
                                        Reset password
                                   </button>
                              </form>
                         </div>
                    </div>
               </section>
          </div>
     );
};

export default UpdatePassword;

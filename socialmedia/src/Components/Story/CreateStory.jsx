import React, { useState } from 'react';
import addPattern from '../../Assets/images/ad_pattern.png';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';

const CreateStory = () => {
     const userId = useSelector((state) => (state.LoginSlice.loggedUserId));

     const postCreationTime = (new Date()).toISOString();

     const [fileUploaded, setFileUploaded] = useState([]);
     const [storyMessage, setStoryMessage] = useState("");
     const [selectedDuration, setSelectedDuration] = useState("24");

     let handleImageChange = (e) => {
          var files = e.target.files;
          var filesArray = [].slice.call(files);
          filesArray.forEach((file) => {
               if (!file.type.startsWith('image/')) {
                    toast.warning("Please select only image files.");
                    return;
               }
               let reader = new FileReader();
               reader.onloadend = () => {
                    let base64String = reader.result;
                    setFileUploaded((prevFiles) => [...prevFiles, base64String]);
               };
               reader.readAsDataURL(file);
          });
     };

     // const handleImageChange = (e) => {
     //      var files = e.target.files;
     //      var filesArray = [].slice.call(files);
     //      filesArray.forEach((e) => {
     //           let ImgURL = URL.createObjectURL(e);
     //           setFileUploaded((prevFiles) => [...prevFiles, ImgURL]);
     //      });
     // };

     const handleRemoveImages = () => {
          setFileUploaded([]);
     };

     const handlePost = () => {
          if (storyMessage !== "" || fileUploaded.length !== 0) {

               axios.post("http://127.0.0.1:8080/auth/createuserStory", { userId: userId, storyMessage: storyMessage, storyPhoto: fileUploaded, duration: selectedDuration, postCreationTime: postCreationTime })
                    .then((res) => {
                         console.log(res.status);
                         toast.success("Your story has been uploaded");
                         setFileUploaded([]);
                         setStoryMessage("");
                    })
                    .catch(() => {
                         toast.warning("Something went wrong!!! Please Try Again Later");
                    });
          } else {
               toast.warning("Either give a message or upload any photo");
          }
     };

     return (
          <div className=''>
               <ToastContainer />
               <div className="uk-modal-dialog tt relative overflow-hidden mx-auto bg-white p-7 shadow-xl rounded-lg md:w-[520px] w-full">
                    <div className='text-2xl tracking-wide font-semibold text-center'>Add Story</div>
                    <div className="space-y-5">
                         <div>
                              <input
                                   value={storyMessage}
                                   onChange={(e) => setStoryMessage(e.target.value)}
                                   placeholder='Story Message...'
                                   type="text"
                                   className="w-full mt-3 bg-gray-100 outline-none rounded-md py-1 pl-2 text-gray-500"
                              />
                         </div>
                         <label htmlFor="duration" className="block mb-2 text-sm text-gray-900 font-semibold">
                              How Long Do You Want To Keep It
                         </label>
                         <select
                              id="duration"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              value={selectedDuration}
                              onChange={(e) => setSelectedDuration(e.target.value)}
                         >
                              <option value="24">24 hrs (Standard)</option>
                              <option value="12">12 hrs</option>
                              <option value="6">6 hrs</option>
                              <option value="3">3 hrs</option>
                         </select>
                         <div style={{ backgroundImage: `url(${addPattern})` }} className='shadow-xl border rounded-md'>
                              <div className="w-full h-72 relative border1 rounded-lg overflow-hidden bg-[url('/images/ad_pattern.png')] bg-repeat">
                                   <label htmlFor="createStatusUrl" className="w-fit h-fit flex flex-col justify-center items-center absolute -translate-x-1/2 left-1/2 bottom-0 z-10 pb-6 pt-10 cursor-pointer bg-gradient-to-t">
                                        {fileUploaded.length === 0 ? <input onChange={(e) => handleImageChange(e)} multiple id="createStatusUrl" accept="image/*" type="file" className="hidden" /> : null}
                                        {fileUploaded.length === 0 ? <><ion-icon name="Userimage" className="text-3xl text-teal-600 md hydrated" role="img" aria-label="userimage"></ion-icon><span className="text-black mt-2 text-center">Browse to Upload image </span></> : <span onClick={() => { handleRemoveImages() }} className="text-white mt-2 w-fit h-fit">Reupload</span>}
                                   </label>
                                   <div className='flex w-full overflow-x-scroll h-full example'>
                                        {fileUploaded.length > 0 ? fileUploaded.map((photos, index) => <img id="createStatusImage" key={index} src={photos} alt="Uploaded Image" accept="image/png, image/jpeg" className="w-[200vw] mx-1 h-full object-cover" />) : null}
                                   </div>
                              </div>
                         </div>
                         <div className="flex justify-between items-center">
                              <button onClick={() => { handlePost() }} type="button" className="button mx-auto w-fit bg-blue-700 text-white px-8 rounded-md text-xl py-1">Add Story</button>
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default CreateStory;

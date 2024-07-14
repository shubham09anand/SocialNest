import React from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import noProfilePicture from '../../Assets/NoProileImage.png';

const ShowCommentsAndLike = ({ comments, likes, postId }) => {

     const likedBy = useSelector((state) => (state.LoginSlice.loggedUserId));
     // console.log(likedBy);

     const handleLike = (postId) => {
          axios.post("http://127.0.0.1:8080/auth/giveLike", { postId: postId, likedBy: likedBy }).then((res) => {
               console.log(res.status)
          }).catch((error) => {
               console.log(error)
          })
     }

     return (
          <>
               <div className="sm:p-2 flex items-center gap-4 text-xs font-semibold">
                    <div onClick={() => { handleLike(postId) }}>
                         <div className="flex items-center gap-2.5 active:opacity-50 select-none lg:hover:bg-slate-200 p-1 rounded-lg cursor-pointer">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="#ff4500" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-6 h-6">
                                   <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                              </svg>
                              <span>{likes.length}</span>
                         </div>
                    </div>
                    <div className="flex items-center gap-3 active:opacity-50 select-none lg:hover:bg-slate-200 p-1 rounded-lg cursor-pointer">
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                         </svg>
                         <span>{comments.length}</span>
                    </div>
               </div>
               <div className="example sm:p-4 p-2.5  border-gray-200 font-normal space-y-3 relative max-h-36 overflow-y-scroll">
                    {comments?.map((comment, index) => (
                         <div key={index} className="flex items-start gap-3 relative">
                              <div>
                                   {comments[index]?.commenterPhoto ? 
                                        <img src={comments[index]?.commenterPhoto?.profilePhoto} alt="" className="w-6 h-6 mt-1 rounded-full" />
                                        : 
                                        <img src={noProfilePicture} alt="" className="w-6 h-6 mt-1 rounded-full" />
                                   }

                              </div>
                              <div className="flex-1">
                                   <div className="text-black text-sm sm:text-base font-medium inline-block dark:text-white">
                                        {comments[index]?.commenterProfile?.firstName} {comments[index]?.commenterProfile?.lastName}
                                   </div>
                                   <p className="mt-0.5 text-sm sm:text-base max-h-20 overflow-y-scroll">{comment?.commentBody}</p>
                              </div>
                         </div>
                    ))}
                    {comments.length === 0 && (<div className='w-full text-center text-gray-600 text-sm'>No Comments Yet...</div>)}
               </div>
          </>
     )
}

export default React.memo(ShowCommentsAndLike)
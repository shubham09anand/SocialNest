import React , { useState  } from 'react'
import { useSelector } from 'react-redux';
import axios from "axios";

const MakeComment = ({postId ,userPhoto} ) => {

     const commenterId =  useSelector((state) => (state.LoginSlice.loggedUserId));

     const [Comment , setComment] = useState();

     const hanldeComments = (e , postId) =>{
               e.preventDefault();
               axios.post("http://127.0.0.1:8080/auth/makeComment", {postId: postId, commenterId:commenterId , commentBody:Comment}).then((res)=>{
               setComment("");
          }).catch((error)=>{
               console.log(error);
          })
     }

     // console.log(userPhoto)

  return (
     <>
          <form onSubmit={(e)=>hanldeComments(e , postId)} className="sm:px-4 sm:py-3 p-2.5 border-t border-gray-100 flex items-center gap-1 dark:border-slate-700/40">
               <img
                    src={userPhoto?.user.profilePhoto}
                    alt=""
                    className="w-9 h-9 rounded-full object-cover border-[.1px] border-gray-900 shadow-xl"
                    style={{border:"solid 1px"}}
               />
               <div className="flex-1 relative overflow-hidden h-10">
                    <textarea
                         required
                         value={Comment}
                         onChange={(e)=>{setComment(e.target.value)}}
                         placeholder="Add Comment...."
                         rows="1"
                         className="w-full resize-none  px-4 py-2 focus:!border-transparent focus:!ring-transparent bg-gray-50 rounded-2xl outline-none"

                    ></textarea>
               </div>

               <button
                    type="submit"
                    className="text-sm rounded-full py-1.5 px-3.5 bg-secondery active:opacity-70"
               >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-8 h-8">
                         <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>
               </button>
          </form>
     </>

  )
}

export default React.memo(MakeComment)
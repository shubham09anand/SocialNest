import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import LazyLoad from 'react-lazy-load';
import { Carousel } from "@material-tailwind/react";

import MakeComment from '../Post/MakeComment';
import ShowCommentsAndLike from '../Post/ShowCommentsAndLike';
import noProfilePicture from '../../Assets/NoProileImage.png';

const SearchedPersonPost = ({ searchedUserId }) => {
     const [postDetails, setPostDetails] = useState([]);
     const [error, setError] = useState(null);

     useEffect(() => {
          if (searchedUserId) {
               axios
                    .post('http://127.0.0.1:8080/auth/searchedPerosnPost', { userId: searchedUserId })
                    .then((res) => {
                         setPostDetails(res.data.Post || []);
                         setError(null);
                    })
                    .catch((error) => {
                         setError(error || 'An error occurred');
                    });
          }
     }, [searchedUserId]);

     return (
          <div className="w-full max-h-[200vh] overflow-y-scroll example lg:w-4/5 md:border-r">
               {postDetails?.length === 0 ? (
                    <div className="text-center mt-4 text-gray-500">
                         No posts available at the moment.
                    </div>
               ) : (
                    postDetails?.map((post, index) => (
                         <div key={index} className="w-full bg-white rounded-lg text-sm font-medium border-1 dark:bg-dark2 mx-auto shadow-lg">
                              <div className="flex gap-3 sm:p-4 p-2.5 text-sm font-medium">
                                   <div>
                                        {postDetails[0]?.postMaker.length ?
                                             <img src={postDetails[0]?.postMaker[0].profilePhoto} alt="" className="w-9 h-9 rounded-full object-cover" />
                                             :
                                             <img src={noProfilePicture} alt="" className="w-9 h-9 rounded-full object-cover" />
                                        }
                                   </div>
                                   <div className="flex-1">
                                        <div>
                                             <h4 className="text-black dark:text-white">
                                                  {post?.userSignupInfo[0]?.firstName}{' '}
                                                  {post?.userSignupInfo[0]?.lastName}
                                             </h4>
                                        </div>
                                        <div className="text-xs text-gray-500 dark:text-white/80">
                                             {moment(post?.postMaker?.createdAt).format('D MMMM YYYY')}{' '}
                                             , {moment(post?.postMaker?.createdAt).format('h:mm A')}
                                        </div>
                                   </div>
                              </div>

                              <div aria-expanded="false">
                                   {/* {post?.postPhoto[index]?.postPhoto.length !== 0 &&
                                        <div className="relative w-full sm:px-4 p-2">
                                             <Carousel>
                                                  {post?.postPhoto[index]?.postPhoto.map((pic, position) => (
                                                       <LazyLoad className='flex' key={position}>
                                                            <img src={pic} alt="" className='sm:rounded-lg border-2 border-black w-full lg:h-96 h-full object-contain rounded-md' />
                                                       </LazyLoad>
                                                  ))}
                                             </Carousel>
                                        </div>
                                   } */}
                                   {post?.postPhoto.length !== 0 &&
                                        <div className="relative w-full lg:h-96 h-full sm:px-4">
                                             <img
                                                  src={post?.postPhoto[0]}
                                                  alt=""
                                                  className="sm:rounded-lg border-2 border-black w-full h-full object-contain rounded-md"
                                             />
                                        </div>
                                   }

                                   {post?.message && <div className={'pl-3 overflow-scroll example my-2 rounded-xl max-h-20 overflow-y-scroll ' + (post?.postPhoto.length !== 0 ? 'text-sm sm:text-base' : 'text-2xl sm:text-3xl font-extrabold')}>{post.message}</div>}
                              </div>

                              <ShowCommentsAndLike
                                   commenterPhoto={postDetails[0]?.postMaker[0]?.profilePhoto}
                                   postId={post?._id}
                                   comments={post?.comments}
                                   signupInfo={post?.userSignupInfo}
                                   likes={post?.likes}
                              />
                              <MakeComment commenterPhoto={postDetails[0]?.postMaker[0]?.profilePhoto} postId={post._id} />
                         </div>
                    ))
               )}
          </div>
     );
};

export default SearchedPersonPost;
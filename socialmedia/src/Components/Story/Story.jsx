import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import StoryLoadingHomePage from '../Animation/StoryLoadingHomePage';


const Story = () => {
     const [storyDetails, setStoryDetails] = useState([]);
     const [isloading, setIsLoading] = useState(true);

     const getTimeDiff = (postTime) => {
          const currentDate = new Date();
          const postDate = new Date(postTime);
          const timeDifferenceInMilliseconds = currentDate - postDate;
          const timeDifferenceInHours = (timeDifferenceInMilliseconds / (1000 * 60 * 60)).toFixed(10);
          // console.log(timeDifferenceInHours)
          return timeDifferenceInHours;
     }

     const getStory = () => {
          axios.post("http://127.0.0.1:8080/auth/storyDetails")
               .then((res) => {
                    setTimeout(() => {
                         setStoryDetails(res.data);
                    setIsLoading(false);
                    }, 1000);
               })
               .catch((error) => {
                    console.log(error);
                    setIsLoading(false)
               });
     };

     useEffect(() => {
          getStory();
     }, []);

     return (
          <div className='w-full'>
               <h2 className="sm:text-2xl pl-3 pb-2 sm:leading-snug tracking-wide font-bold">Story</h2>
               <div className="w-full h-24 md:h-24 overflow-y-hidden overflow-x-scroll example px-3">
                    {isloading ? <div className='flex gap-x-5'><StoryLoadingHomePage /><StoryLoadingHomePage /><StoryLoadingHomePage /><StoryLoadingHomePage /><StoryLoadingHomePage /></div> :
                         <>
                              {storyDetails && storyDetails.storyDetails && storyDetails.storyDetails.length > 0 ? (
                                   <ul className="flex w-full h-24 md:h-28 overflow-x-scroll example gap-x-8">
                                        {storyDetails.storyDetails
                                             // .filter((story, index) =>(getTimeDiff(story.postCreationTime[index]) - story.duration[index]) < 0)
                                             .map((story, index) => (
                                                  <Link style={{ textDecoration: "none" }} to={`/story/view-story/${encodeURIComponent(story._id)}`} key={story._id} className="flex flex-col space-y-1 rounded-full pb-5">
                                                       <div className="relative p-1 rounded-full">
                                                            <div className="flex gap-5 ">
                                                                 <li className="duration-300">
                                                                      <div className="storyAnimation md:w-16 md:h-16 w-16 h-16 relative rounded-full p-0.5 bg-gradient-to-tr from-yellow-400 to-purple-600">
                                                                           <img src={story.storyPhoto[0][0]} alt="userStory" className="w-full h-full object-cover rounded-full" />
                                                                           <div className='md:w-20 pt-1 truncate text-xs sm:text-base'>{story.storyUserDetalis[0].userName}</div>
                                                                      </div>
                                                                 </li>
                                                            </div>
                                                       </div>
                                                  </Link>
                                             ))}
                                   </ul>
                              ) : (
                                   <p>No stories available.</p>
                              )}
                         </>}
               </div>
          </div>
     );
};
export default Story;

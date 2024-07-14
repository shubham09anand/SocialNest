import React, { useState, useEffect } from "react";
import { Carousel } from "@material-tailwind/react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import StoryLoadingAnimation from "../Animation/storyLoadingAnimation";


const ShowSelectedStory = () => {
     const [story, setStory] = useState({});
     const [error, setError] = useState(null);
     const [isLoading, setIsLoading] = useState(true);
     const { storyId } = useParams();

     const getTimeDiff = (postTime) => {
          const currentDate = new Date();
          const postDate = new Date(postTime);
          const timeDifferenceInMilliseconds = currentDate - postDate;
          const timeDifferenceInHours = (timeDifferenceInMilliseconds / (1000 * 60 * 60)).toFixed(4);
          return timeDifferenceInHours;
     }

     useEffect(() => {
          axios
               .get(`http://127.0.0.1:8080/auth/getSelectedStory?storyId=${storyId}`)
               .then((res) => {
                    setStory(res.data);
                    setIsLoading(false)
               })
               .catch((error) => {
                    setError(error);
               })
     }, [storyId]);


     return (
          <div className="w-full xl:w-[80%] 2xl:w-[83%] xl:p-5 xl:absolute top-1 right-0 -z-1 example">
               {isLoading && <StoryLoadingAnimation />}
               {error && <p>Error: {error.message}</p>}
               {!isLoading && !error && story && story.message === "Story Exists" && (
                    <div>
                         <div className="w-full sm:w-1/2 md:w-1/3 mx-auto h-[75vh] lg:h-[75vh] example mt-16 sm:mt-0">
                              <div className="w-full h-full mx-auto relative example space-y-2 lg:mt-10 ">
                                   <div className="flex gap-x-2">
                                        <Link to='/home' className="active:bg-gray-300 w-fit p-2 h-fit">
                                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                                             </svg>
                                        </Link>
                                        <Link to={`/searched-person/${story.storyDetails[0].userId}`} style={{ textDecoration: "none" }} className="z-10 top-4 pl-2 space-x-4 backdrop-blur-sm w-full flex">
                                             <img src={story.storyDetails[0].userPhoto[0].profilePhoto} alt="" className="sm:w-10 sm:h-10 w-12 h-12 rounded-full shadow shrink-0 border-4 object-cover" style={{border:"solid"}} />
                                             <div>
                                                  <div className="text-gray-900">{story.storyDetails[0]?.storyUserDetalis[0].firstName} {story.storyDetails[0]?.storyUserDetalis[0].lastName}</div>
                                                  <div className="w-2/3 text-gray-900 text-xs">{story.storyDetails[0]?.storyUserDetalis[0].userName}</div>

                                             </div>
                                        </Link>
                                   </div>
                                   <div>
                                        <Carousel>
                                             {story.storyDetails[0].storyPhoto.map((photoSet, setIndex) => (
                                                  photoSet.map((photo, index) => (
                                                       <div key={`${setIndex}-${index}`}>
                                                            {/* {getTimeDiff(story.storyDetails[0].postCreationTime[setIndex]) < story.storyDetails[0].duration[setIndex] ? */}

                                                            <>
                                                                 <img src={photo} alt={"image Failed " + index + 1} className="w-full h-[75vh] lg:h-[85vh]" />
                                                                 <div className="bottom-10 p-2 pl-4 max-h-20 h-fit duration-[2s] overflow-y-scroll absolute text-white backdrop-blur-xl w-full">
                                                                      {story.storyDetails[0].storyMessage[setIndex]}
                                                                 </div>
                                                            </>

                                                            {/* : null */}
                                                            {/* } */}
                                                       </div>
                                                  ))
                                             ))}
                                        </Carousel>

                                   </div>
                              </div>
                         </div>
                    </div>
               )}
          </div>
     );
};

export default ShowSelectedStory;
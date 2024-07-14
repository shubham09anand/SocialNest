import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import LazyLoad from 'react-lazy-load';
import { Carousel } from "@material-tailwind/react";

import PostAniamtion from '../Animation/PostAniamtion';

import MakeComment from './MakeComment';
import ShowCommentsAndLike from './ShowCommentsAndLike';
import Story from '../Story/Story';
import noProfilePicture from '../../Assets/NoProileImage.png';

const Post = ({ userPhoto }) => {

  const [isLoading, setIsLoading] = useState(true);
  const [PostDetails, setPostDetails] = useState();

  useEffect(() => {
    axios
      .post('http://127.0.0.1:8080/auth/postDetails')
      .then((res) => {
        setTimeout(() => {
          setPostDetails(res.data);
          setIsLoading(false)
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // console.log(PostDetails)

  return (
    <div className="w-full gap-y-5 max-h-[200vh] overflow-y-scroll example lg:w-4/5 md:border-r">

      <Story />

      <h2 className="sm:text-3xl pl-3 pb-2 sm:leading-snug tracking-wide font-bold mt-2">Post</h2>

      {isLoading ? (
        <div className='space-y-4'>
          <PostAniamtion />
          <PostAniamtion />
          <PostAniamtion />
          <PostAniamtion />
          <PostAniamtion />
        </div>) :
        PostDetails?.Post.length === 0 ? (
          <div className="text-center mt-4 text-gray-500">
            No posts available at the moment.
          </div>
        ) :
          (
            PostDetails?.Post.map((post, index) => (
              <div key={index} className="w-full sm:my-4 bg-white rounded-lg text-sm font-medium dark:bg-dark2 mx-auto border-b-2">
                <Link to={`/searched-person/${post.userId}`} key={post._id} style={{ textDecoration: "none" }} className="flex gap-3  p-2.5 text-sm font-medium">
                  <div className='p-1 rounded-lg'>
                    {PostDetails?.Post[index].postMaker[0] ?
                      <img

                        src={PostDetails?.Post[index].postMaker[0]?.profilePhoto}
                        alt=""
                        className="w-9 md:w-14 h-9 md:h-14 rounded-full object-cover"
                      /> :
                      <img
                        src={noProfilePicture}
                        alt=""
                        className="border-4 border-black w-9 md:w-14 h-9 md:h-14 rounded-full object-cover"
                      />
                    }
                  </div>
                  <div className="flex-1 place-content-center items-center">
                    <div>
                      <h4 className="text-sm md:text-base pt-2 text-black dark:text-white">
                        {post.userSignupInfo[0]?.firstName}{' '}
                        {post.userSignupInfo[0]?.lastName}
                        <div className='text-xs md:text-sm'>
                          {post.userSignupInfo[0]?.userName}
                        </div>
                      </h4>
                    </div>
                  </div>
                </Link>
                <div aria-expanded="false">
                  {PostDetails?.Post[index]?.postPhoto.length !== 0 &&
                    <div className="relative w-full sm:px-4 p-2">
                      <Carousel>
                      {PostDetails?.Post[index]?.postPhoto.map((pic, position) => (
                        <LazyLoad className='flex' key={position}>
                          <img src={pic} alt="" className='sm:rounded-lg border-2 border-black w-full lg:h-96 h-full object-contain rounded-md' />
                        </LazyLoad>
                      ))}
                      </Carousel>
                    </div>
                  }

                  <div className='flex gap-x-5 pl-0 my-1'>
                    {post.postTags && post.postTags.map((tag, index) => (
                      <div key={index} className='font-extrabold font-mono p-1 px-2 rounded-full border-2 shadow-inner mt-2'>{tag}</div>
                    ))}
                  </div>

                  <div className='flex justify-between place-content-center items-center px-3'>
                    <div className="text-xs pt-1 text-gray-800 dark:text-white/80">
                      { }
                      {moment(post.postMaker[index]?.createdAt).format(
                        'D MMMM YYYY'
                      )}{' '}
                      , {moment(post.postMaker[index]?.createdAt).format('h:mm A')}
                    </div>
                  </div>

                  {post.message && <div className={'pl-3 overflow-scroll example my-2 rounded-xl max-h-20 overflow-y-scroll ' + (PostDetails?.Post[index]?.postPhoto.length !== 0 ? 'text-sm sm:text-base' : 'text-2xl sm:text-3xl font-extrabold')}>{post.message}</div>}
                </div>

                <ShowCommentsAndLike
                  postId={post._id}
                  comments={post.comments}
                  likes={post.likes}
                />
                <MakeComment userPhoto={userPhoto} commenterPhoto={PostDetails?.Post[index]?.postMaker[0]?.profilePhoto} postId={post._id} />
              </div>
            ))
          )}
    </div>
  );
};

export default Post;

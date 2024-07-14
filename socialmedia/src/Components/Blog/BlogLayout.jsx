import React from 'react';
import {Link} from 'react-router-dom';
import BlogPage from './BlogPage';

const BlogLayout = () => {

  return (
    <div className='w-full xl:w-[80%] 2xl:w-[83%]  xl:p-5 xl:absolute top-10 right-0 -z-10'>
      <div className='flex gap-10 pt-10 pl-1 md:pl-10'>
        <Link to='/blog/CreateBlog' style={{ textDecoration: "none" }}>
          <button type="button" className="button flex p-2 px-3 bg-black/90 text-white shadow-sm gap-1 place-content-center items-center rounded-md mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <div>Create Blog</div>
          </button>
        </Link>
      </div>
      <BlogPage />
    </div>
  );
}

export default BlogLayout;
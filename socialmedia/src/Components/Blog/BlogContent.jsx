import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "@material-tailwind/react";
import moment from "moment/moment";
import axios from "axios";
import { useParams } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';

import LoadingAnimation from "../Animation/LoadingAnimation";

const BlogContent = () => {
     const [article, setArticle] = useState(null);
     const [error, setError] = useState(null);
     const [isLoading, setIsLoading] = useState(true);

     const { id } = useParams();

     useEffect(() => {
          axios
               .get(`http://127.0.0.1:8080/auth/getRequestedArticle/${id}`)
               .then((res) => {
                    setArticle(res.data.articleData[0]);
                    setTimeout(() => {

                    }, 1200);
               })
               .catch((error) => {
                    setError(error);
               })
               .finally(() => {
                    setTimeout(() => {
                         setIsLoading(false);
                    }, 1200);
               });
     }, [id]);

     // console.log(article)

     return (
          <div className="relative w-full xl:w-[80%] 2xl:w-[83%] xl:p-5 xl:absolute right-0">
               {isLoading ? (
                    <div className="absolute right-0 w-fit"><LoadingAnimation /></div>
               ) : error ? (
                    <div>Error: {error.message}</div>
               ) : (
                    <>
                         <div className="w-60 mt-20 xl:-ml-10 lg:px-1 text-xl text-gray-800 leading-normal h-fit fixed hidden lg:block">
                              <p className="text-base font-bold py-2 lg:pb-3 text-gray-700">
                                   Menu
                              </p>
                              <div
                                   className="w-full sticky inset-0 hidden h-64 lg:h-auto example md:block mt-0 shadow lg:shadow-none lg:bg-transparent z-50"
                                   style={{ top: "1em" }}
                                   id="menu-content"
                              >
                                   <ul className="list-reset backdrop-blur-sm">
                                        <li className="py-2 md:my-0 lg:hover:bg-transparent">
                                             <div
                                                  href="#"
                                                  className="block pl-4 align-middle text-gray-700 no-underline hover:text-purple-500 border-transparent lg:hover:border-gray-400"
                                             >
                                                  {article?.paragraphs?.map(
                                                       (paragraph, index) => (
                                                            <div
                                                                 key={index}
                                                                 className="mb-6"
                                                            >
                                                                 <a
                                                                      className="pb-1 md:pb-0 text-sm"
                                                                      href={`#Introduction-${index}`}
                                                                 >
                                                                      {
                                                                           paragraph.title
                                                                      }
                                                                 </a>
                                                            </div>
                                                       )
                                                  )}
                                             </div>
                                        </li>
                                   </ul>
                              </div>
                         </div>
                         <div className="container md:px-6 mt-14 sm:mt-0">
                              <section className="mb-32 md:p-5 w-full md:absolute right-0 lg:w-4/5 flex flex-col px-2">
                                   <div className="flex relative space-x-5">
                                        <div className=" left-0 translate-y-14 sm:translate-y-0 md:translate-y-0 mr-3">
                                             <Link
                                                  to={`/blog`}
                                                  style={{
                                                       textDecoration: "none",
                                                       color: "black",
                                                  }}
                                             >
                                                  <svg
                                                       xmlns="http://www.w3.org/2000/svg"
                                                       fill="none"
                                                       viewBox="0 0 24 24"
                                                       strokeWidth="1.5"
                                                       stroke="currentColor"
                                                       className="w-10 h-10 p-2 -mt-10 sm:mt-5 ml-3 lg:ml-5 bg-gray-200 rounded-full hover:opacity-60 z-10 cursor-pointer "
                                                  >
                                                       <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                                                       />
                                                  </svg>
                                             </Link>
                                        </div>
                                        <h1 className="mb-4 text-5xl md:text-7xl font-extrabold mx-auto mt-2  ">
                                             {article?.articleTitle}
                                        </h1>
                                   </div>

                                   <Link to={`/searched-person/${article?.userID}`} style={{ textDecoration: "none" }} className="flex">
                                        <img
                                             className="object-center object-contain border-2 border-black rounded-full h-14 w-14" style={{ border: "solid" }}
                                             src={
                                                  article?.storyUserDetalis[0]
                                                       .profilePhoto ||
                                                  "https://via.placeholder.com/150"
                                             }
                                             alt="ArticlePhoto"
                                        />
                                        <div className="text-sm font-thin pl-2 my-auto">
                                             <p className="">
                                                  {
                                                       article?.storyWriterName[0]
                                                            .firstName
                                                  }{" "}
                                                  {
                                                       article?.storyWriterName[0]
                                                            .lastName
                                                  }
                                             </p>
                                             <p className="">
                                                  {moment(
                                                       article?.createdAt
                                                  ).format("DD-MMM-YYYY")}
                                             </p>

                                             <p className="mb-6 flex items-center font-thin">
                                                  <svg
                                                       xmlns="http://www.w3.org/2000/svg"
                                                       width="16"
                                                       height="16"
                                                       fill="currentColor"
                                                       className="bi bi-clock mt-.5"
                                                       viewBox="0 0 16 16"
                                                  >
                                                       <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                                                       <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
                                                  </svg>
                                                  <span className="pl-1 pb-0.5 text-sm">
                                                       {moment(
                                                            article?.createdAt
                                                       ).format("hh:mm A")}
                                                  </span>
                                             </p>
                                        </div>
                                   </Link>

                                   {article?.articlePhotos.length > 0 && (
                                        <>
                                             <div className="w-fit h-full example overflow-x-scroll">
                                                  <Carousel className="h-full w-fit bg-gray-00 rounded-xl mb-10 relative" style={{ width: "fit-content" }}>
                                                       {article.articlePhotos.map(
                                                            (url, index) => (
                                                                 <>
                                                                      <

                                                                           >
                                                                           <div className="bg-white absolute top-3 right-5 px-3 w-fit rounded-full">
                                                                                {index + 1}{" "}/{" "}
                                                                                {article.articlePhotos.length}
                                                                           </div>
                                                                           <img
                                                                                key={index} src={url} alt="" className="w-1/2  mx-auto h-80 md:h-96 object-contain"
                                                                           />
                                                                      </>
                                                                 </>
                                                            )
                                                       )}
                                                  </Carousel>
                                             </div>
                                        </>
                                   )}

                                   {article?.paragraphs.map(
                                        (paragraph, index) => (
                                             <div
                                                  key={index}
                                                  className="mb-6"
                                             >
                                                  <div
                                                       className="font-bold text-3xl "
                                                       id={`Introduction-${index}`}
                                                  >
                                                       {paragraph.title}
                                                  </div>
                                                  <p className="textSelection wordSpace mb-6 text-gray-600 font-normal pt-4 font-signature1 text-lg">
                                                       {paragraph.content}
                                                  </p>
                                             </div>
                                        )
                                   )}
                              </section>
                         </div>
                    </>
               )}
          </div>
     );
};

export default BlogContent;

import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import moment from "moment/moment";
import { Carousel } from "@material-tailwind/react";
import axios from "axios";

import avatar7 from "../../Assets/images/avatars/avatar-7.jpg";
import LoadindBlogCard from "../Animation/LoadindBlogCard";


const BlogPage = () => {
     const [article, setArticle] = useState();
     const [error, setError] = useState();
     const [loading, setLoading] = useState(true);

     useEffect(() => {
          axios.get("http://127.0.0.1:8080/auth/getArticle")
               .then((res) => {
                    setArticle(res.data.article);
                    setLoading(false);
               })
               .catch((error) => {
                    setError(error);
                    setLoading(false);
               });
     }, []);

     return (
          <div className="w-full lg:w-fit ">
               <div className="no-underline rounded-2xl md:p- space-y-4 w-full xl:w-fit overflow-y-scroll example">
                    {loading ? (
                         <div>
                              <LoadindBlogCard />
                              <LoadindBlogCard />
                              <LoadindBlogCard />
                              <LoadindBlogCard />
                         </div>
                    ) : error ? (
                         <div>
                              <LoadindBlogCard />
                              <LoadindBlogCard />
                              <LoadindBlogCard />
                              <LoadindBlogCard />
                         </div>
                    ) : (
                         article?.map((record) => (
                              <div key={record._id} className="w-full pb-2 flex gap-10 sm:p-2 active:opacity-60 no-underline">
                                   <div title={"Read " + record.articleTitle} className="no-underline flex w-full flex-col justify-center">
                                        <div className="relative flex flex-col md:flex-row md:space-x-5 md:pl-5 space-y-3 md:space-y-0 rounded-xl shadow-lg w-full md:max-w-3xl mx-auto border border-white bg-white">
                                             <div className="w-full md:w-1/3 bg-white grid place-items-center relative">
                                                  <Carousel className="h-60 w-full rounded-xl mb-10 example">
                                                       {record?.articlePhotos.map(
                                                            (url, index) => (
                                                                 <img key={index} src={url} alt="" className="w-full h-full" />
                                                                 // <div key={index} className="w-full h-full" style={{ backgroundImage: `url(${url})`, backgroundSize: 'cover' }} ></div>
                                                            )
                                                       )}
                                                  </Carousel>
                                             </div>
                                             <Link to={`/blog/ReadContent/${encodeURIComponent(record.articleTitle)}/${record._id}`} style={{ textDecoration: "none" }} className="relative w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3">
                                                  <div className="h-44 -mt-8 md:pt-10 overflow-hidden">
                                                       <h3 className="font-black text-gray-800 md:text-3xl text-2xl">{record?.articleTitle}</h3>
                                                       <p className="md:text-base text-gray-500 text-xs hyphens-manual overflow-hidden">{record?.paragraphs[0].content}</p>
                                                  </div>
                                                  <div className="flex space-x-3 place-content-center items-center w-fit p-3">
                                                       <img src={avatar7} alt="Writer Pic" className="w-10 h-10 rounded-full" />
                                                       <div className="text-xs">
                                                            <div>{record?.writerdata[0].firstName}  {record?.writerdata[0].lastName}</div>
                                                            <div>{moment(record?.createdAt).format("DD-MM-YYYY")}</div>
                                                       </div>
                                                  </div>
                                             </Link>
                                        </div>
                                   </div>
                              </div>
                         ))
                    )}
               </div>
          </div>
     );
};

export default BlogPage;
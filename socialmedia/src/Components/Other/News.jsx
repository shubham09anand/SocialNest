import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Carousel } from "@material-tailwind/react";


import newsTemplate from '../../Assets/images/NewsImage.jpg';
import LoadingNewsAnimation from '../Animation/LoadingNewsAnimation';
import Error from '../Animation/Error';


const News = () => {
     const [newsData, setNewsData] = useState([]);
     const [error, setError] = useState(true);
     const [loading, setLoading] = useState(true);

     useEffect(() => {
          const fetchData = async () => {
               const apiKey = 'xNomhkVetThz3DOz48oQXTspUZi6gxG9';
               const apiUrl = `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${apiKey}`;
               try {
                    const response = await axios.get(apiUrl);
                    setNewsData(response.data.results);
                    setError(false)
               } catch (error) {
                    console.error('Error fetching NYT API:', error);
               } finally {
                    setLoading(false);
               }
          };
          fetchData();
     }, []);

     // console.log(newsData)

     return (
          <div className="w-full xl:w-[85%] xl:p-5 xl:absolute right-0 -z-10">
               <div>
                    <div className="max-w-md mx-auto text-center">
                         <h2 className="text-6xl font-bold my-2">News</h2>
                    </div>
                    {!loading && !error && (
                         <div className="flex min-h-screen w-full p-2">
                              <div className="flex flex-wrap gap-4 w-full place-content-center items-center">
                                   {newsData?.map((record) => (
                                        <div title={"Read " + record.abstract} className="w-96 bg-white p-3 shadow-xl rounded-lg" key={record.url}>
                                             {record.multimedia === null ? (
                                                  <img src={newsTemplate} alt="" className='shadow-2xl rounded-lg h-52 w-full object-cover' />
                                             ) : (
                                                  <Carousel>
                                                       {record.multimedia.slice(0,1).map((media, index) => (
                                                            <img key={index} className="h-52  w-full object-cover" src={media.url} alt={`Media ${index}`} />
                                                       ))}
                                                  </Carousel>
                                             )}
                                             <a href={record.url} style={{ color: "black", textDecoration: "none" }}>
                                                  <div className='font-semibold text-2xl my-2'>{record?.title}</div>
                                                  <div className='text-xs font-thin my-2'>{moment(record.pubDate).format('MMMM DD, YYYY')}</div>
                                                  <div className='text-sm font-thin my-2'>{record?.abstract}</div>
                                                  <div className="flex space-x-3 place-content-center items-center w-fit">
                                                       <div className="text-xs">
                                                            <div>{record?.byline}</div>
                                                       </div>
                                                  </div>
                                             </a>
                                        </div>
                                   ))}
                              </div>
                         </div>
                    )}


                    {loading &&
                         <div className='flex flex-wrap place-content-center items-center'>
                              <LoadingNewsAnimation />
                              <LoadingNewsAnimation />
                              <LoadingNewsAnimation />
                              <LoadingNewsAnimation />
                              <LoadingNewsAnimation />
                              <LoadingNewsAnimation />
                         </div>}
                    {error && <div><Error /></div>}
               </div>
          </div>
     );
};

export default News;

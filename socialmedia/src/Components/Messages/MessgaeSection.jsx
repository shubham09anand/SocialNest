import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useSelector } from 'react-redux';
import noProfilePicture from '../../Assets/NoProileImage.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import wordIcon from '../../Assets/images/icons/wordIcon.png';
import pdfIcon from '../../Assets/images/icons/pdfIcon.png';
import css from '../../Assets/images/icons/css.png';
import javascript from '../../Assets/images/icons/javascript.png';
import html from '../../Assets/images/icons/html.png';
import ppt from '../../Assets/images/icons/ppt.png';
import search from '../../Assets/images/icons/search.png';
import SendMessage from './SendMessage';
import { useNavigate } from 'react-router-dom';

const MessgaeSection = ({ userPhoto }) => {
    const sender_id = useSelector((state) => state.messageSlice.senderId);
    const reciver_id = useSelector((state) => state.messageSlice.receiverId);
    const reciver_photo = useSelector((state) => state.messageSlice.reciverPhoto);
    const [Messages, setMessages] = useState([]);
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [consversation, setConsversation] = useState();
    const navigate = useNavigate();

    // console.log(consversation)

    //function to get message at front end
    if (sender_id === "null" || reciver_id === "null") {
        navigate("/message")
    }
    const getMessages = () => {
        try {
            axios.post("http://127.0.0.1:8080/auth/getMessage", { sender_id, reciver_id })
                .then((res) => {
                    if (res.status === 200) {
                        setMessages(res.data.conversationHistory);
                        setIsLoading(false);
                    } else if (res.status === 404) {
                        setError(true);
                    } else if (res.status === 400) {
                        setError(false);
                    }
                })
                .catch((error) => {
                    setError(true);
                });
        } catch (error) {
            console("Error")
        }
    };

    useEffect(() => {
        getMessages();
    }, [reciver_id, sender_id]);

    const handleDownloadImage = (url, id) => {
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = `Photo-${id}`;

        anchor.addEventListener('click', () => {
            toast.success("Photo is Downloaded Successfully", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                className: "mt-16",
            });
        });

        anchor.click();
    };

    // console.log(consversation?.result.success)
    useEffect(() => {
        if (consversation?.result.success) {
            setMessages(prevMessages => [...prevMessages, consversation.result.createdMessage]);
        }
    }, [consversation]);

    return (
        <div className="xl:w-[80%] 2xl:w-[83%] right-0 absolute mt-[50px] pb-20 space-y-5 example">
            <div className='absolute z-[1000]'>
                <ToastContainer />
            </div>
            {error ? (
                <div className='text-lg text-gray-400 font-semibold w-full text-center'>Network Error</div>
            ) : (
                <div className="shadow- rounded-3xl text-sm font-medium space-y-6 p-3 h-4/5 overflow-y-scroll example">
                    {!isLoading && (!Messages || Messages.length === 0) ? (
                        <div className="text-center text-gray-500 mt-4">No Conversation Exists</div>
                    ) : (
                        <>
                            {Messages.map((msg, index) => (
                                <div id={index} key={index} className={`flex gap-3 ${msg.sourceId === sender_id ? 'flex-row-reverse items-end' : ''}`}>
                                    <img
                                        src={(msg.sourceId === sender_id ? userPhoto?.user?.profilePhoto : reciver_photo) || noProfilePicture}
                                        alt="user"
                                        className="select-none w-9 h-9 rounded-full shadow object-contain"
                                    />
                                    <div>
                                        {msg.message ? (
                                            <div className={`relative px-4 py-2 rounded-[20px] max-w-2xl ${msg.sourceId === sender_id ? 'bg-blue-500 text-white shadow' : 'bg-gray-200'}`}>
                                                {msg.sourceId === sender_id && (
                                                    <div className="flex items-start gap-2.5">
                                                    </div>
                                                )}
                                                <div key={index} className='font-sans'>{msg.message}</div>
                                            </div>
                                        ) : (
                                            <div className={`${msg.sourceId === sender_id ? 'relative space-y-3 h-fit w-fit shadow p-2 rounded-lg bg-gray-200' : 'relativespace-y-3 bg-gray-300 shadow p-2 rounded-lg'}`}>
                                                {msg.sourceId === sender_id && (
                                                    <div className="flex items-start gap-2.5">
                                                    </div>
                                                )}
                                                {msg.messagePhoto.map((pic, index) => (
                                                    (pic.type ?
                                                        (
                                                            pic.type === "image/jpeg" || pic.type === "image/jpg" || pic.type === "image/webp" || pic.type === "image/svg+xml" || pic.type === "image/AI" ?
                                                                <div className='relative' key={index} >
                                                                    <svg onClick={() => handleDownloadImage(pic.base64, msg.sourceId)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="white" className="w-6 h-6 absolute top-3 right-2 backdrop-blur-2xl p-0.5 rounded-md cursor-pointer active:opacity-70">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                                                    </svg>
                                                                    {pic.base64}
                                                                    <img src={pic.base64} className='w-[200px] md:w-72 h-72 rounded-lg my-1 object-contain' />
                                                                </div>

                                                                :
                                                                <div className='h-fit py-2 px-2 rounded-md bg-white'>
                                                                    <div className='flex max-w-lg justify-between px-2'>
                                                                        <div className='flex justify-between my-auto w-full space-x-5'>
                                                                            {
                                                                                pic.type === "application/pdf" ? < img src={pdfIcon} alt="" className='w-10 h-10 md:w-14 md:h-14' />
                                                                                    : pic.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ?
                                                                                        <img src={wordIcon} alt="" className='w-10 h-10 md:w-14 md:h-14' />
                                                                                        : pic.type === "application/x-javascript" ?
                                                                                            <img src={javascript} alt="" className='w-10 h-10 md:w-14 md:h-14' />
                                                                                            : pic.type === "text/html" ?
                                                                                                <img src={html} alt="" className='w-10 h-10 md:w-14 md:h-14' />
                                                                                                : pic.type === "text/css" ?
                                                                                                    <img src={css} alt="" className='w-10 h-10 md:w-14 md:h-14' />
                                                                                                    : pic.type === "application/vnd.openxmlformats-officedocument.presentationml.presentation" ?
                                                                                                        <img src={ppt} alt="" className='w-10 h-10 md:w-14 md:h-14' />
                                                                                                        : pic.type === "notKnown" ?
                                                                                                            <img src={search} alt="" className='w-10 h-10 md:w-14 md:h-14' />
                                                                                                            : pic.type === "" ?
                                                                                                                <img src={search} alt="" className='w-10 h-10 md:w-14 md:h-14' />
                                                                                                                : null}
                                                                            <div className='relative w-fit'>
                                                                                {pic.base64.startsWith("data:image/") && 
                                                                                    <><img src={pic.base64} className='md:w-full h-48 rounded-lg my-1 object-fill' /></> 
                                                                                }
                                                                                <a href={pic.base64} download={`${pic.name}`} className='hover:text-black my-auto absolute bottom-0 right-14 h-fit' style={{ textDecorationColor: "none" }}>
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-6 h-6 border-2 rounded-full p-0.5 translate-x-12">
                                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
                                                                                    </svg>
                                                                                    {!pic.base64.startsWith("data:image/") &&
                                                                                        <div className='max-w-[200px] text-sm mt-2 text-left truncate font-semibold no-underline' style={{ textDecorationColor: "none" }}>{pic.name}</div>

                                                                                    }
                                                                                </a>

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                        ) : 
                                                        <div className='relative' key={index} >
                                                            <svg onClick={() => handleDownloadImage(pic, msg.sourceId)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="white" className="w-6 h-6 absolute top-3 right-2 backdrop-blur-2xl p-0.5 rounded-md cursor-pointer active:opacity-70">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                                            </svg>
                                                            <img src={pic.base64} className='w-[300px] md:w-96 h-64 rounded-lg my-1 object-fill' />
                                                        </div>
                                                    )

                                                ))}
                                            </div>
                                        )}
                                        <div className='text-right font-extralight font-italic font-mono text-[10px] md:text-[12px] select-none'>{moment(msg?.createdAt).format('h:mm A, DD/MMM/YYYY')}</div>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            )}
            <SendMessage userPhoto={userPhoto} newConsversation={setConsversation} />
        </div>
    );
};

export default MessgaeSection;
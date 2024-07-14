import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';

import AIchat from './AIchat';
import AiImage from './aiImage';

import noProfilePicture from '../../Assets/NoProileImage.png';
import wordIcon from '../../Assets/images/icons/wordIcon.png';
import pdfIcon from '../../Assets/images/icons/pdfIcon.png';
import css from '../../Assets/images/icons/css.png';
import javascript from '../../Assets/images/icons/javascript.png';
import html from '../../Assets/images/icons/html.png';
import ppt from '../../Assets/images/icons/ppt.png';
import search from '../../Assets/images/icons/search.png';

const SendMessage = ({ userPhoto, newConsversation }) => {

  const sourceId = useSelector((state) => state.messageSlice.senderId);
  const reciverId = useSelector((state) => state.messageSlice.receiverId);
  const { roomID } = useParams();
  const [message, setMessage] = useState();
  const [photoSection, setphotoSection] = useState(false);
  const [fileUploaded, setFileUploaded] = useState([]);
  const [display, setDisplay] = useState(false);
  const [componentDisplay, setComponentDisplay] = useState(false);
  const [aiSelctionDislay, setAiSelctionDislay] = useState(true);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const s = io("http://127.0.0.1:3001");
    setSocket(s);

    return () => {
      s.disconnect();
    }
  }, [newConsversation]);

  // used for controlling aichat section and image section
  const handleIconsDisplay = () => {
    if (display === false) {
      setDisplay(true)
    } else {
      setDisplay(false)
    }
  }

  // used for showing thr option of logo of ai options
  const handleComponentDisplay = (value) => {
    setComponentDisplay(value)
  }

  console.log("send photo " + fileUploaded)

  // handle image uplodation
  let handleImageChange = (e) => {
    var files = e.target.files;
    var filesArray = [].slice.call(files);
    let toatalSize = 0;

    filesArray.forEach((file) => {
      toatalSize = + file.size;
    })

    if (toatalSize > 10000000) {
      toast.error("File Size Exceeded, Maximum 10 Mb is Allowed");
      return;
    }

    // console.log("send " + fileUploaded)
    filesArray.forEach((file) => {
      let reader = new FileReader();
      let fileType = file.type || "notKnown";
      reader.onloadend = () => {
        let base64String = reader.result;
        setFileUploaded((prevFiles) => [
          ...prevFiles,
          { base64: base64String, type: fileType, name: file.name }
        ]);
      };
      try {
        reader.readAsDataURL(file);
      } catch (error) {
        toast.warning("Process faliled")
      }
    });
  };

  const handleRemoveImages = () => {
    setphotoSection(false)
    setFileUploaded([]);
  };

  // process to send Meaasge
  const sendMessage = (e) => {
    e.preventDefault();
    
    if (!(message || fileUploaded.length > 0)) {
      toast.warning("Either message or photo is required");
      return;
    };
    
    if (!socket || !roomID) return;
    console.log(sourceId, reciverId, fileUploaded, roomID)
    socket.emit("send_message",
      { sourceId: sourceId, reciverId: reciverId, message: message, messagePhoto: fileUploaded, convoId: roomID },
      (error, data) => {
        console.log(data)
        console.log(data.result.success)
        console.log("Message sent successfully:", data);
      }
      );
      handleRemoveImages();
      setMessage("");
  };

  useEffect(() => {
    if (!socket) return;

    socket.on("forward_message", (data) => {
      console.log(data)
      newConsversation(data)
    });

    return () => {
      socket.off("forward_message");
    };
  }, [socket,roomID,newConsversation])


  return (

    <div className="xl:w-[80%] 2xl:w-[83%] right-0 z-30 fixed items-center overflow-x-hidden bottom-0 w-full example">
      <ToastContainer style={{ fontSize: '15px', marginTop: "100px" }} />

      <div className=''>
        {
          display && aiSelctionDislay ? (
            <>{componentDisplay ? <AIchat /> : <AiImage setFileUploaded={setFileUploaded} setDisplay={setDisplay} />}</>
          ) : null
        }
      </div>

      {/* send Message section */}
      <form onSubmit={sendMessage} className="w-full py-2.5 border-t bg-white border-gray-500 items-center gap-1 dark:border-slate-700/40">
        <div className="mb-2 sm:mb-0">
          {photoSection && (
            <div className="relative h-fit flex items-center justify-center w-full">
              {fileUploaded.length !== 0 ? (
                <div className='w-full h-full overflow-x-scroll mx-auto my-2 example'>
                  <div className='flex w-fit overflow-x-scroll h-full example mx-auto space-x-3'>
                    {fileUploaded.map((pic, index) => (
                      (
                        pic.base64.startsWith("data:image/")
                          ? 
                            <>
                            <img key={index} className='w-60 h-40 rounded-lg' src={pic.base64} alt="" />
                            </>
                          :
                          <div className='h-40 w-60 py-2 px-2 rounded-md bg-slate-300' style={{ border: "solid black 1px" }}>
                            <div className='flex justify-between px-2 max-w-lg h-full'>
                              <div className='max-w-lg justify-between my-auto h-full mx-auto'>
                                {
                                  pic.type === "application/pdf" ? < img src={pdfIcon} alt="" className='w-10 h-10 md:w-14 md:h-14 mx-auto' />
                                    : pic.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ?
                                      <img src={wordIcon} alt="" className='w-10 h-10 md:w-14 md:h-14 mx-auto' />
                                      : pic.type === "application/x-javascript" ?
                                        <img src={javascript} alt="" className='w-10 h-10 md:w-14 md:h-14 mx-auto' />
                                        : pic.type === "text/html" ?
                                          <img src={html} alt="" className='w-10 h-10 md:w-14 md:h-14 mx-auto' />
                                          : pic.type === "text/css" ?
                                            <img src={css} alt="" className='w-10 h-10 md:w-14 md:h-14 mx-auto' />
                                            : pic.type === "application/vnd.openxmlformats-officedocument.presentationml.presentation" ?
                                              <img src={ppt} alt="" className='w-10 h-10 md:w-14 md:h-14 mx-auto' />
                                              : pic.type === "" ?
                                                <img src={search} alt="" className='w-10 h-10 md:w-14 md:h-14 mx-auto' />
                                                : null}
                                <div>
                                  <div className='hover:text-black my-auto h-fit' style={{ textDecorationColor: "none" }}>
                                    <div className='overflow-hidden max-w-[200px] text-base mt-2 text-left truncate font-bold no-underline' style={{ textDecorationColor: "none" }}>{pic.name}</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                      )
                    ))}
                  </div>
                  <div onClick={handleRemoveImages} className='cursor-pointer mx-auto text-xs font-semibold bg-black text-white w-fit h-fit mt-2 rounded-md p-1'>Cancel</div>
                </div>
              ) : null}
            </div>
          )}

          {/* Ai Display Section */}
          <div className='relative px-3 flex gap-1 sm:gap-2 sm:px-3 place-content-center items-center'>
            {userPhoto?.user?.profilePhoto ?
              <img src={userPhoto?.user?.profilePhoto} alt="" className="hidden md:block w-10 h-10 mb-1 mr-2 rounded-full" />
              :
              <img src={noProfilePicture} alt="" className="hidden md:block w-10 h-10 mb-1 mr-2 rounded-full" />
            }
            <textarea onFocus={() => { setAiSelctionDislay(false) }} onBlur={() => { setAiSelctionDislay(true) }} onChange={(e) => { setMessage(e.target.value) }} value={message} disabled={photoSection} type="text" placeholder="Message"
              className="block w-full pl-2 bg-gray-200 resize-none py-1 rounded-md outline-none focus:text-gray-700"
              name="message" />

            {aiSelctionDislay ?
              (
                <div className='flex rounded-full bg-gray-200'>
                  {display &&
                    (
                      <div className='flex gap-x-4 border  rounded-full bg-gray-200'>
                        <div onClick={() => handleComponentDisplay(false)} className='rounded-full p-2 bg-gray-200'>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                            <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div onClick={() => handleComponentDisplay(true)} className='rounded-full p-2 bg-gray-200'>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-fonts w-7 h-7" viewBox="0 0 16 16">
                            <path d="M12.258 3h-8.51l-.083 2.46h.479c.26-1.544.758-1.783 2.693-1.845l.424-.013v7.827c0 .663-.144.82-1.3.923v.52h4.082v-.52c-1.162-.103-1.306-.26-1.306-.923V3.602l.431.013c1.934.062 2.434.301 2.693 1.846h.479z" />
                          </svg>
                        </div>
                      </div>
                    )}
                  <div onClick={handleIconsDisplay} className='rounded-full p-2 bg-gray-200 cursor-pointer'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                      <path fillRule="evenodd" d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              ) :
              (null)
            }

            {aiSelctionDislay ?
              (<label title='Send Photo' onClick={() => { setphotoSection(true) }} className="mt-1.5 inline-flex items-center justify-center transition duration-500 ease-in-out text-black active:opacity-50 focus:outline-none cursor-pointer ">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" />
                </svg>
                <input onChange={handleImageChange} multiple id="file" type="file" className="hidden" />
              </label>) :
              null
            }
            <button title='send Message' className='outline-none' type="submit">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-800 outline-none active:opacity-70 origin-center transform rotate-90" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20" fill="currentColor">
                <path
                  d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default React.memo(SendMessage);
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';

import { Accordion, AccordionHeader, AccordionBody } from "@material-tailwind/react";

const ScheduledMessage = ({ toggleprofileDisplay }) => {

    const source_id = useSelector((state) => state.messageSlice.senderId);
    const receiver_id = useSelector((state) => state.messageSlice.receiverId);

    const [open, setOpen] = React.useState(1);
    const [scheduledMessage, setScheduledMessage] = useState();
    const [message, setMessage] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [button, setButton] = useState(false);
    const [timeWarning, setTimeWarning] = useState(false);

    const [currentDateandTime, setCurrentDateandTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDateandTime(new Date().toISOString());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const handleOpen = (value) => setOpen(open === value ? 0 : value);

    const handleMessageChange = useCallback((e) => {
        setMessage(e.target.value);
    }, []);
    const handleTimeChange = useCallback((e) => {
        setTime(e.target.value);
    }, []);
    const handleDateChange = useCallback((e) => {
        setDate(e.target.value);
    }, []);

    const sendScheduledMessage = () => {

        if (!message || !date || !time) {
            toast("Please fill in all fields");
            return;
        }
        else {
            const combinedDateTimeString = `${date}T${time}`;
            const dateTimeObject = new Date(combinedDateTimeString);
            const dateTimeISOString = dateTimeObject.toISOString();
            console.log(dateTimeISOString)

            if (currentDateandTime < dateTimeISOString) {
                setButton(true);
                setTimeWarning(false)
                axios.post("http://127.0.0.1:8080/auth/createScheduledMessage", { senderId: source_id, reciverId: receiver_id, scheduledMessage: message, scheduledDateTime: dateTimeISOString }).
                    then((res) => {
                        console.log(res.status)
                        toast("Message is being Scheduled");
                        setButton(false);
                        setDate("");
                        setTime("");
                        setMessage("");
                        toggleprofileDisplay(0);
                    })
                    .catch((error) => {
                        setButton(false);
                        toast("Something Went Wrong");
                        console.error('Error fetching messages:', error);
                    }).finally(() => {
                        setButton(false);
                    });
            } else {
                setTimeWarning(true)
            }
        }
    };

    //get all scheduled message
    const getScheduledMessage = async () => {
        try {
            axios.post("http://127.0.0.1:8080/auth/getScheduledMessage", { userId: source_id, receiver_id: receiver_id }).then((res) => {
                console.log(res.status);
                if (res.status === 200) {
                    setScheduledMessage(res.data);
                    console.log(res.data)
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getScheduledMessage();
    }, [source_id])



    return (
        <div className='overflow-y-scroll shadow-inner h-[300%] sm:w-1/2 lg:w-2/4 xl:w-1/4 mt-14 rounded-xl border-l bg-white fixed right-0 top-0 z-40 px-4'>
            <ToastContainer />

            <div className='overflow-y-scroll h-[200%]'>
                <div className='flex w-full justify-between place-content-center items-center h-fit'>
                    <h2 className="sm:text-2xl pb-2 sm:leading-snug tracking-wide font-bold pt-3">Schedule Message</h2>
                    <svg onClick={() => toggleprofileDisplay(0)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 bg-slate-300 rounded-full p-1 active:opacity-80">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </div>

                <div className='bg-gradient-to-r to-blue-500 via-blue-600 from-blue-900 w-fit relative cursor-help mx-auto rounded-full p-2 scale-90' title='scheduled messages'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="white" className="w-14 h-14">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-clock-history w-5 h-5 absolute bottom-2 right-2 border-2 z-20 bg-white rounded-full" viewBox="0 0 16 16">
                        <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z" />
                        <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z" />
                        <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5" />
                    </svg>
                </div>

                <section className="bg-white dark:bg-gray-900 border-b">
                    <div className="py-2 mx-auto max-w-screen-xl text-center">
                        <h1 className="mb-4 text-3xl font-extrabold tracking-tight leading-none text-gray-900 md:text-3xl">What Is Scheduled Messeging ?</h1>
                        <p className="text-sm font-normal text-gray-500 dark:text-gray-400">Create A Message Which Will Be Send In Future. You Have To Just Give The Time And Date And Message. And Just Sit Back And Chill And When The Time Arrived The Message Will Be Send.</p>
                    </div>
                </section>

                <Accordion open={open === 1} style={{ outline: "none" }} className="  outline-none overflow-y-scroll ">
                    <AccordionHeader
                        style={{ outline: "none" }}
                        onClick={() => handleOpen(1)}
                        className={` text-base py-2 border-b-2 border-black ${open === 1 ? "" : ""
                            }`}
                    >
                        Set A Scheduled Message
                    </AccordionHeader>
                    <AccordionBody className="pt-0 text-xs font-normal py-0 px-2">
                        <div className="w-full space-y-2 py-2 ">
                            <div>
                                <label htmlFor="Message" className="block mb-2 text-sm text-gray-900 font-semibold">Message <span className='text-red-600'>*</span></label>
                                <input onChange={handleMessageChange} value={message} type="Message" id="Message" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 " placeholder="Enter Your Message" required />
                            </div>
                            <div className='flex justify-between w-full space-x-4'>
                                <div className='w-full'>
                                    <label htmlFor="Time" className="block mb-2 text-sm text-gray-900 font-semibold">Time <span className='text-red-600'>*</span></label>
                                    <input onChange={handleTimeChange} value={time} type="time" id="Time" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 " required />
                                </div>
                                <div className='w-full'>
                                    <label htmlFor="Date" className="block mb-2 text-sm text-gray-900 font-semibold">Date <span className='text-red-600'>*</span></label>
                                    <input onChange={handleDateChange} value={date} type="date" id="Time" className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 " required />
                                </div>
                            </div>
                            {timeWarning && <div className='text-red-600 italic tetx-xs'>Set A Valid Furtue Time</div>}
                            < button disabled={button} onClick={sendScheduledMessage} className={`text-white bg-blue-700 active:bg-blue-800 focus:ring-4 focus:outline-none rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center font-semibold ${button ? "cursor-not-allowed" : "cursor-pointer"}`}>Set Message</button>
                        </div>
                    </AccordionBody>
                </Accordion>

                <h2 className="pb-2 sm:leading-snug tracking-wide mt-4 font-semibold border-b-2 border-black mb-2 select-none">Previous Scheduled Message</h2>
                {scheduledMessage?.messages.length > 0 ?
                    (<>
                        {scheduledMessage?.messages.map((message, index) => (
                            <Accordion key={index} open={open === index + 2} style={{ outline: "none" }} className="overflow-y-scroll shadow-inner outline-none">
                                <AccordionHeader
                                    style={{ outline: "none" }}
                                    onClick={() => handleOpen(index + 2)}
                                    className={`outline-none text-base font-thin py-2 border-0 ${open === index + 2 ? "" : ""
                                        }`}
                                >
                                    <p className="block w-full font-sans text-base font-semibold leading-relaxed text-inherit"><span className='pl-4'>Scheduled Message {index+1}</span></p>
                                </AccordionHeader>
                                <AccordionBody className="pt-0 text-sm font-normal py-0 border-t-2">
                                    <div className="space-y-2 relative flex flex-col text-gray-700 shadow-md bg-clip-border w-96">
                                        <div className='flex justify-between flex-col px-4 py-2'>
                                            <p className="block font-sans text-base antialiased font-semibold leading-relaxed"><span className='font-thin'>Message</span> {message.scheduledMessage}</p>
                                            <div className="block font-sans text-sm font-bold leading-relaxed italic"><span className='font-thin mr-3'>Created At </span> {moment(message?.created_at).format('h:mm A, DD-MM-`YY')}</div>
                                            <div className="block font-sans text-sm font-bold leading-relaxed italic"><span className='font-thin mr-3'>Message will Send At </span> {moment(message?.scheduledDateTime).format('h:mm A, DD-MM-`YY')}</div>
                                        </div>
                                        <div className='my-2 hidden  w-fit mx-auto h-fit bg-red-700 active:bg-red-400 cursor-pointer font-semibold text-white px-2 py-1 rounded-sm'>Cancel</div>
                                    </div>
                                </AccordionBody>
                            </Accordion>
                        ))}
                    </>)
                    :
                    <>No Message Exists</>}
            </div>
        </div>
    )
}
export default React.memo(ScheduledMessage);
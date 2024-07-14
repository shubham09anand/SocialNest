import React, { useState } from 'react'
import axios from 'axios'

const AIchat = () => {

     const [aiInput, setAiInput] = useState();
     const [status, setStatus] = useState(false);
     const [button, setButton] = useState(true);

     // process to handle ai 
     const aiData = () => {
          setStatus(true);
          setButton(false);
          axios.get(`http://127.0.0.1:8080/auth/aiResponse?userInput=${aiInput}`)
               .then((res) => {
                    setAiInput(res.data.generatedText);
                    setStatus(false);
                    setButton(false);
               })
               .catch((error) => {
                    console.error("Error fetching AI response:", error);
                    setAiInput("Please Try Again Something Went Wrong !!!")
                    setStatus(false);
               }).finally(() => {
                    setButton(false);

               });
     };

     return (
          <div className={`w-[95%] p-2 mx-auto flex space-x-2 h-fit px-2 place-content-center items-center shadow-md rounded-md bg-white ${status ? 'animate-pulse' : ''}`}>
               <textarea onChange={(e) => { setAiInput(e.target.value) }} value={aiInput} type="text" placeholder="Ask Ai..."
                    className="border-2 border-black rounded-md bg-transparent mt-1.5 max-h-32 w-full block mx-auto py-2 pl-2 h-full resize-none outline-none example focus:text-gray-700"
                    name="message" />
               <button onClick={aiData} title='Ask Ai' className='outline-none'>
                    <svg className={`w-10 h-10 text-gray-800 outline-none active:opacity-70 origin-center transform rotate-90 ${button ? "cursor-pointer" : "cursor-wait"}`} xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 20 20" fill="gray">
                         <path
                              d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
               </button>
          </div>
     )
}

export default AIchat
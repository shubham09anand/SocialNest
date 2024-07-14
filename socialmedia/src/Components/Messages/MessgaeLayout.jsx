import React, { useState, createContext } from 'react';
import ContactList from './ContactList';
import MessageBox from './MessageBox';
import ReciverProfile from './ReciverProfile';
import ScheduledMessage from './ScheduledMessage';

const MessageBoxDisplay = createContext();

const MessageLayout = ({ userPhoto }) => {

  const [Display, setDisplay] = useState(true);
  const [ProfileDisplay, setProfileDisplay] = useState(0);

  const toggleDisplay = (value) => {
    setDisplay(value);
  };

  const toggleprofileDisplay = (value) => {
    setProfileDisplay(value);
  };  

  return (

    <>
      <div className='w-full xl:w-[80%] 2xl:w-[83%] xl:p-2 xl:absolute right-0 -z-10 border-2'>
        <MessageBoxDisplay.Provider value={Display}>
          <div className='flex overflow-scroll'>
            {Display ? <ContactList toggleDisplay={toggleDisplay} /> : <MessageBox userPhoto={userPhoto} toggleDisplay={toggleDisplay} toggleprofileDisplay={toggleprofileDisplay} />}
            {!Display ?
              <>
                {
                  ProfileDisplay === 2 ? <ReciverProfile toggleprofileDisplay={toggleprofileDisplay} />
                    : ProfileDisplay === 1 ? <ScheduledMessage toggleprofileDisplay={toggleprofileDisplay} /> : null
                }
              </> :
              null
            }
          </div>
        </MessageBoxDisplay.Provider>
      </div>
    </>
  );
};

export default React.memo(MessageLayout);
import React, { useState } from 'react'
import addPattern from '../../Assets/images/ad_pattern.png';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreatePost = () => {

  const userId = useSelector((state) => (state.LoginSlice.loggedUserId));
  // console.log(userId)

  const [fileUploaded, setFileUploaded] = useState([]);
  const [PostMessage, setPostMessage] = useState("");
  const [tags, setTags] = useState([]);

  let handleImageChange = (e) => {
    var files = e.target.files;
    var filesArray = [].slice.call(files);
    if (fileUploaded.length + filesArray.length > 5) {
      toast.warning("You can only select up to 5 images for the post.");
      return;
    }
    filesArray.forEach((file) => {
      if (!file.type.startsWith('image/')) {
        toast.warning("Please select only image files.");
        return;
      }
      let reader = new FileReader();
      reader.onloadend = () => {
        let base64String = reader.result;
        setFileUploaded((prevFiles) => [...prevFiles, base64String]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImages = () => {
    setFileUploaded([]);
    setPostMessage()
  };

  const addTag = () => {
    setTags([...tags, '']);
  };

  const handleTagChange = (index, value) => {
    const newTags = [...tags];
    newTags[index] = value;
    setTags(newTags);
  };

  const removeTag = (index) => {
    if (tags.length > 1) {
      const newTags = [...tags];
      newTags.splice(index, 1);
      setTags(newTags);
    }
  };

  const handlePost = () => {
    if (PostMessage.trim() !== "" || fileUploaded.length !== 0) {
      axios.post("http://127.0.0.1:8080/auth/makePost", { userId: userId, message: PostMessage, postPhoto: fileUploaded, postTags: tags })
        .then((res) => {
          // console.log(res.status);
          toast.success("Your post has been uploaded");
          setPostMessage("");
          setFileUploaded([]);
          setTags([]);
        })
        .catch(() => {
          toast.warning("Something went wrong!!! Please Try Again Later");
        });
    } else {
      toast.warning("Please provide a message or upload a photo.");
    }
  };


  return (
    <div className=''>
      <ToastContainer />
      <div className="uk-modal-dialog tt relative overflow-hidden mx-auto p-7 shadow-xl rounded-lg md:w-[650px]  w-full ">
        <div className='text-2xl tracking-wide font-semibold text-center'>Add Post</div>
        <div className="text-center py-3 -m-7 mb-0">
        </div>
        <div className="space-y-5">
          <div>
            <input value={PostMessage} onChange={(e) => { setPostMessage(e.target.value) }} placeholder='Post Messgae...' type="text" className="w-full mt-3 bg-gray-100 outline-none rounded-md py-1 pl-2 text-gray-500" />
          </div>
          <div style={{ backgroundImage: `url(${addPattern})` }} className='shadow-xl border rounded-md'>
            <div className="w-full h-72 relative border1 rounded-lg overflow-hidden  bg-repeat">
              <label htmlFor="createStatusUrl" className="w-fit h-fit flex flex-col justify-center items-center absolute -translate-x-1/2 left-1/2 bottom-0 z-10 pb-6 pt-10 cursor-pointer bg-gradient-to-t">
                {fileUploaded.length === 0 ? <input onChange={(e) => handleImageChange(e)} multiple id="createStatusUrl" accept="image/*" type="file" className="hidden" /> : null}
                {fileUploaded.length === 0 ? <><ion-icon name="postImage" className="text-3xl text-teal-600 md hydrated" role="postImg"></ion-icon><span className="text-black mt-2 text-center bg-white">Browse to Upload image </span></> : <span onClick={() => { handleRemoveImages() }} className="text-white mt-2 w-fit h-fit">Re-upload</span>}
              </label>
              <div className='flex w-full overflow-x-scroll h-full example bg-[url(`/images/ad_pattern.png`)]'>
                {fileUploaded.length > 0 ? fileUploaded.map((photos, index) => { return <img id="createStatusImage" key={index} src={photos} alt="UploadedImage" accept="image/*" className="w-[200vw] mx-1 h-full object-cover" /> }) : null}
              </div>
            </div>
          </div>

          <div className='mt-4'>
            <div className='flex place-content-center items-center w-fit space-x-5'>
              <div>Want to Add Tags <span className='text-xs font-bold'>(it will help to filter POST based on it for your frined/users )</span></div>
              <div>
                {
                  tags.length < 7 ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-4 h-4 bg-black rounded-full cursor-pointer mt-1" onClick={addTag}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  ) : null
                }
              </div>
            </div>
            <div className='flex gap-4 flex-wrap'>
              {tags.map((tag, index) => (
                <div key={index} className='mt-2 relative w-fit'>
                  <div className='tag'>
                    <input type="text" className='focus:bg-gray-300 focus:border-gray-100 focus:text-gray-800 w-32 md:w-28 border-2 pl-2 p-1 border-gray-900 outline-none rounded-2xl' value={tag} onChange={(e) => handleTagChange(index, e.target.value)} />
                    {
                      index > 0 ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#d1420f" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="cursor-pointer active:opacity-50 absolute z-10 -top-2 -right-3 w-6 h-6" onClick={() => removeTag(index)}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                      ) : null
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <button onClick={() => { handlePost() }} type="button" className="button mx-auto bg-blue-500 text-white px-8 rounded-md text-xl py-1">Create Post</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePost
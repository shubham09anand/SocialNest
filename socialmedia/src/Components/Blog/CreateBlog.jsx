import React, { useState, useEffect } from 'react';
import axios from "axios";
import {useSelector} from "react-redux"
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateBlog = () => {
  const [fileUploaded, setFileUploaded] = useState([]);
  const [tags, setTags] = useState([]);

  const userId = useSelector((state)=>(state.LoginSlice.loggedUserId)) 
  // console.log(userId)


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

  let handleImageChange = (e) => {
    var files = e.target.files;
    if (files.length > 5) {
      toast.warning("Maximum 5 Images are allowed");
      return;
    }
    var filesArray = [].slice.call(files);
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

  const [formData, setFormData] = useState({
    titleofArticle: '',
    fileUploaded,
    tags,
    paragraphs: [
      { titleofpara: '', contentofpara: '', required: true }
    ],
  });

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      fileUploaded: fileUploaded
    }));
  }, [fileUploaded]);

  console.log(fileUploaded)

  const initialFormData = {
    titleofArticle: '',
    fileUploaded: [],
    paragraphs: [
      { titleofpara: '', contentofpara: '', required: true }
    ]
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setFileUploaded([]);
    setTags([''])
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const reqObj = {
      userID: userId,
      articleTitle: formData.titleofArticle,
      articlePhotos: formData.fileUploaded,
      paragraphs: formData.paragraphs.map(e => ({ title: e.titleofpara, content: e.contentofpara })),
      tags: formData.articleTags
    };

    axios.post("http://127.0.0.1:8080/auth/createArticle", reqObj)
      .then(() => {
        toast.success("Your Article is Created");
      })
      .catch(() => {
        toast.error("Something Went Wrong!!! Please Try Again Later");
      });

    resetForm();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleParagraphChange = (index, e) => {
    const { name, value } = e.target;
    const newParagraphs = [...formData.paragraphs];
    newParagraphs[index] = { ...newParagraphs[index], [name]: value };
    setFormData((prevData) => ({ ...prevData, paragraphs: newParagraphs }));
  };

  const addParagraph = () => {
    setFormData((prevData) => ({
      ...prevData,
      paragraphs: [...prevData.paragraphs, { titleofpara: '', contentofpara: '', required: false }]
    }));
  };

  const removeParagraph = (index) => {
    if (formData.paragraphs.length > 1) {
      const newParagraphs = [...formData.paragraphs];
      newParagraphs.splice(index, 1);
      setFormData((prevData) => ({ ...prevData, paragraphs: newParagraphs }));
    }
  };

  return (
    <div className="flex w-screen xl:w-[80%] 2xl:w-[83%] xl:p-5 xl:absolute right-0 items-center justify-center lg:mt-">
      <ToastContainer />
      <Link to={`/blog`} style={{ textDecoration: 'none', color: 'black' }} >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10 p-2 -mt-10 sm:mt-5 ml-3 lg:ml-5 bg-gray-200 rounded-full hover:opacity-60 absolute top-0 left-0 z-10 cursor-pointer ">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
      </Link>
      <form className="bg-white rounded-lg shadow-lg md:p-4 p-2 w-full md:w-3/4" onSubmit={handleSubmit}>
        <div className="text-4xl mb-5">Create Your Article</div>
        <div className="mb-4">
          <label htmlFor="titleofArticle" className="font-semibold mb-2 block">Title of Article <span className="text-red-700">*</span>
          </label>
          <input type="text" id="titleofArticle" name="titleofArticle" placeholder="Enter Title for the article" className="border rounded px-4 py-2 w-full" value={formData.titleofArticle} onChange={handleChange} required />
        </div>

        <div className="flex items-center justify-center w-full">
          {fileUploaded.length === 0 ? (
            <>
              <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" ></path>
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG</p>
                  <p className="text-xs text-red-500 dark:text-red-400">Upto 5 images are Supported </p>
                </div>
                <input multiple accept="image/*" onChange={(e) => handleImageChange(e)} id="dropzone-file" type="file" className="hidden" />
              </label>
            </>
          ) : (
            <>
              <div className='w-fit overflow-x-scroll flex space-x-5 p-5'>
                {fileUploaded.slice(0, 5).map((url, index) => (
                  <img key={index} src={url} alt={`Uploaded file ${index}`} className='rounded-xl object-cover w-96 h-48 md:w-[600px] md:h-[350px] select-none' draggable="false" />
                ))}
              </div>
            </>
          )}

        </div>
        {fileUploaded.length === 0 ? (
          null
        ) : (
          <>
            <div className='flex space-x-4 place-content-center items-center text-white  bg-black w-fit h-fit mt-2 font-semibold tracking-wide px-4 py-1 rounded-md cursor-pointer active:opacity-50' onClick={() => setFileUploaded([])}><span>Reupload</span>
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
              </span>
            </div>
          </>
        )}
        <div className='mt-4'>
          <div className='flex place-content-center items-center w-fit space-x-5'>
            <div>Add Tags Related to Article</div>
            <div>
              {
                tags.length < 5 ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-4 h-4 bg-black rounded-full cursor-pointer" onClick={addTag}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
                ):null
              }
            </div>
          </div>
          <span className='text-xs font-semibold'>(one TAG is required)</span>
          <div className='flex gap-4 flex-wrap'>
            {tags.map((tag, index) => (
              <div key={index} className='mt-2 relative w-fit'>
                <div className='tag'>
                  <input required type="text" className='focus:bg-gray-300 focus:border-gray-100 focus:text-gray-800 w-28 border-2 pl-2 p-1 border-gray-900 outline-none rounded-md' value={tag} onChange={(e) => handleTagChange(index, e.target.value)} />
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

        <div className="mt-3 active:opacity-50 bg-gray-600 text-thin flex space-x-5 text-white w-fit h-fit px-4 py-1 rounded-sm cursor-pointer" onClick={addParagraph}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <div>Add more Paragraph</div>
        </div>

        <div id="paragraphs" className="mb-1 p-2">
          {formData.paragraphs.map((paragraph, index) => (
            <div key={index} className="mb-2">
              <div className="flex justify-between mt-3">
                <label className="font-semibold mb-2 block">Title of Paragraph {index + 1}</label>
                {index > 0 && (
                  <svg className="remove-paragraph cursor-pointer w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" onClick={() => removeParagraph(index)}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </div>

              <input type="text" name="titleofpara" placeholder="Enter Title for the paragraph" className="border rounded px-4 py-2 w-full" value={paragraph.titleofpara} onChange={(e) => handleParagraphChange(index, e)} required={paragraph.required} />

              <label className="font-semibold mb-2 block">Content of Paragraph</label>
              <textarea name="contentofpara" placeholder="Enter content for the paragraph" className="border  rounded px-4 py-2 w-full h-24" value={paragraph.contentofpara} onChange={(e) => handleParagraphChange(index, e)} required={paragraph.required}></textarea>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center ml-2">
          <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
export default React.memo(CreateBlog);
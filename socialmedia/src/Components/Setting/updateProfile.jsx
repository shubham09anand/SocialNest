import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import moment from "moment";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import noProfilePicture from '../../Assets/NoProileImage.png';

const UpdateProfile = () => {

  const userId = useSelector((state) => state.LoginSlice.loggedUserId);

  const [userProfile, setuserProfile] = useState("");
  const [newProfilePhoto, setNewProfilePhoto] = useState();

  const [backGroundPhoto, setBackGroundPhoto] = useState();
  const [newBackGroundPhoto, setNewBackGroundPhoto] = useState();

  const [imageBuffer, setImageBUffer] = useState(null);
  const [backGroundImageBuffer, setBackGroundImageBuffer] = useState(null);

  if (newProfilePhoto) {
    if (!newProfilePhoto.type.startsWith('image/')) {
      toast.warning("Please select only image files.");
    }
    else {
      const reader = new FileReader();
      reader.onload = function (event) {
        const base64String = event.target.result;
        setImageBUffer(base64String);
      };
      reader.readAsDataURL(newProfilePhoto);
    }
  }

  if (newBackGroundPhoto) {
    if (!newBackGroundPhoto.type.startsWith('image/')) {
      toast.warning("Please select only image files.");
    }
    else {
      const reader = new FileReader();
      reader.onload = function (event) {
        const base64String = event.target.result;
        setBackGroundImageBuffer(base64String);
      };
      reader.readAsDataURL(newBackGroundPhoto);
    }
  }

  const [foreceReload, setforeceReload] = useState(false);
  const [profilePhoto, setprofilePhoto] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [birthday, setBirthday] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [youare, setYouare] = useState("");
  const [studied, setStudied] = useState("");
  const [description, setDescription] = useState("");


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://127.0.0.1:8080/auth/getUserProfile", { userId: userId });
        // console.log(response.status);
        setuserProfile(response.data);

        if (response.data.userProfile1) {
          setFirstName(response.data.userProfile1.firstName);
          setLastName(response.data.userProfile1.lastName);
          setUserName(response.data.userProfile1.userName);
        }

        if (response.data.userProfile2 !== null) {
          setBirthday(moment(response.data.userProfile2.dateOfBirth).format("DD-MM-YYYY"));
          setPhone(response.data.userProfile2.phoneNumber);
          setCity(response.data.userProfile2.city);
          setState(response.data.userProfile2.state);
          setCountry(response.data.userProfile2.country);
          setYouare(response.data.userProfile2.youAre);
          setStudied(response.data.userProfile2.studiedAt);
          setDescription(response.data.userProfile2.description);
        }

      } catch (error) {
        toast.error("Something Went Wrong");
        console.error("Error fetching user profile:", error);
      }
    };
    fetchData();
  }, [userId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = {
      profilePhoto: imageBuffer == null ? userProfile?.userProfile2?.profilePhoto : imageBuffer,
      backGroundPhoto: backGroundImageBuffer == null ? userProfile?.userProfile2?.backGroundPhoto : backGroundImageBuffer,
      userId: userId,
      firstName: firstName,
      lastName: lastName,
      userName: userName,
      phoneNumber: phone,
      dateOfBirth: moment(birthday, "DD-MM-YYYY").toISOString(),
      city: city,
      state: state,
      country: country,
      youAre: youare,
      studiedAt: studied,
      description: description,
    };
    axios.post("http://127.0.0.1:8080/auth/updateProfile", updatedData)
      .then((res) => {
        toast.success("Your Profile Has Been Updated");
        setforeceReload(true)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // console.log(userProfile);

  return (
    <>
      <ToastContainer />
      {userProfile ? (
        <form className="border-l w-full xl:w-[80%] xl:p-2 xl:absolute right-0 -z-10" onSubmit={handleSubmit}>
          <div className='text-3xl font-bold mb-2 md:mb-0 pt-2 pl-4 pr-4'>Edit Profile</div>
          <div className="flex md:gap-8 gap-4 pb-5 items-center md:p-8 md:pt-4 p-6 md:pb-4 border-b space-x-5">
            <div className="relative md:w-20 md:h-20 w-20 h-20 shrink-0">
              <label htmlFor="file" className="cursor-pointer">
                {
                  !userProfile?.userProfile2 && imageBuffer === null ? (
                    <><img src={noProfilePicture} className="object-cover w-20 h-20 rounded-full" alt="" /></>
                  ) : (
                    imageBuffer === null ? (
                      <img src={userProfile?.userProfile2?.profilePhoto} className="object-cover w-20 h-20 rounded-full" alt="" />
                    ) : (
                      <img src={imageBuffer} className="object-cover w-20 h-20 rounded-full" alt="" />
                    )
                  )
                }
                <input onChange={(e) => { const file = e.target.files[0]; setprofilePhoto(URL.createObjectURL(file)); setNewProfilePhoto(e.target.files[0]) }} accept="image/*" type="file" id="file" className="hidden" />
                <div className="font-extrabold mx-auto w-fit">profile</div>
              </label>

              <label htmlFor="file" className="md:p-1 p-0.5 rounded-full bg-slate-600 border-4 border-white absolute -bottom-2 -right-2 cursor-pointer dark:border-slate-700">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="md:w-4 md:h-4 w-5 h-5 fill-white">
                  <path d="M12 9a3.75 3.75 0 100 7.5A3.75 3.75 0 0012 9z"></path>
                  <path fillRule="evenodd" d="M9.344 3.071a49.52 49.52 0 015.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 01-3 3h-15a3 3 0 01-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 001.11-.71l.822-1.315a2.942 2.942 0 012.332-1.39zM6.75 12.75a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0zm12-1.5a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" ></path>
                </svg>
                <input accept="image/*" id="file" type="file" className="hidden" />
              </label>
            </div>

            {/* background photo */}
            <div className="relative md:w-20 md:h-20 w-20 h-20 shrink-0">
              <label htmlFor="file1" className="cursor-pointer">
                {
                  !userProfile?.userProfile2 && backGroundImageBuffer === null ? (
                    <><img src={noProfilePicture} className="object-cover w-20 h-20 rounded-full" alt="" /></>
                  ) : (
                    backGroundImageBuffer === null ? (
                      <img src={userProfile?.userProfile2?.backGroundPhoto || noProfilePicture} className="object-cover w-20 h-20 rounded-full" alt="" />
                    ) : (
                      <img src={backGroundImageBuffer} className="object-cover w-20 h-20 rounded-full" alt="" />
                    )
                  )
                }
                <input onChange={(e) => { const file = e.target.files[0]; setBackGroundPhoto(URL.createObjectURL(file)); setNewBackGroundPhoto(e.target.files[0]) }} accept="image/*" type="file" id="file1" className="hidden" />
                <div className="font-extrabold mx-auto w-fit">background</div>
              </label>

              <label htmlFor="file1" className="md:p-1 p-0.5 rounded-full bg-slate-600 border-4 border-white absolute -bottom-2 -right-2 cursor-pointer dark:border-slate-700">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="md:w-4 md:h-4 w-5 h-5 fill-white">
                  <path d="M12 9a3.75 3.75 0 100 7.5A3.75 3.75 0 0012 9z"></path>
                  <path fillRule="evenodd" d="M9.344 3.071a49.52 49.52 0 015.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 01-3 3h-15a3 3 0 01-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 001.11-.71l.822-1.315a2.942 2.942 0 012.332-1.39zM6.75 12.75a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0zm12-1.5a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" ></path>
                </svg>
                <input id="file1" type="file" className="hidden" />
              </label>
            </div>

            <div className="flex-1">
              <h3 className="md:text-xl text-base font-semibold text-black dark:text-white">{firstName}{" "}{lastName}</h3>
              <p className="text-sm text-blue-600 mt-1 font-normal">{userName}</p>
            </div>
          </div>

          <div className="flex items-center justify-center w-full">
            <div className="bg-white w-full p-4 px-4 md:p-8 mb-6 space-y-2">

              <div className="w-full sm:flex sm:space-x-10">
                <div className="w-full">
                  <label htmlFor="Fname"> First Name <span className="text-red-700">*</span></label>
                  <input onChange={(e) => setFirstName(e.target.value)} value={firstName} type="text" name="Fname" id="Fname" className="h-10 border mt-1 rounded px-2 sm:px-4 w-full bg-gray-50 outline-none focus:border-black" placeholder="Jhon" required />
                </div>

                <div className="w-full">
                  <label htmlFor="Lname"> Last Name <span className="text-red-700">*</span></label>
                  <input onChange={(e) => setLastName(e.target.value)} value={lastName} type="text" name="Lname" id="Lname" className="h-10 border mt-1 rounded px-2 sm:px-4 w-full bg-gray-50 outline-none focus:border-black" placeholder="Patrik" required />
                </div>
              </div>

              <div className="w-full sm:flex sm:space-x-10">
                <div className="w-full">
                  <label htmlFor="phone">Phone <span className="text-[10px] font-semibold">(only digits)</span></label>
                  <input onChange={(e) => setPhone(e.target.value)} value={phone} type="text" maxLength="10" name="phone" id="phone" pattern="[0-9]*" className="h-10 border mt-1 rounded px-2 sm:px-4 w-full bg-gray-50 outline-none focus:border-black" placeholder="7623569909" />
                </div>

                <div className="w-full">
                  <label htmlFor="birthday"> Birth Day <span className="text-[10px] font-semibold">(DD-MM-YYYY)</span> <span className="text-red-700">*</span></label>
                  <input onChange={(e) => setBirthday(e.target.value)} value={birthday} type="text" name="birthday" id="birthday" className="h-10 border mt-1 rounded px-2 sm:px-4 w-full bg-gray-50 outline-none focus:border-black" required placeholder="DD-MM-YYYY" pattern="\d{2}-\d{2}-\d{4}" />
                </div>
              </div>

              <div className="sm:flex sm:space-x-5 w-full justify-between">
                <div className="w-full">
                  <label htmlFor="city">City</label>
                  <input onChange={(e) => setCity(e.target.value)} value={city} type="text" name="city" id="city" className="h-10 border mt-1 rounded px-2 sm:px-4 w-full bg-gray-50 outline-none focus:border-black" placeholder="City" />
                </div>

                <div className="w-full">
                  <label htmlFor="address">State</label>
                  <input onChange={(e) => setState(e.target.value)} value={state} type="text" name="address" id="address" className="h-10 border mt-1 rounded px-2 sm:px-4 w-full bg-gray-50 outline-none focus:border-black" placeholder="State" />
                </div>

                <div className="w-full">
                  <label htmlFor="country">Country</label>
                  <div className="h-10 bg-gray-50 outline-none focus:border-black flex border border-gray-200 rounded items-center mt-1"> <input onChange={(e) => setCountry(e.target.value)} value={country} name="country" id="country" placeholder="Country" className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent" />
                  </div>
                </div>
              </div>

              <div className="w-full">
                <div className="w-full">
                  <label htmlFor="youare"> You Are <span className="text-red-700">*</span></label>
                  <input onChange={(e) => setYouare(e.target.value)} value={youare} type="text" name="youare" id="youare" className="h-10 border mt-1 rounded px-2 sm:px-4 w-full bg-gray-50 outline-none focus:border-black" placeholder="Profess..." required />
                </div>

                <div className="w-full mt-1">
                  <label htmlFor="studied"> Studied At</label>
                  <input onChange={(e) => setStudied(e.target.value)} value={studied} type="text" name="studied" id="studied" className="h-10 border mt-1 rounded px-2 sm:px-4 w-full bg-gray-50 outline-none focus:border-black" placeholder="Collage" />
                </div>
              </div>

              <div className="">
                <label htmlFor="zipcode">Description <span className="text-red-700">*</span></label>
                <textarea onChange={(e) => setDescription(e.target.value)} value={description} type="text" name="zipcode" id="zipcode" className="transition-all flex items-center py-2 resize-none h-24 border mt-1 rounded px-2 sm:px-4 w-full bg-gray-50 outline-none focus:border-black" placeholder="" required />
              </div>

              <input type="submit" className="cursor-pointer active:opacity-75 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded" value="Save Changes" />

            </div>
          </div>
        </form>
      ) : (<div className="text-base font-semibold text-center pt-20">Something Went Wrong Please Try Again Later!!! Server Error</div>)}
    </>
  );
};

export default React.memo(UpdateProfile);

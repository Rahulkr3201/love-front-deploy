import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constant.js";
import { addUser } from "../utils/userSlice.js";
const EditProfile = ({ user }) => {
  const [firstName, setfirstName] = useState(user.firstName);
  const [lastName, setlastName] = useState(user.lastName);
  const [photoUrl, setphotoUrl] = useState(user.photoUrl);
  const [age, setage] = useState(user.age || " ");
  const [gender, setgender] = useState(user.gender || " ");
  const [about, setabout] = useState(user.about);
  const [skills, setSkills] = useState(user.skills || "");
  const [error, seterror] = useState("");
  const dispatch = useDispatch();
  const [showToast, setshowToast] = useState(false);

  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          gender,
          age,
          about,
          skills,
        },
        { withCredentials: true }
      );
      setshowToast(true);
      setTimeout(() => {
        setshowToast(false);
      }, 3000);

      dispatch(addUser(res.data.data));
    } catch (err) {
      seterror(err.message);
    }
  };

  return (
    <>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile Saved Successfuly</span>
          </div>
        </div>
      )}
      <div className=" flex justify-evenly -scroll my-12">
        <div className="card bg-base-300 w-1/3 shadow-xl ">
          <div className="card-body w-3/4">
            <h2 className="card-title text-3xl">Edit Profile </h2>
            <div className="m-2">
              <label className="text-sm ml-16">FirstName:</label>
              <input
                type="text"
                value={firstName}
                placeholder="First Name "
                className=" ml-16 card bg-base-100 input input-ghost w-full max-w-xs border-blue-400"
                onChange={(e) => setfirstName(e.target.value)}
              />
              <label className="text-sm ml-16 ">LastName:</label>
              <input
                type="text"
                value={lastName}
                placeholder="Last Name"
                className=" ml-16 card bg-base-100 input input-ghost w-full max-w-xs border-blue-400"
                onChange={(e) => setlastName(e.target.value)}
              />
              <label className="text-sm ml-16">PhotoUrl:</label>
              <input
                type="text"
                value={photoUrl}
                placeholder="photoUrl"
                className=" ml-16  card bg-base-100 input input-ghost w-full max-w-xs border-blue-400"
                onChange={(e) => setphotoUrl(e.target.value)}
              />
              <label className="text-sm ml-16">Age:</label>
              <input
                type="text"
                value={age}
                placeholder="Age "
                className=" ml-16 card bg-base-100 input input-ghost w-full max-w-xs border-blue-400"
                onChange={(e) => setage(e.target.value)}
              />
              <label className="text-sm ml-16">Gender:</label>
              <input
                type="text"
                value={gender}
                placeholder="Gender"
                className=" ml-16  card bg-base-100 input input-ghost w-full max-w-xs border-blue-400"
                onChange={(e) => setgender(e.target.value)}
              />
              <label className="text-sm ml-16">About:</label>
              <textarea
                value={about}
                className="textarea textarea-info ml-16 w-full h-12 "
                placeholder="skills"
                onChange={(e) => setabout(e.target.value)}
              ></textarea>
              <label className="text-sm ml-16">Skills:</label>
              <textarea
                value={skills}
                className="textarea textarea-info ml-16 w-full h-12 "
                placeholder="skills"
                onChange={(e) => setSkills(e.target.value)}
              ></textarea>
            </div>
            <div className="card-actions mx-44">
              <button className=" btn btn-success " onClick={saveProfile}>
                Save Profile
              </button>
            </div>
          </div>
        </div>
        <div>
          <UserCard
            user={{ firstName, lastName, photoUrl, gender, age, about, skills }}
          />
        </div>
      </div>
    </>
  );
};

export default EditProfile;

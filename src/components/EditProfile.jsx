import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constant.js";
import { addUser } from "../utils/userSlice.js";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age || " ");
  const [gender, setGender] = useState(user.gender || " ");
  const [about, setAbout] = useState(user.about);
  const [skills, setSkills] = useState(user.skills || "");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

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
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);

      dispatch(addUser(res.data.data));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      {showToast && (
        <div className="alert alert-success fixed top-4 left-1/2 transform -translate-x-1/2 w-3/4 sm:w-1/3 z-50">
          <span>Profile Saved Successfully</span>
        </div>
      )}
      <div className="flex justify-center p-6 mb-12">
        <div className="card bg-white w-full sm:w-1/3 shadow-lg mx-5 rounded-xl p-4">
          <div className="card-body">
            <h2 className="card-title text-3xl font-semibold text-gray-800 mb-4">
              Edit Profile
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">
                  First Name:
                </label>
                <input
                  type="text"
                  value={firstName}
                  placeholder="First Name"
                  className="input input-bordered w-full border-gray-300 focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">
                  Last Name:
                </label>
                <input
                  type="text"
                  value={lastName}
                  placeholder="Last Name"
                  className="input input-bordered w-full border-gray-300 focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">
                  Photo URL:
                </label>
                <input
                  type="text"
                  value={photoUrl}
                  placeholder="Photo URL"
                  className="input input-bordered w-full border-gray-300 focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">
                  Age:
                </label>
                <input
                  type="text"
                  value={age}
                  placeholder="Age"
                  className="input input-bordered w-full border-gray-300 focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">
                  Gender:
                </label>
                <input
                  type="text"
                  value={gender}
                  placeholder="Gender"
                  className="input input-bordered w-full border-gray-300 focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setGender(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">
                  About:
                </label>
                <textarea
                  value={about}
                  className="textarea textarea-bordered w-full h-24 border-gray-300 focus:ring-2 focus:ring-blue-500"
                  placeholder="About"
                  onChange={(e) => setAbout(e.target.value)}
                ></textarea>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">
                  Skills:
                </label>
                <textarea
                  value={skills}
                  className="textarea textarea-bordered w-full h-24 border-gray-300 focus:ring-2 focus:ring-blue-500"
                  placeholder="Skills"
                  onChange={(e) => setSkills(e.target.value)}
                ></textarea>
              </div>
            </div>

            <div className="card-actions justify-center mt-6">
              <button
                className="btn btn-primary w-full py-2 rounded-lg text-white hover:bg-blue-600 transition-all"
                onClick={saveProfile}
              >
                Save Profile
              </button>
            </div>
          </div>
        </div>

        <div className="ml-6">
          <UserCard
            user={{ firstName, lastName, photoUrl, gender, age, about, skills }}
          />
        </div>
      </div>
    </>
  );
};

export default EditProfile;

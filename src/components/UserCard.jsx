import { BASE_URL } from "../utils/constant.js";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice.js";
import { motion } from "framer-motion";
import { FaUserTimes, FaUserCheck } from "react-icons/fa";

const UserCard = ({ user, showActions = true }) => {
  const dispatch = useDispatch();
  const { _id, firstName, lastName, photoUrl, gender, age, about, skills } =
    user;

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <motion.div
      className="flex justify-center items-center"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="card bg-white w-80 mt-1 mb-28 shadow-xl rounded-2xl overflow-hidden relative">
        <div className="absolute inset-0 bg-black opacity-20"></div>{" "}
        {/* Background with opacity */}
        <figure className="h-56 overflow-hidden">
          <img
            src={photoUrl}
            alt="user"
            className="w-full h-full object-cover"
          />
        </figure>
        <div className="card-body p-2 text-black relative z-10">
          {" "}
          {/* Make sure content is above the background */}
          <h2 className="card-title text-xl font-semibold text-black">
            {firstName} {lastName}
          </h2>
          {age && gender && (
            <p className="text-sm text-black">{`${age}, ${gender}`}</p>
          )}
          <p className="text-black ">{about}</p>
          <p className="text-sm text-black ">{skills}</p>
          {showActions && ( // Conditionally show actions
            <div className="card-actions justify-between my-4">
              <motion.button
                className="btn btn-primary flex items-center justify-center px-6 py-2 rounded-full text-black hover:bg-red-600 transition"
                onClick={() => handleSendRequest("ignored", _id)}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FaUserTimes className="mr-2" />
                <span className="text-white">Ignore</span>
              </motion.button>
              <motion.button
                className="btn btn-secondary flex items-center justify-center px-6 py-2 rounded-full text-black hover:bg-green-600 transition"
                onClick={() => handleSendRequest("interested", _id)}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FaUserCheck className="mr-2" />
                <span className="text-white">Interested</span>
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default UserCard;

import axios from "axios";
import { BASE_URL } from "../utils/constant.js";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice.js";
import { motion } from "framer-motion";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const Request = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      const res = axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.log(err);
    }
  };

  const fetchRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequest(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  if (!requests) return;
  if (requests.length === 0)
    return (
      <div className="toast toast-top toast-center mt-2">
        <div className="btn btn-primary flex justify-center">
          <span>No Pending Request....</span>
        </div>
      </div>
    );

  return (
    <div className=" py-2">
      <div className="w-full mb-3 text-center">
        <div className="btn btn-primary font-semibold text-gray-800">
          Requests
        </div>
      </div>

      {requests.map((request) => {
        const {
          _id,
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
          skills,
        } = request.fromUserId;

        return (
          <motion.div
            key={_id}
            className="max-w-3xl mx-auto  flex flex-col md:flex-row items-center bg-gray-300 rounded-xl shadow-lg  space-y-2 md:space-y-0 md:space-x-6 hover:shadow-xl transition-shadow duration-300"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              alt="photo"
              className="w-20 h-20 rounded-full object-cover"
              src={photoUrl}
            />
            <div className="flex-1">
              <h1 className="text-2xl font-semibold text-gray-800">
                {firstName} {lastName}
              </h1>
              <p className="text-sm text-gray-500 ">
                {age} years old | {gender}
              </p>
              <p className=" text-gray-700">{about}</p>
              <p className=" text-sm italic text-gray-400">{skills}</p>
            </div>
            <div className="flex space-x-4 md:mt-0">
              <motion.button
                className="btn btn-danger flex items-center justify-center px-6 py-2 rounded-full text-white bg-primary hover:bg-red-700 transition-all"
                onClick={() => reviewRequest("rejected", request._id)}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FaTimesCircle className="mr-2" />
                Reject
              </motion.button>
              <motion.button
                className="btn btn-secondary flex items-center justify-center px-6 py-2 rounded-full text-white bg-pink-500 hover:bg-green-700 transition-all"
                onClick={() => reviewRequest("accepted", request._id)}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FaCheckCircle className="mr-2" />
                Accept
              </motion.button>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default Request;

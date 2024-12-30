import NavBar from "./NavBar";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constant.js";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice.js";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login");
      }
      console.log(err);
    }
  };

  useEffect(() => {
    if (!userData) {
      fetchUser();
    }
  }, []);

  // if (!userData) {
  //   return (
  //     <motion.div
  //       className="flex flex-col items-center justify-center h-screen bg-gradient-to-t from-purple-400 to-pink-300"
  //       initial={{ opacity: 0 }}
  //       animate={{ opacity: 1 }}
  //       transition={{ duration: 0.5 }}
  //     >
  //       <AiOutlineLoading3Quarters className="text-6xl text-blue-500 animate-spin" />
  //       <p className="mt-4 text-lg text-gray-700">Loading...</p>
  //     </motion.div>
  //   );
  // }

  return (
    <motion.div
      className="min-h-screen flex flex-col bg-gradient-to-t from-purple-500 to-pink-400 "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <NavBar />
      <motion.main
        className="flex-grow "
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Outlet />
      </motion.main>
      {/* Add Footer here if needed */}
    </motion.div>
  );
};

export default Body;

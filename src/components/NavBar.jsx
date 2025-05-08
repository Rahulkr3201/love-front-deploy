import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant.js";
import axios from "axios";
import { removeUser } from "../utils/userSlice.js";
import {
  FaHome,
  FaUserCircle,
  FaSignOutAlt,
  FaUsers,
  FaUserPlus,
} from "react-icons/fa";
import { motion } from "framer-motion";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const handleLogOut = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <motion.div
      className="navbar bg-gradient-to-br from-rose-300 to-pink-600 bg-cover bg-center relative z-50 shadow-lg p-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-md  z-0"></div>

      {/* Navbar content */}
      <div className="relative z-10 flex justify-between items-center w-full max-w-7xl mx-auto">
        {/* Left Section */}
        <div className="flex items-center space-x-7">
          <Link to="/" className="flex items-center space-x-2">
            <p className="text-4xl font-extrabold text-white drop-shadow-md">
              Dev
            </p>
            <p className="text-4xl font-extrabold text-white drop-shadow-md">
              Tinder
            </p>
          </Link>
          {user && (
            <Link
              to="/"
              className=" px-5 py-2  bg-pink-500 hover:bg-pink-600 text-white rounded-full flex items-center space-x-2 shadow-md transition"
            >
              <FaHome />
              <span>Home</span>
            </Link>
          )}
        </div>

        {/* Right Section */}
        {user && (
          <div className="dropdown dropdown-end">
            <div className="flex items-center space-x-3 cursor-pointer">
              <p className="text-white font-semibold hidden sm:block">
                {user.firstName} {user.lastName}
              </p>
              <motion.div
                className="btn btn-ghost btn-circle avatar"
                whileHover={{ scale: 1.1 }}
                tabIndex={0}
              >
                <div className="w-10 rounded-full ring ring-pink-400 ring-offset-base-100 ring-offset-2 bg-white">
                  <img alt="user avatar" src={user.photoUrl} />
                </div>
              </motion.div>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 mt-2 bg-white bg-opacity-90 backdrop-blur-xl rounded-box w-52 space-y-2 shadow-xl z-50"
            >
              <li>
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 text-pink-700 hover:bg-pink-100 rounded-lg p-2"
                >
                  <FaUserCircle />
                  <span>Profile</span>
                  <span className="badge badge-secondary">New</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/connections"
                  className="flex items-center space-x-2 text-pink-700 hover:bg-pink-100 rounded-lg p-2"
                >
                  <FaUsers />
                  <span>Connections</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/request"
                  className="flex items-center space-x-2 text-pink-700 hover:bg-pink-100 rounded-lg p-2"
                >
                  <FaUserPlus />
                  <span>Pending Requests</span>
                </Link>
              </li>
              <li>
                <motion.a
                  onClick={handleLogOut}
                  className="flex items-center space-x-2 text-red-600 hover:bg-red-100 rounded-lg p-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </motion.a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default NavBar;

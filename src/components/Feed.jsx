import axios from "axios";
import { BASE_URL } from "../utils/constant.js";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice.js";
import { useEffect } from "react";
import UserCard from "./UserCard";
import { motion } from "framer-motion";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return;
  if (feed.length === 0)
    return (
      <>
        <p className="btn btn-primary flex justify-center text-xl">
          No User Found...
        </p>
      </>
    );

  return (
    <div className="flex flex-col md:flex-row justify-center items-start gap-6 mt-8">
      {/* Center Section for Current User */}
      <div className="flex justify-center w-full md:w-2/3">
        <UserCard user={feed[0]} showActions={true} />
      </div>

      {/* Right Section for Upcoming Users */}
      <div className="w-10 md:w-1/5 flex flex-col space-y-3 overflow-y-auto max-h-[500px] p-3  rounded-lg ">
        <h3 className="text-2xl font-bold text-black text-center">
          Upcoming Users
        </h3>
        {feed.slice(1).map((user, index) => (
          <motion.div
            key={user._id}
            className="p-1 bg-white rounded-lg shadow-md transform scale-90"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.6,
              delay: index * 0.2,
              ease: "easeOut",
            }}
          >
            <UserCard user={user} showActions={false} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Feed;

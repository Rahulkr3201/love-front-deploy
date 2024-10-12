import axios from "axios";
import { BASE_URL } from "../utils/constant.js";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice.js";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  // console.log(feed);
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
    <>
      {feed && (
        <div className="flex justify-center ">
          <UserCard user={feed[0]} />
        </div>
      )}
    </>
  );
};

export default Feed;

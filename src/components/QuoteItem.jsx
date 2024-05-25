import moment from "moment";
import toast from "react-hot-toast";
import { FaBookmark, FaHeart, FaRegBookmark, FaRegHeart } from "react-icons/fa";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { actionDeleteQuote } from "../redux/features/quoteSlice";
import {
  actionLikeQuote,
  actionSaveQuote,
} from "../redux/features/utilitySlice";
import { highlightText } from "../utils";
const QuoteItem = ({ data, actions, query }) => {
  const { user } = useSelector((state) => state.user);
  const { saved, likes } = useSelector((state) => state.utility);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(actionDeleteQuote(data._id))
      .unwrap()
      .then((data) => {
        toast.success(data.message);
      })
      .catch((err) => {
        toast.error("Failed to delete a quote:");
        console.error("Failed to delete a quote:", err);
      });
  };

  const isSaved = saved.some((quote) => quote._id === data._id);
  const isLiked = likes.some((quote) => quote === data._id);

  const toggleSave = () => {
    if (user) {
      dispatch(actionSaveQuote(data._id));
    } else {
      toast.error("Please login to save");
    }
  };
  const toggleLike = () => {
    if (user) {
      dispatch(actionLikeQuote(data._id));
    } else {
      toast.error("Please login to like");
    }
  };
  const handleShareClick = () => {
    if (navigator.share) {
      navigator
        .share({
          title: data.title,
          text: data.title,
          url: `${window.location.origin}/quote/detail/${data._id}`,
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.error("Error sharing:", error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      alert("Sorry, your browser does not support sharing.");
    }
  };
  return (
    <div className="card">
      <Link to={`/quote/detail/${data._id}`}>
        <h4 className="font-semibold mb-1 leading-5" title={data.title}>
          {highlightText(data.title, query)}
        </h4>
        <p className="text-sm mb-1">{highlightText(data.description, query)}</p>
      </Link>
      <Link
        to={`/quote/author/${data.author._id}`}
        className="text-xs font-semibold"
      >
        by {data.author.name}
      </Link>
      <div className="text-xs">
        {moment(new Date(data._createdAt)).fromNow()}
      </div>
      <div className="flex gap-4 text-sm pt-3">
        <button className="flex gap-1 items-center" onClick={toggleLike}>
          {data.likes.length}
          {isLiked ? (
            <>
              <FaHeart color="red" /> Liked
            </>
          ) : (
            <>
              <FaRegHeart /> Like
            </>
          )}
        </button>
        <button className="flex gap-1 items-center" onClick={toggleSave}>
          {isSaved ? (
            <>
              <FaBookmark /> Saved
            </>
          ) : (
            <>
              <FaRegBookmark /> Save
            </>
          )}
        </button>
        <button className="flex gap-1 items-center" onClick={handleShareClick}>
          <FaRegShareFromSquare /> Share
        </button>
      </div>
      {actions && (
        <div className="flex gap-3 mt-3">
          <Link to={`/quote/update/${data._id}`} className="btn btn-sm">
            Update
          </Link>
          <button className="btn btn-sm !bg-red-600" onClick={handleDelete}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};
export default QuoteItem;

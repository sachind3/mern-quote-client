import moment from "moment";
import toast from "react-hot-toast";
import { FaRegHeart } from "react-icons/fa";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { actionDeleteQuote } from "../redux/features/quoteSlice";
const QuoteItem = ({ data, actions }) => {
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
  return (
    <div className="card">
      <Link to={`/quote/detail/${data._id}`}>
        <h4 className="font-semibold mb-1 leading-5" title={data.title}>
          {data.title}
        </h4>
        <p className="text-sm mb-1">{data.description}</p>
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
        <div className="flex gap-1 items-center">
          <FaRegHeart /> Like
        </div>
        <div className="flex gap-1 items-center">
          <FaRegShareFromSquare /> Share
        </div>
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

import { Link } from "react-router-dom";
import moment from "moment";
import { useDispatch } from "react-redux";
import { actionDeleteQuote } from "../redux/features/quoteSlice";
import toast from "react-hot-toast";
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
        <div className="text-sm font-semibold">{data.author.name}</div>
        <div className="text-xs">
          {moment(new Date(data._createdAt)).fromNow()}
        </div>
      </Link>
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

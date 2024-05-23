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
    <div className="qItem">
      <Link to={`/quote/detail/${data._id}`}>
        <h4>{data.title}</h4>
        <p>{data.description}</p>
        <h5>{data.author.name}</h5>
        <span>{moment(new Date(data._createdAt)).fromNow()}</span>
      </Link>
      {actions && (
        <div className="actions">
          <Link to={`/quote/update/${data._id}`} className="btn btn-outline">
            Update
          </Link>
          <button className="btn btn-danger" onClick={handleDelete}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};
export default QuoteItem;

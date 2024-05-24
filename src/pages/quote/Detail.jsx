import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { actionGetSingleQuote } from "../../redux/features/quoteSlice";
import moment from "moment";
import LazyQuoteItem from "../../components/lazy/LazyQuoteItem";

const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [singleQuote, setSingleQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (id) {
      setLoading(true);
      dispatch(actionGetSingleQuote(id))
        .unwrap()
        .then((data) => {
          setSingleQuote(data.result);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch:", err);
        });
    }
  }, [dispatch, id]);
  if (loading) {
    return (
      <div>
        <LazyQuoteItem />
      </div>
    );
  }
  if (singleQuote) {
    return (
      <div className="card">
        <h4 className="text-xl font-semibold mb-1">{singleQuote.title}</h4>
        <p className="mb-1">{singleQuote.description}</p>
        <div className="text-sm font-semibold">{singleQuote.author.name}</div>
        <div className="text-xs">
          {moment(new Date(singleQuote._createdAt)).fromNow()}
        </div>
      </div>
    );
  }
};
export default Detail;

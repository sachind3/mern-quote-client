import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { actionGetSingleQuote } from "../../redux/features/quoteSlice";
import moment from "moment";

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
    return <div>loading ...</div>;
  }
  if (singleQuote) {
    return (
      <div className="detailPage">
        <h4>{singleQuote.title}</h4>
        <p>{singleQuote.description}</p>
        <h5>{singleQuote.author.name}</h5>
        <span>{moment(new Date(singleQuote._createdAt)).fromNow()}</span>
      </div>
    );
  }
};
export default Detail;

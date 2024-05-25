import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { actionGetSingleQuote } from "../../redux/features/quoteSlice";
import moment from "moment";
import LazyQuoteItem from "../../components/lazy/LazyQuoteItem";
import { Helmet } from "react-helmet";

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
      <>
        <Helmet>
          <title>{singleQuote.title} | QuoteHub</title>
          <meta name="description" content={singleQuote.description} />
        </Helmet>
        <div className="card">
          <h4 className="text-xl font-semibold mb-1">{singleQuote.title}</h4>
          <p className="mb-1">{singleQuote.description}</p>
          <Link
            to={`/quote/author/${singleQuote.author._id}`}
            className="text-sm font-semibold"
          >
            by {singleQuote.author.name}
          </Link>
          <div className="text-xs">
            {moment(new Date(singleQuote._createdAt)).fromNow()}
          </div>
        </div>
      </>
    );
  }
};
export default Detail;

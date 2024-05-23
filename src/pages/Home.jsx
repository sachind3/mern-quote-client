import { useSelector } from "react-redux";
import QuoteItem from "../components/QuoteItem";
import { Link } from "react-router-dom";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const Home = () => {
  const { isLoading, quotes } = useSelector((state) => state.quote);
  if (isLoading) {
    return <div>...loading</div>;
  }
  return (
    <div>
      {quotes.length ? (
        <>
          <ResponsiveMasonry>
            <Masonry gutter="1rem">
              {quotes.map((qt) => {
                return <QuoteItem key={qt._id} data={qt} />;
              })}
            </Masonry>
          </ResponsiveMasonry>
        </>
      ) : (
        <div className="infoMessageAlert">
          No quotes found, Please <Link to="/quote/create">click here</Link> to
          add a new quote.
        </div>
      )}
    </div>
  );
};
export default Home;

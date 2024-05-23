import { useSelector } from "react-redux";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Link } from "react-router-dom";
import QuoteItem from "../../components/QuoteItem";

const MyQuotes = () => {
  const { isLoading, userQuotes } = useSelector((state) => state.quote);
  if (isLoading) {
    return <div>...loading</div>;
  }
  return (
    <div>
      {userQuotes.length ? (
        <>
          <ResponsiveMasonry>
            <Masonry gutter="1rem">
              {userQuotes.map((qt) => {
                return <QuoteItem key={qt._id} data={qt} actions={true} />;
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
export default MyQuotes;

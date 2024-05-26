import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { actionSearchQuotes } from "../../redux/features/quoteSlice";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import LazyQuoteItem from "../../components/lazy/LazyQuoteItem";
import { AnimatePresence, motion } from "framer-motion";
import QuoteItem from "../../components/QuoteItem";
import { Helmet } from "react-helmet-async";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Search = () => {
  const dispatch = useDispatch();
  const query = useQuery().get("query");
  useEffect(() => {
    if (query) {
      dispatch(actionSearchQuotes(query));
    }
  }, [dispatch, query]);
  const { isLoading, searchQuotes } = useSelector((state) => state.quote);
  if (isLoading) {
    return (
      <div>
        <ResponsiveMasonry>
          <Masonry gutter="1rem">
            {Array.from({ length: 10 }).map((_, index) => (
              <React.Fragment key={index}>
                <LazyQuoteItem />
              </React.Fragment>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Search by {query} | QuoteHub</title>
        <link
          rel="canonical"
          href={`https://quote-client.sachindesai.in/quote/search?query=${query}`}
        />
      </Helmet>
      <h4 className="text-xl font-semibold mb-2">Search : {query}</h4>
      <div>
        {searchQuotes.length ? (
          <>
            <AnimatePresence>
              <ResponsiveMasonry>
                <Masonry gutter="1rem">
                  {searchQuotes.map((qt) => (
                    <motion.div
                      key={qt._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{
                        duration: 0.3,
                        delay: searchQuotes.indexOf(qt) * 0.1,
                      }}
                    >
                      <QuoteItem key={qt._id} data={qt} query={query} />
                    </motion.div>
                  ))}
                </Masonry>
              </ResponsiveMasonry>
            </AnimatePresence>
          </>
        ) : (
          <div className="infoMessageAlert">No quotes found.</div>
        )}
      </div>
    </>
  );
};
export default Search;

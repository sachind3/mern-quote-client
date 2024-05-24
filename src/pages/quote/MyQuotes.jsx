import React from "react";
import { useSelector } from "react-redux";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Link } from "react-router-dom";
import QuoteItem from "../../components/QuoteItem";
import LazyQuoteItem from "../../components/lazy/LazyQuoteItem";
import { AnimatePresence, motion } from "framer-motion";

const MyQuotes = () => {
  const { isLoading, userQuotes } = useSelector((state) => state.quote);
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
    <div>
      {userQuotes.length ? (
        <>
          <AnimatePresence>
            <ResponsiveMasonry>
              <Masonry gutter="1rem">
                {userQuotes.map((qt) => (
                  <motion.div
                    key={qt._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{
                      duration: 0.3,
                      delay: userQuotes.indexOf(qt) * 0.1,
                    }}
                  >
                    <QuoteItem key={qt._id} data={qt} actions={true} />
                  </motion.div>
                ))}
              </Masonry>
            </ResponsiveMasonry>
          </AnimatePresence>
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

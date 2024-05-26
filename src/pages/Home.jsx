import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useSelector } from "react-redux";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Link } from "react-router-dom";
import QuoteItem from "../components/QuoteItem";
import LazyQuoteItem from "../components/lazy/LazyQuoteItem";

const Home = () => {
  const { isLoading, quotes } = useSelector((state) => state.quote);
  if (isLoading) {
    return (
      <div>
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
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
      {quotes.length ? (
        <>
          <div className="border border-dotted py-2 mb-3 rounded-md bg-white/50 text-center">
            <h1 className="font-bold">Manage Your Quotes Seamlessly</h1>
            <p>
              Get inspired, share with friends, and let these words of wisdom
              brighten your day.
            </p>
          </div>
          <AnimatePresence>
            <ResponsiveMasonry>
              <Masonry gutter="1rem">
                {quotes.map((qt) => (
                  <motion.div
                    key={qt._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{
                      duration: 0.3,
                      delay: quotes.indexOf(qt) * 0.1,
                    }}
                  >
                    <QuoteItem data={qt} />
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
    </>
  );
};
export default Home;

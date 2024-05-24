import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useParams } from "react-router-dom";
import QuoteItem from "../../components/QuoteItem";
import LazyQuoteItem from "../../components/lazy/LazyQuoteItem";
import { actionAuthorQuotes } from "../../redux/features/quoteSlice";

const Author = () => {
  const dispatch = useDispatch();
  const { isLoading, authorQuotes } = useSelector((state) => state.quote);

  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    if (id) {
      if (authorQuotes?.author._id !== id) {
        dispatch(actionAuthorQuotes(id));
      }
    }
  }, [id, dispatch, authorQuotes]);
  if (isLoading) {
    return (
      <>
        <ResponsiveMasonry>
          <Masonry gutter="1rem">
            {Array.from({ length: 10 }).map((_, index) => (
              <React.Fragment key={index}>
                <LazyQuoteItem />
              </React.Fragment>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </>
    );
  }
  return (
    <>
      <h4 className="text-xl font-semibold mb-2">
        Author : {authorQuotes?.author.name}
      </h4>
      {authorQuotes?.quotes.length ? (
        <>
          <AnimatePresence>
            <ResponsiveMasonry>
              <Masonry gutter="1rem">
                {authorQuotes.quotes.map((qt) => (
                  <motion.div
                    key={qt._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{
                      duration: 0.3,
                      delay: authorQuotes.quotes.indexOf(qt) * 0.1,
                    }}
                  >
                    <QuoteItem key={qt._id} data={qt} />
                  </motion.div>
                ))}
              </Masonry>
            </ResponsiveMasonry>
          </AnimatePresence>
        </>
      ) : (
        <div className="infoMessageAlert">No quotes found.</div>
      )}
    </>
  );
};
export default Author;

import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useSelector } from "react-redux";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import QuoteItem from "../../components/QuoteItem";
import LazyQuoteItem from "../../components/lazy/LazyQuoteItem";

const Saved = () => {
  const { isLoading, saved } = useSelector((state) => state.utility);

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
      <h4 className="text-xl font-semibold mb-2">
        Saved quotes : {saved.length}
      </h4>
      {saved.length ? (
        <>
          <AnimatePresence>
            <ResponsiveMasonry>
              <Masonry gutter="1rem">
                {saved.map((qt) => (
                  <motion.div
                    key={qt._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{
                      duration: 0.3,
                      delay: saved.indexOf(qt) * 0.1,
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

export default Saved;

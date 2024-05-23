import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { actionUpdateQuote } from "../../redux/features/quoteSlice";

const Update = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userQuotes } = useSelector((state) => state.quote);
  const [quoteErr, serQuoteErr] = useState(false);
  const [quote, setQuote] = useState({
    title: "",
    description: "",
  });
  const [errors, setErrors] = useState({
    title: "",
    description: "",
  });
  useEffect(() => {
    if (id && userQuotes.length) {
      const findQt = userQuotes.find((item) => {
        return item._id === id;
      });
      if (findQt) {
        setQuote({
          title: findQt.title,
          description: findQt.description,
        });
      } else {
        serQuoteErr(true);
      }
    } else {
      serQuoteErr(true);
    }
  }, [id, userQuotes]);

  const validate = () => {
    let titleError = "";
    let descriptionError = "";
    if (!quote.title) {
      titleError = "title is required";
    }
    if (!quote.description) {
      descriptionError = "description is required";
    }
    if (titleError || descriptionError) {
      setErrors({ title: titleError, description: descriptionError });
      return false;
    }
    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (isValid) {
      setErrors({ title: "", description: "" });
      dispatch(actionUpdateQuote({ quote, id }))
        .unwrap()
        .then((data) => {
          toast.success(data.message);
          navigate("/quote/myquotes");
        })
        .catch((err) => {
          toast.error("Failed to update a quote:");
          console.error("Failed to update a quote:", err);
        });
    }
  };
  if (quoteErr) {
    return <div className="errorMessageAlert">Quote is not found!</div>;
  }
  return (
    <div className="quoteForm">
      <h3 className="fs-2 mb-2">Update a quote</h3>
      <form onSubmit={handleSubmit} className="mb-2">
        <div className="form-group mb-2">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="form-control"
            value={quote.title}
            onChange={(e) => setQuote({ ...quote, title: e.target.value })}
          />
          {errors.title && (
            <small className="text-danger">{errors.title}</small>
          )}
        </div>
        <div className="form-group mb-2">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            id="description"
            className="form-control"
            value={quote.description}
            onChange={(e) =>
              setQuote({ ...quote, description: e.target.value })
            }
          ></textarea>
          {errors.description && (
            <small className="text-danger">{errors.description}</small>
          )}
        </div>
        <button type="submit" className="btn btn-dark">
          Submit
        </button>
      </form>
    </div>
  );
};
export default Update;

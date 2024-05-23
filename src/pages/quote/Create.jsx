import { useState } from "react";
import { actionCreateQuote } from "../../redux/features/quoteSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Create = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [quote, setQuote] = useState({
    title: "",
    description: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    description: "",
  });
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
      dispatch(actionCreateQuote(quote))
        .unwrap()
        .then((data) => {
          toast.success(data.message);
          navigate("/quote/myquotes");
        })
        .catch((err) => {
          toast.error("Failed to create a quote:");
          console.error("Failed to create a quote:", err);
        });
    }
  };

  return (
    <div className="quoteForm">
      <h3 className="fs-2 mb-2">Add a quote</h3>
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
export default Create;

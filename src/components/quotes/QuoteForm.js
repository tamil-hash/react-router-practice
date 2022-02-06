import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Prompt, useHistory } from "react-router-dom";
import { PostNewQuote } from "../../actions";
import Card from "../UI/Card";
import classes from "./QuoteForm.module.css";

const QuoteForm = () => {
  const [isDataEntered, setIsDataEntered] = useState(false);
  const dispatch = useDispatch();
  const authorInputRef = useRef();
  const textInputRef = useRef();
  const history = useHistory();

  function submitFormHandler(event) {
    event.preventDefault();
    const enteredAuthor = authorInputRef.current.value;
    const enteredText = textInputRef.current.value;

    if (enteredAuthor !== "" && enteredText !== "") {
      dispatch(
        PostNewQuote({
          id: Date.now(),
          author: enteredAuthor,
          text: enteredText,
        })
      );

      authorInputRef.current.value = "";
      textInputRef.current.value = "";

      setTimeout(() => {
        history.push("/quotes");
      }, 3000);
    }
  }

  return (
    <>
      <Prompt
        when={isDataEntered}
        message={(location) => {
          console.log(location);
          return "Are you sure?";
        }}
      />
      <Card>
        <form
          onFocus={() => setIsDataEntered(true)}
          className={classes.form}
          onSubmit={submitFormHandler}
        >
          <div className={classes.control}>
            <label htmlFor="author">Author</label>
            <input type="text" id="author" ref={authorInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="text">Text</label>
            <textarea id="text" rows="5" ref={textInputRef}></textarea>
          </div>
          <div className={classes.actions}>
            <button onClick={() => setIsDataEntered(false)} className="btn">
              Add Quote
            </button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default QuoteForm;

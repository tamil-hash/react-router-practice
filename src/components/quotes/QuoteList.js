import QuoteItem from "./QuoteItem";
import classes from "./QuoteList.module.css";
import { useSelector } from "react-redux";
import NoQuotesFound from "../quotes/NoQuotesFound";
import { useHistory, useLocation } from "react-router-dom";

const sortQuotes = (quotes, ascending) => {
  const newQuotes = quotes.slice().sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id - quoteB.id;
    } else {
      return quoteB.id - quoteA.id;
    }
  });

  return newQuotes;
};

const QuoteList = () => {
  const history = useHistory();
  const location = useLocation();

  const quotes = useSelector((state) => state.quotes);

  const queryParams = new URLSearchParams(location.search);
  const isSortingAscending = queryParams.get("sort") === "asc";

  const sortedQuotes = sortQuotes(quotes, isSortingAscending);

  const changeSortingHandler = () => {
    history.push(`/quotes?sort=${isSortingAscending ? "desc" : "asc"}`);
  };

  if (sortedQuotes.length === 0) {
    return <NoQuotesFound />;
  }
  return (
    <>
      <div className={classes.sorting}>
        <button onClick={changeSortingHandler}>
          Sort {isSortingAscending ? "Descending" : "Ascending"}
        </button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </>
  );
};

export default QuoteList;

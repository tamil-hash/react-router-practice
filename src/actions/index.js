import { quotesActions } from "../store";

const url =
  "https://testing-firebase-558d8-default-rtdb.firebaseio.com/quotes.json";

export const fetchQuotes = () => {
  return async (dispatch) => {
    dispatch(quotesActions.setLoading(true));
    const response = await fetch(url);
    const data = await response.json();
    const quotes = [];
    for (const key in data) {
      quotes.push(data[key]);
    }
    dispatch(quotesActions.setQuotes(quotes));
    dispatch(quotesActions.setLoading(false));
  };
};

export const PostNewQuote = (newQuotes) => {
  return async (dispatch) => {
    dispatch(quotesActions.setLoading(true));
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(newQuotes),
    });
    console.log(response);
    dispatch(quotesActions.setQuotes(newQuotes));
    dispatch(quotesActions.setLoading(false));
  };
};

export const fetchSelectedQuote = (id) => {
  return async (dispatch) => {
    dispatch(quotesActions.setLoading(true));
    const response = await fetch(url);
    const data = await response.json();
    for (const key in data) {
      if (data[key].id === parseInt(id)) {
        dispatch(quotesActions.setSelectedQuote(data[key]));
      }
    }
    dispatch(quotesActions.setLoading(false));
  };
};

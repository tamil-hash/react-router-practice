import { useEffect } from "react";
import QuoteList from "../components/quotes/QuoteList";

import { fetchQuotes } from "../actions";
import { useSelector, useDispatch } from "react-redux";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const AllQuotes = () => {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.loading);
  useEffect(() => {
    dispatch(fetchQuotes());
  }, [dispatch]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return <QuoteList />;
};

export default AllQuotes;

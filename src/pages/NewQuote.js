import QuoteForm from "../components/quotes/QuoteForm";
import { useSelector } from "react-redux";
import LoadingSpinner from "../components/UI/LoadingSpinner";
const NewQuote = () => {
  const loading = useSelector((state) => state.loading);

  if (loading) {
    return <LoadingSpinner />;
  }
  return <QuoteForm />;
};

export default NewQuote;

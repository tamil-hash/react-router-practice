import { Fragment, useEffect } from "react";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import { useDispatch } from "react-redux";
import { fetchSelectedQuote } from "../actions";
import { useParams, Route, Link, useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import Comments from "../components/comments/Comments";
import NoQuotesFound from "../components/quotes/NoQuotesFound";

const QuoteDetail = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const match = useRouteMatch();
  const selectedQuote = useSelector((state) => state.selectedQuote);
  const loading = useSelector((state) => state.loading);

  useEffect(() => {
    dispatch(fetchSelectedQuote(params.quoteId));
  }, [dispatch, params.quoteId]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!selectedQuote) {
    return <NoQuotesFound />;
  }

  return (
    <Fragment>
      <h1>Quote Detail Page</h1>
      <HighlightedQuote quote={selectedQuote} />
      <Route path={`/quotes/${params.quoteId}`} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>
            Load comments
          </Link>
        </div>
      </Route>
      {console.log(match.path)}
      <Route path={`/quotes/${params.quoteId}/comments`}>
        <Comments />
      </Route>
    </Fragment>
  );
};

export default QuoteDetail;

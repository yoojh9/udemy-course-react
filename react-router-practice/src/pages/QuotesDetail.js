import { useEffect } from "react";
import { Link, Route, useParams, useRouteMatch } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";

const QuotesDetail = () => {
    const params = useParams();
    const match = useRouteMatch();

    const { quoteId } = params;

    const {
        sendRequest,
        status,
        data: loadedQuote,
        error,
    } = useHttp(getSingleQuote, true);

    useEffect(() => {
        sendRequest(quoteId);
    }, [sendRequest, quoteId]);

    if (status === "pending") {
        return (
            <div className="centered">
                <LoadingSpinner />
            </div>
        );
    }

    if (error) {
        return <p className="centered">{error}</p>;
    }

    if (!loadedQuote.text) {
        return <p>No quote found!</p>;
    }

    const quote = loadedQuote.find((quote) => quote.id === params.quoteId);

    if (!quote) {
        return <p>No quote found!</p>;
    }

    return (
        <>
            <HighlightedQuote text={quote.text} author={quote.author} />
            <Route path={`${match.path}`} exact>
                <div className="centered">
                    <Link className="btn--flat" to={`${match.path}/comments`}>
                        Load Comments
                    </Link>
                </div>
            </Route>
            <Route exact path={`${match.path}/comments`}>
                <Comments />
            </Route>
        </>
    );
};

export default QuotesDetail;

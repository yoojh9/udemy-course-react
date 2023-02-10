import { Link, Route, useParams, useRouteMatch } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";

const DUMMY_QUOTES = [
    { id: "q1", author: "Jeonghyun", text: "Learning React is fun!" },
    { id: "q2", author: "Jeonghyun Yoo", text: "Learning React is great!" },
];

const QuotesDetail = () => {
    const params = useParams();
    const match = useRouteMatch();

    console.log(match); //{isExact: true, params: {quoteId: 'q2'}, path: "/quotes/:quoteId", url: "/quotes/q2"}

    const quote = DUMMY_QUOTES.find((quote) => quote.id === params.quoteId);

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

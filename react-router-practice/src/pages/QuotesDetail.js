import { Route, useParams } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";

const DUMMY_QUOTES = [
    { id: "q1", author: "Jeonghyun", text: "Learning React is fun!" },
    { id: "q2", author: "Jeonghyun Yoo", text: "Learning React is great!" },
];

const QuotesDetail = () => {
    const params = useParams();
    const quote = DUMMY_QUOTES.find((quote) => quote.id === params.quoteId);

    if (!quote) {
        return <p>No quote found!</p>;
    }

    return (
        <>
            <HighlightedQuote text={quote.text} author={quote.author} />
            <Route exact path={`/quotes/${params.quoteId}/comments`}>
                <Comments />
            </Route>
        </>
    );
};

export default QuotesDetail;

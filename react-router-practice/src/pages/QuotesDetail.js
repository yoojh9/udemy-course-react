import { Route, useParams } from "react-router-dom";
import Comments from "../components/comments/Comments";
const QuotesDetail = () => {
    const params = useParams();
    return (
        <>
            <h1>Quote Detail Page</h1>
            <p>{params.quoteId}</p>
            <Route exact path={`/quotes/${params.quoteId}/comments`}>
                <Comments />
            </Route>
        </>
    );
};

export default QuotesDetail;

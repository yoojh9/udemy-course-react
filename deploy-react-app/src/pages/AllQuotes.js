import { useEffect } from "react";
import QuoteList from "../components/quotes/QuoteList";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getAllQuotes } from "../lib/api";
import NoQuotesFound from "../components/quotes/NoQuotesFound";

const AllQuotes = () => {
    const {
        sendRequest,
        status,
        data: loadedQutes,
        error,
    } = useHttp(getAllQuotes, true);

    useEffect(() => {
        sendRequest();
    }, [sendRequest]);

    if (status === "pending") {
        return (
            <div className="centered">
                <LoadingSpinner />
            </div>
        );
    }

    if (error) {
        return <p className="centered foucused">{error}</p>;
    }

    if (status === "completed" && (!loadedQutes || loadedQutes.length === 0)) {
        return <NoQuotesFound />;
    }

    return <QuoteList quotes={loadedQutes} />;
};

export default AllQuotes;

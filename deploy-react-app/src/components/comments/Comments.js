import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import classes from "./Comments.module.css";
import NewCommentForm from "./NewCommentForm";
import useHttp from "../../hooks/use-http";
import { getAllComments } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";
import CommentsList from "./CommentsList";

const Comments = () => {
    const [isAddingComment, setIsAddingComment] = useState(false);
    const params = useParams();
    const { quoteId } = params;

    const {
        sendRequest,
        status,
        data: loadedComments,
        error,
    } = useHttp(getAllComments);

    useEffect(() => {
        sendRequest(quoteId);
    }, [sendRequest, quoteId]);

    const startAddCommentHandler = () => {
        setIsAddingComment(true);
    };

    // 이 함수가 렌더링 될 떄마다 다시 생성되지 않도록 하기 위해 useCallback() 사용
    const addedCommentHandler = useCallback(() => {
        sendRequest(quoteId);
    }, [sendRequest, quoteId]);

    let comments;
    if (status === "pending") {
        comments = (
            <div className="centered">
                <LoadingSpinner />
            </div>
        );
    }

    if (status === "completed" && loadedComments && loadedComments.length > 0) {
        comments = <CommentsList comments={loadedComments} />;
    }

    if (
        status === "completed" &&
        (!loadedComments || loadedComments.length === 0)
    ) {
        comments = <p className="centered">No comments were added yet</p>;
    }

    return (
        <section className={classes.comments}>
            <h2>User Comments</h2>
            {!isAddingComment && (
                <button className="btn" onClick={startAddCommentHandler}>
                    Add a Comment
                </button>
            )}
            {isAddingComment && (
                <NewCommentForm
                    quoteId={quoteId}
                    onAddedComment={addedCommentHandler}
                />
            )}
            {comments}
        </section>
    );
};

export default Comments;

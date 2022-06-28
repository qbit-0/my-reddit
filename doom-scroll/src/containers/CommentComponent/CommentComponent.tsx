import AuthorComponent from "containers/AuthorContainer/AuthorContainer";
import SanitizeHTML from "containers/SanitizeHTML/SanitizeHTML";
import SentimentBanner from "containers/SentimentBanner/SentimentBanner";
import VoteHorizontal from "containers/VoteHorizontal/VoteHorizontal";
import { CommentData } from "lib/reddit/redditData";
import React from "react";

type Props = {
    comment: CommentData;
};

const CommentComponent: React.FC<Props> = ({ comment }) => {
    return (
        <div
            className={`flex overflow-clip rounded-br-3xl bg-gradient-to-r from-neutral-800 shadow-lg`}
        >
            <div className="w-full px-8">
                <div className="mt-4 mb-2">
                    <AuthorComponent
                        author={comment.data["author"]}
                        createdUtc={comment.data["created_utc"]}
                    />
                    <SanitizeHTML dirty={comment.data["body_html"]} />
                </div>
                <div className="my-2">
                    <VoteHorizontal score={comment.data["score"]} />
                </div>
            </div>
            <SentimentBanner sentiment={comment.meta.sentiment} />
        </div>
    );
};

export default CommentComponent;
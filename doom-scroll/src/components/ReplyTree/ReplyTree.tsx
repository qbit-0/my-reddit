import Reply from "components/Reply/Reply";
import { selectCommentsReplyTree } from "features/comments/commentsSlice";
import React, { FC } from "react";
import { useSelector } from "react-redux";

type Props = {};

const ReplyTree: FC<Props> = () => {
    const replyTree = useSelector(selectCommentsReplyTree);

    return (
        <section>
            {Object.values(replyTree.data)
                .filter((reply) => {
                    return reply.parentId === -1;
                })
                .map((reply, index) => {
                    return <Reply reply={reply} />;
                })}
        </section>
    );
};

export default ReplyTree;
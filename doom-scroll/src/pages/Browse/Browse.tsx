import { useAppDispatch } from "app/store";
import FilterSentiment from "containers/FilterSentiment/FilterSentiment";
import PostComponent from "containers/PostComponent/PostComponent";
import PostPlaceholder from "containers/PostPlaceholder/PostPlaceholder";
import SearchSort from "containers/SearchSort/SearchSort";
import SubredditSort from "containers/SubredditSort/SubredditSort";
import { selectAccessToken } from "features/auth/authSlice";
import {
    loadPosts,
    loadPostsAfter,
    selectPostDeque,
    selectPostsAfter,
    selectPostsIsLoading,
    selectPostsIsRefreshing,
    setPostsPathname,
    setPostsSearchStr,
} from "features/posts/postsSlice";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useLocation, useMatch } from "react-router-dom";

type Props = {};

const Browse: React.FC<Props> = () => {
    const location = useLocation();
    const searchMatch = useMatch("/search/*");
    const accessToken = useSelector(selectAccessToken);
    const postDeque = useSelector(selectPostDeque);
    const isRefreshing = useSelector(selectPostsIsRefreshing);
    const isLoading = useSelector(selectPostsIsLoading);
    const after = useSelector(selectPostsAfter);
    const dispatch = useAppDispatch();

    const refTop = useRef<HTMLDivElement>(null);

    const scrollToTop = () => {
        if (refTop.current === null) return;

        window.scroll({
            top: refTop.current.offsetTop,
            behavior: "auto",
        });
    };

    useEffect(() => {
        if (isRefreshing) return;
        scrollToTop();
        dispatch(setPostsPathname(location.pathname));
        dispatch(setPostsSearchStr(location.search));
        dispatch(loadPosts());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, location]);

    useEffect(() => {
        if (isRefreshing) return;
        scrollToTop();
        dispatch(loadPosts());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, accessToken]);

    const refBot = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isLoading && after !== null) {
            const options = {
                rootMargin: "5000px",
            };

            const observer = new IntersectionObserver((entities) => {
                const entity = entities[0];
                if (entity.isIntersecting) {
                    dispatch(loadPostsAfter());
                }
            }, options);

            if (refBot.current) observer.observe(refBot.current);

            const refBotCopy = refBot;
            return () => {
                if (refBotCopy.current) observer.unobserve(refBotCopy.current);
            };
        }

        return;
    }, [dispatch, isLoading, after]);

    return (
        <div className="bg-neutral-900 text-amber-100">
            <div ref={refTop} />
            <div className="px-16 pb-8 max-w-7xl mx-auto">
                <div className="pt-28 pb-8">
                    <div>
                        {searchMatch ? <SearchSort /> : <SubredditSort />}
                    </div>
                    <div className="border-t-2 border-neutral-700">
                        <FilterSentiment />
                    </div>
                </div>

                <div>
                    {!isRefreshing &&
                        Object.values(postDeque.data).map((post, index) => (
                            <div className="my-8" key={index}>
                                <PostComponent post={post} />
                            </div>
                        ))}
                    {(isLoading || after) && (
                        <div className="my-8">
                            <PostPlaceholder />
                        </div>
                    )}
                </div>
            </div>
            <div ref={refBot} />
        </div>
    );
};

export default Browse;
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Post from "../../components/Post/Post";
import PostPlaceholder from "../../components/PostPlaceholder/PostPlaceholder";
import SubredditSort from "../../components/SubredditSort/SubredditSort";
import {
  selectAccessToken,
  updateAppToken,
} from "../../features/auth/authSlice";
import {
  loadPosts,
  loadPostsAfter,
  selectIsLoadingPosts,
  selectIsLoadingPostsNew,
  selectPosts,
  selectPostsAfter,
  setPostsLocation,
} from "../../features/posts/postsSlice";

const SubredditPage = ({ nlp }) => {
  const location = useLocation();
  const accessToken = useSelector(selectAccessToken);
  const posts = useSelector(selectPosts);
  const isLoading = useSelector(selectIsLoadingPosts);
  const isLoadingNew = useSelector(selectIsLoadingPostsNew);
  const after = useSelector(selectPostsAfter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPostsLocation(location));
  }, [location]);

  useEffect(() => {
    if (!isLoadingNew) {
      dispatch(loadPosts(nlp));
    }
  }, [location, accessToken]);

  const ref = useRef();

  useEffect(() => {
    if (!isLoading && after !== null) {
      const options = {
        rootMargin: "5000px",
      };

      const observer = new IntersectionObserver((entities, observer) => {
        const entity = entities[0];
        if (entity.isIntersecting) {
          dispatch(loadPostsAfter(nlp));
        }
      }, options);

      if (ref.current) observer.observe(ref.current);

      return () => {
        if (ref.current) observer.unobserve(ref.current);
      };
    }
  }, [location, accessToken, isLoading, after]);

  return (
    <div className="px-16 py-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <SubredditSort />
      </div>
      <div>
        {!isLoadingNew &&
          posts.map((post, index) => (
            <Post post={post} key={index} />
          ))}
      </div>
      {after !== null && <PostPlaceholder />}
      <div ref={ref} />
    </div>
  );
};

export default SubredditPage;

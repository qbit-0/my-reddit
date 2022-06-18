import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { selectAccessToken, updateAppToken } from "../features/auth/authSlice";
import {
  appendAfter,
  fetchListings,
  selectListings,
  selectPathname,
  selectSearch,
  updatePathname,
  updateSearch,
} from "../features/listings/listingsSlice";
import { Listing } from "./Listing";

export const PostsPage = () => {
  const location = useLocation();

  const accessToken = useSelector(selectAccessToken);
  const pathname = useSelector(selectPathname);
  const search = useSelector(selectSearch);
  const listings = useSelector(selectListings);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateAppToken());
  }, []);

  useEffect(() => {
    dispatch(updatePathname(location.pathname));
    dispatch(updateSearch(location.search));
  }, [location]);

  useEffect(() => {
    if (accessToken) {
      dispatch(
        fetchListings({
          accessToken: accessToken,
          pathname: pathname,
          search: search,
        })
      );
    }
  }, [accessToken, pathname, search]);

  const ref = useRef();

  useEffect(() => {
    const options = {
      rootMargin: "100px",
    };

    const observer = new IntersectionObserver((entities, observer) => {
      const entity = entities[0];
      if (entity.isIntersecting && accessToken) {
        dispatch(
          appendAfter({
            accessToken: accessToken,
            pathname: pathname,
            search: search,
            path: [0],
          })
        );
      }
    }, options);

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [pathname, search, accessToken]);

  return (
    <div>
      {listings.map((listing, index) => (
        <Listing path={[index]} key={index} />
      ))}
      <div ref={ref} />
    </div>
  );
};

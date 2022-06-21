import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { analyzePost, analyzeComment } from "../../utility/nlpHelpers";
import { fetchReddit } from "../../utility/redditAPI";
import { flattenCommentTree } from "../../utility/redditDataStructure";
import { selectAccessToken } from "../auth/authSlice";

export const loadComments = createAsyncThunk(
  "comments/loadComments",
  async (nlp, thunkAPI) => {
    const accessToken = selectAccessToken(thunkAPI.getState());
    const location = selectCommentsLocation(thunkAPI.getState());
    const pathname = location.pathname;
    const search = location.search;

    if (!accessToken) {
      return {
        post: null,
        comments: [],
      };
    }

    const responseJson = await fetchReddit({
      accessToken: accessToken,
      pathname: pathname,
      search: search,
    });

    const post = responseJson[0].data.children[0];
    post.score = analyzePost(nlp, post);

    const comments = flattenCommentTree(responseJson[1]);
    comments.forEach((comment) => {
      comment.score = analyzeComment(nlp, comment);
    });

    return {
      post: post,
      comments: comments,
    };
  }
);

export const replaceComment = createAsyncThunk(
  "comments/replaceComment",
  async ({ index, childrenIds, nlp }, thunkAPI) => {
    const accessToken = selectAccessToken(thunkAPI.getState());
    const post = selectCommentsPost(thunkAPI.getState());
    const link = post.data.name;

    if (!accessToken) {
      return {
        index: index,
        newComments: [],
      };
    }

    const params = new URLSearchParams();
    params.append("api_type", "json");
    params.append("children", childrenIds.join(","));
    params.append("link_id", link);

    const responseJson = await fetchReddit({
      accessToken: accessToken,
      pathname: "/api/morechildren",
      search: params.toString(),
    });

    const comments = responseJson.json.data.things;
    comments.forEach((comment) => {
      comment.score = analyzeComment(nlp, comment);
    });

    return {
      index: index,
      newComments: comments,
    };
  }
);

export const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    location: {
      pathname: "",
      search: "",
    },
    post: null,
    comments: [],
    isLoading: false,
  },
  reducers: {
    setCommentsLocation: (state, action) => {
      state.location = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadComments.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(loadComments.fulfilled, (state, action) => {
        state.post = action.payload.post;
        state.comments = action.payload.comments;
        state.isLoading = false;
      })
      .addCase(replaceComment.fulfilled, (state, action) => {
        const { index, newComments } = action.payload;

        state.comments = [
          ...state.comments.slice(0, index),
          ...newComments,
          ...state.comments.slice(index + 1, state.comments.length),
        ];
      });
  },
});

export const selectCommentsLocation = (state) => state.comments.location;
export const selectCommentsPost = (state) => state.comments.post;
export const selectComments = (state) => state.comments.comments;
export const selectCommentsIsLoading = (state) => state.comments.isLoading;

export const { setCommentsLocation } = commentsSlice.actions;
export default commentsSlice.reducer;
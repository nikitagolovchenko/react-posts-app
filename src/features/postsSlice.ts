import { PostAddSharp } from '@material-ui/icons';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../app/store';
import { db } from './../app/firebase';

interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string;
}

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: '',
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    fetchPosts: (state) => {
      state.loading = true;
    },
    postsError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    postsSuccess: (state, action: PayloadAction<Post[]>) => {
      state.loading = false;
      state.error = '';
      state.posts = action.payload;
    }
  },
});

export const {fetchPosts, postsError, postsSuccess } = postsSlice.actions;

export const getPosts = (): AppThunk => dispatch => {
  dispatch(fetchPosts());

  db.collection('posts')
    .get()
    .then(querySnapshot => {
      let postsData: Post[] = [];

      querySnapshot.forEach(doc => {
        const post = {
          ...doc.data(),
          id: doc.id,
          createdAt: new Date(doc.data().createdAt.seconds)
        };

        postsData.push(post as Post);
      });

      dispatch(postsSuccess(postsData));
    })
    .catch(error => {
      dispatch(postsError(error.message));
    })
};

export const selectPosts = (state: RootState) => state.posts;

export default postsSlice.reducer;

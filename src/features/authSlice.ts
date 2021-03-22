import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../app/store';
import { auth, provider } from './../app/firebase';

interface User {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
}

interface AuthState {
  user: User;
  authorized: boolean;
}

const initialState: AuthState = {
  user: {
    uid: '',
    displayName: '',
    email: '',
    photoURL: '',
  },
  authorized: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user.displayName = action.payload.displayName;
      state.user.email = action.payload.email;
      state.user.uid = action.payload.uid;
      state.user.photoURL = action.payload.photoURL;
      state.authorized = true;
    },
    logout: state => {
      state.user.displayName = '';
      state.user.email = '';
      state.user.uid = '';
      state.user.photoURL = '';
      state.authorized = false;
    },
  },
});

export const { login, logout } = authSlice.actions;

export const userLogin = (): AppThunk => dispatch => {
  auth
    .signInWithPopup(provider)
    .then(result => {
      const user = result.user;

      if (user) {
        dispatch(
          login({
            uid: user.uid as string,
            displayName: user.displayName as string,
            email: user.email as string,
            photoURL: user.photoURL as string,
          })
        );
      }
    })
    .catch(error => {
      console.error(error.message);
    });
};

export const userLogout = (): AppThunk => dispatch => {
  auth
    .signOut()
    .then(() => {
      dispatch(logout());
    })
    .catch(error => {
      console.error(error.message);
    });
};

export const userInitLogin = (): AppThunk => dispatch => {
  auth.onAuthStateChanged(user => {
    if (user) {
      dispatch(
        login({
          uid: user.uid as string,
          displayName: user.displayName as string,
          email: user.email as string,
          photoURL: user.photoURL as string,
        })
      );
    }
  });
};

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";

// slices
import registerSlice from "redux/Auth/Register/RegisterSlice";
/* store map to provide to the toolkit provider ctx */
const store = configureStore({
  reducer: { register: registerSlice },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false, immutableCheck: false }),
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

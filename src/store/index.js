import { configureStore } from "@reduxjs/toolkit";
import valueDocument from "./slice/valueDocument.slice";
import isOpenModal from "./slice/isOpenModal.slice";
import isActiveModal from "./slice/isActiveModal.slice";
import login from "./slice/login.slice";
import isLoadingOptions from "./slice/isLoadingOptions.slice";
import activeLoadingSlice from "./slice/activeLoading.slice";
import { userSlice } from "./slice/users";
import { loadingSlice } from "./slice/loadings";
import { messageSlice } from "./slice/messages";
import { turneroSlice } from "./slice/turneros/turnero.slice";
import { consultorioSlice } from "./slice/consultorios";
import { turnSlice } from "./slice/turns/turns.slice";

export default configureStore({
  reducer: {
    valueDocument,
    isOpenModal,
    isActiveModal,
    login,
    isLoadingOptions,
    activeLoadingSlice,
    users: userSlice.reducer,
    loading: loadingSlice.reducer,
    message: messageSlice.reducer,
    turnero: turneroSlice.reducer,
    consultorio: consultorioSlice.reducer,
    turn: turnSlice.reducer,
  },
});

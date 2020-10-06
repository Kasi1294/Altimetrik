import { takeEvery, put } from "redux-saga/effects";
import axios from 'axios';

const BASE_URL = "http://127.0.0.1:8080/";
function* signUpSaga(savePayLoad) {
  try {
    const url = BASE_URL + "signup";
    const response = yield axios.post(url, savePayLoad).then((response) =>
      console.log(response)
    );
    yield put({ type: "SIGN_UP_SAGA", response });
  } catch (error) {
    yield put({ type: "SIGN_UP_ERROR_SAGA", error });
  }
}

//addItem function used to call addItemSaga
export function* signUp() {
  yield takeEvery("SIGN_UP", signUpSaga);
}
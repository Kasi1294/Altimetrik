import {all, fork} from "redux-saga/effects";
import {signUp} from './userSaga'

{
  /**
  * rootSaga is a root function for 
  * initialLoad, saveTodo saga function 
  */

}
export default function* rootSaga() {
    yield all([fork(signUp)]);
  }
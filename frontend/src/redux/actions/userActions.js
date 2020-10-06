import {
  SIGN_UP,
} from "./actions.types";

{
  /**
   * signUp is a action creator function 
   * for sign up
   * 
   * @param{savePayLoad} 
   * @return{type: SIGN_UP, savePayLoad} 
   */
}
export const signUp = (savePayLoad) => {
  return {
    type: SIGN_UP,
    savePayLoad,
  };
};
import {
  SIGN_UP_SAGA
} from "../actions/actions.types";

//Inital state for the TODO application
const initalState = {
  login: false,
  signup: false
};

{
  /**
   * userReducer is a reducer function for app
   * 
   * @param{state} default value is inital state
   * @param{action} action dispatch from UI 
   * @return {object} new state
   */
}
const userReducer = (state = initalState, action) => {
  switch (action.type) {
    case SIGN_UP_SAGA:
      return{...state, signup:true}

    default:
      return state;
  }
};

export default userReducer;

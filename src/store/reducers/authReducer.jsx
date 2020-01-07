const initState = {
  authError: null
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_ERROR":
      console.log("login error");
      return {
        ...state,
        authErroe: "Login failed"
      };

    case "LOGIN_SUCCESS":
      console.log("login success");
      return {
        ...state,
        authError: null
      };

    case "SIGNOUT_SUCCESS":
      console.log("signout success");
      return state;

    case "SIGNOUT_ERROR":
      console.log("signout error");
      return {
        ...state,
        authError: action.err.message
      };

    case "SIGNUP_SUCCESS":
      console.log("signup seccess");
      return {
        ...state,
        authError: null
      };

    case "SIGNUP_ERROR":
      console.log("signup failed");
      return {
        ...state,
        authError: action.err.message
      };

    default:
      return state;
  }
};

export default authReducer;
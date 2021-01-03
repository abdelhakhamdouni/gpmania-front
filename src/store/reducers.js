let initialState = {
  user: null,
  post: null,
  showLogin: true,
  showRegister: false,
  logged: false,
  showSideBarre: false,
  screen: "home",
  loggin: false,
  comments: null,
  showCommentForm: false,
  loading: true,
  users: [],
  lastposts: [],
  mesposts: []
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return {
        ...state,
        user: action.payload.user,
        showLogin: false,
        logged: true,
      };
    case "UPLOAD_POSTS_FROM_API":
      return { ...state, posts: action.payload.posts };
    case "UPLOAD_LASTS_POSTS_FROM_API":
      return { ...state, lastposts: action.payload.posts };
    case "UPLOAD_POST_FROM_API":
      return { ...state, post: action.payload.post };
    case "UPLOAD_MES_POSTS_FROM_API":
      return { ...state, mespost: action.payload.posts };
    case "UPLOAD_COMMENTS_FROM_API":
      return { ...state, comments: action.payload.comments };
    case "SHOW_SIDE_BARRE":
      return { ...state, showSideBarre: action.payload.showSideBarre };
    case "SHOW_COMMENT_FORM":
      return { ...state, showCommentForm: action.payload.showCommentForm };
    case "CHANGE_SCREEN":
      return { ...state, screen: action.payload.screen };
    case "SET_LOGGIN":
      return { ...state, loggin: action.payload.loggin };
    case "GOTO_REGISTER":
      return { ...state, showRegister: action.payload.showRegister };
    case "TOGGLE_LOADING":
      return { ...state, loading: action.payload.loading };
    case "SET_USERS_LIST":
      return { ...state, users: action.payload.users };
    default:
      return state;
  }
};

export default reducers;

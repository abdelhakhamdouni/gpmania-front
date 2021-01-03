import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LogScreen from "./screens/LogScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import AddPost from "./screens/AddPost";
import { getAllUsers, logWithToken } from "./models/userHandler";
import ProfileScreen from "./screens/ProfileScreen";
import PostScreen from "./screens/PostScreen";
import MesPostsScreen from "./screens/MesPostsScreen";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import Topbar from "./components/Topbar";
import BottomNav from "./components/BottomNav";
import Loader from "./components/Loader";
import "./sass/app.scss";
import LeftAsideDesktop from "./components/LeftAsideDesktop";
import BannerPosts from "./components/BannerPosts";
import UsersList from "./components/UsersList";
import UserProfileScreen from "./screens/UserProfileScreen";
import EditScreen from "./screens/EditScreen";
import EditPasswordScreen from "./screens/EditPasswordScreen";

function App(props) {
  const [showAside, setshowAside] = useState(false);
  const [register, setregister] = useState(false);
  const history = useHistory();

  useEffect(() => {
    let token = localStorage.getItem("token")
    if ( token && !props.logged) {
      getAllUsers(token).then((users) => {
        props.setUsers(users.data.users);
      });
      logWithToken(token)
        .then((res) => {
          props.setUserData(res.data.user);
          props.setLoggin(true);
          props.toggleLoading(false);
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem("token");
          history.push("/");
        });
    } else {
      props.toggleLoading(false);
    }
  }, []);

  const showAsideHandler = () => {
    setshowAside(!showAside);
  };

  const showRegister = () => {
    setregister(!register);
  };

  return props.state.loading ? (
    <Loader />
  ) : !props.state.logged ? (
    !props.state.showRegister ? (
      <LogScreen />
    ) : (
      <RegisterScreen />
    )
  ) : (
    <div className="app">
      <Router history={history}>
        <Topbar />
        <UsersList />
        <LeftAsideDesktop />
        <main className="main">
          <Switch>
            <Route exact path="/">
              <HomeScreen />
            </Route>
            <Route path="/post/:id">
              <PostScreen />
            </Route>
            <Route path="/ajouter">
              <AddPost />
            </Route>
            <Route path="/profile">
              <ProfileScreen />
            </Route>
            <Route path="/edit-profile">
              <EditScreen />
            </Route>
            <Route path="/editer-motdepasse">
              <EditPasswordScreen />
            </Route>
            <Route path="/users/profile/:id">
              <UserProfileScreen />
            </Route>
            <Route path="/mesposts">
              <MesPostsScreen />
            </Route>
            <Route path="/not-found" />
          </Switch>
        </main>
        <BannerPosts />
        <BottomNav />
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => ({
  state: state,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setUserData: (data) =>
      dispatch({
        type: "LOGIN_USER",
        payload: {
          user: data,
        },
      }),
    setLoggin: () =>
      dispatch({
        type: "SET_LOGGIN",
        payload: {
          loggin: true,
        },
      }),
    toggleLoading: (bool) =>
      dispatch({
        type: "TOGGLE_LOADING",
        payload: {
          loading: bool,
        },
      }),
    setUsers: (users) => {
      dispatch({
        type: "SET_USERS_LIST",
        payload: { users },
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

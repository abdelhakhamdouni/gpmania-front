import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function BottomNav(props) {
  function navigate(e) {
    props.toggleSideBarre(!props.state.showSideBarre);
    props.toggleScreen(e.target.dataset.link);
    let path = window.location.pathname;
    if (path.match(/\/post\/\d/)) {
      path = "/";
    }
  }

  useEffect(() => {
    document.querySelector('#menu').addEventListener('click', ()=>{
        document.querySelector('.leftasideDesktop').classList.contains('shown')  ?
        document.querySelector('.leftasideDesktop').classList.remove('shown')  :
        document.querySelector('.leftasideDesktop').classList.add('shown')  
    })

    document.querySelector('#lastPosts').addEventListener('click', ()=>{
      document.querySelector('.bannerPosts').classList.contains('shown')  ?
      document.querySelector('.bannerPosts').classList.remove('shown')  :
      document.querySelector('.bannerPosts').classList.add('shown')  
  })

    let path = window.location.pathname;
    if (path.match(/\/post\/\d/)) {
      path = "/";
    }
    switch (path) {
      case "/":
        props.toggleScreen("home");
        break;
      case "/profile":
        props.toggleScreen("profile");
        break;
      case "/ajouter":
        props.toggleScreen("plus");
        break;
    }
  }, []);

  return (
    <ul className="bottomnav">
      <li id="menu">
          <span
            className="fa fa-bars"
          ></span>
      </li>
      <li>
        <Link
          className={
            props.state.screen !== "home"
              ? "bottomnav_home"
              : "bottomnav_home active"
          }
          to="/"
        >
          <span
            data-link="home"
            onClick={navigate}
            className="fa fa-home"
          ></span>
        </Link>
      </li>
      <li>
        <Link
          className={
            props.state.screen !== "plus"
              ? "bottomnav_home"
              : "bottomnav_home active"
          }
          to="/ajouter"
        >
          <span
            data-link="plus"
            onClick={navigate}
            className="fa fa-plus-circle"
          ></span>
        </Link>
      </li>
      <li>
        <Link
          className={
            props.state.screen !== "profile"
              ? "bottomnav_home"
              : "bottomnav_home active"
          }
          to="/profile"
        >
          <span
            data-link="profile"
            onClick={navigate}
            className="fa fa-user"
          ></span>
        </Link>
      </li>
      <li id="lastPosts">
          <span
            className="fa fa-file"
          ></span>
      </li>
    </ul>
  );
}

const mapStateToProps = (state) => ({ state: state });
const mapDispatchToProps = (dispatch) => {
  return {
    toggleSideBarre: (show) =>
      dispatch({
        type: "SHOW_SIDE_BARRE",
        payload: {
          showSideBarre: !show,
        },
      }),
    toggleScreen: (screen) =>
      dispatch({
        type: "CHANGE_SCREEN",
        payload: {
          screen: screen,
        },
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BottomNav);

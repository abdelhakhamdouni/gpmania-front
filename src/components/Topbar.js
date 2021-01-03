import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";

function Topbar(props) {
  const [arrow, setarrow] = useState(false);

  function toggleSideBarre() {
    console.log(props);
    props.toggleSideBarre(!props.state.showSideBarre);
  }

  const history = useHistory();

  useEffect(() => {
    setarrow(window.location.pathname.substr(1) !== "");
  }, []);

  function gotoProfile() {
    props.toggleScreen("profile");
    history.push("/profile");
  }

  console.log(props);

  return (
    <nav className="topbar">
      <div className="flex-row">
        <h1>
          <Link to="/">GROUPOMANIA</Link>
        </h1>
      </div>

      <div className="menu-bar">
        <Link to="/profile" className="button image">
          <span>{props.state.user.lastName} </span>
          <img src={props.state.user.avatar} alt="groupomania" />
        </Link>
        <Link className="button" to="/ajouter">
          <span className="fa fa-plus"></span>Ajouter un poste
        </Link>
        <span
          onClick={toggleSideBarre}
          style={{ fontSize: "1.4em" }}
          className={!props.state.showSideBarre ? "fa fa-gear" : "fa fa-close"}
        ></span>
      </div>
    </nav>
  );
}

const mapStateToProps = (state) => ({
  state: state,
});

const mapDispatchToProps = (dispatch) => {
  return {
    toggleSideBarre: (show) =>
      dispatch({
        type: "SHOW_SIDE_BARRE",
        payload: {
          showSideBarre: show,
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

export default connect(mapStateToProps, mapDispatchToProps)(Topbar);

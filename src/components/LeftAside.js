import React from "react";
import logo from "../assets/images/avatar/avatar.png";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

function LeftAside(props) {
  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return !props.state.showSideBarre ? null : (
    <nav className="leftaside">
      <img src={logo} alt="logo" />
      <h2>{props.state.user.pseudo}</h2>
      <ul>
        <li>
          <Link
            to="/profile"
            onClick={() => props.toggleSideBarre(!props.state.showSideBarre)}
          >
            <span className="fa fa-user"></span>
            <span>Mon profil</span>
          </Link>
        </li>
        <li>
          <Link
            to="/mesposts"
            onClick={() => props.toggleSideBarre(!props.state.showSideBarre)}
          >
            <span className="fa fa-comments"></span>
            <span>Mes postes</span>
          </Link>
        </li>
        <li>
          <Link to="/" onClick={logout}>
            <span className="fa fa-lock"></span>
            <span>Se deconnecter </span>
          </Link>
        </li>
      </ul>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LeftAside);

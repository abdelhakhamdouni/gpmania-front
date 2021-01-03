import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

function LeftAside(props) {
  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  useEffect(() => {
    document.querySelectorAll('.leftasideDesktop ul li').forEach(ele=>{
      ele.addEventListener('click', ()=>{
        document.querySelector('.leftasideDesktop').classList.contains('shown')  ?
        document.querySelector('.leftasideDesktop').classList.remove('shown')  :
        document.querySelector('.leftasideDesktop').classList.add('shown')  
      })
    })
    return () => {
      document.querySelectorAll('.leftasideDesktop ul li').forEach(ele=>{
          ele.removeEventListener('click',null)
      })
    }
  })

  return (
    <nav className="leftasideDesktop">
      <img src={props.state.user.avatar} alt="logo" />
      <h4>
        {props.state.user.firstName} {props.state.user.lastName}
      </h4>
      <ul>
        <li>
          <Link to="/">
            <span className="fa fa-home"></span>
            <span>Accueil</span>
          </Link>
        </li>
        <li>
          <Link to="/ajouter">
            <span className="fa fa-plus"></span>
            <span>Ajouter un poste</span>
          </Link>
        </li>
        <li>
          <Link to="/mesposts">
            <span className="fa fa-comments"></span>
            <span>Mes postes</span>
          </Link>
        </li>
        <hr />
        <li>
          <Link to="/profile">
            <span className="fa fa-user"></span>
            <span>Mon profil</span>
          </Link>
        </li>
        <li>
          <Link to="/editer-motdepasse">
            <span className="fa fa-user"></span>
            <span>Changer mot de passe</span>
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

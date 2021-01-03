import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import logo from "../assets/images/logos/icon-left-font-monochrome-black.svg";
import { addUser,checkEmailFormBdd } from "../models/userHandler";

function RegisterScreen(props) {
  const [image, setimage] = useState(null);
  const [alt, setalt] = useState(null);
  const [imageFile, setimageFile] = useState(null);
  const [data, setdata] = useState();
  const [disabled, setdisabled] = useState(true);
  const [error, seterror] = useState(null);
  const history = useHistory();
  const [passwordclear, setpasswordclear] = useState(false);


  function getImage(evt) {
    var tgt = evt.target,
      files = tgt.files;
    console.log(files);
    if (files.length > 0) {
      if (!files[0].type.match(/^image/)) {
        seterror("Le format du media n'est pas pris en compte !");
        return setdisabled(true);
      } else {
        setimageFile(files);
        setalt(files[0].name);
        setdisabled(false);
        seterror(null);
        setimage("");
      }
    }

    // FileReader support
    if (FileReader && files && files.length) {
      var fr = new FileReader();
      fr.onload = function () {
        setimage(fr.result);
      };
      fr.readAsDataURL(files[0]);
    }
    // Not supported
    else {
      // fallback -- perhaps submit the input to an iframe and temporarily store
      // them on the server until the user's session ends.
    }
  }

  useEffect(() => {
    resetForm();
  }, []);

  function submitPostForm(e) {
    e.preventDefault();
    addUser(data, imageFile)
      .then((res) => {
        if (res.status === 201) {
          resetForm();
          window.location.href = "/";
        }else{
        seterror(res.data.error)
        }
      })
      .catch((err) => console.log("error:", err));
  }

  function saveData(e) {
    setdata({ ...data, [e.target.name]: e.target.value });
  }

  function checkEmail(e){
    let email = e.target.value
    checkEmailFormBdd(email).then(res=>{
      console.log(res)
      if(res.data.error){
        seterror(res.data.error)
      }else{
        seterror(null)
      }
    }).catch(err=>{
      console.log(err)
    })
  }

  function resetForm() {
    setimage(null);
    document.querySelectorAll("input").value = "";
    document.querySelectorAll("textarea").value = "";
  }

  return props.showRegister ? null : (
    <section className="logscreen register">
      <div className="logo">
        {" "}
        <img src={logo} alt="groupomania" />{" "}
      </div>
      <div>
        {" "}
        <h1>Créer votre compte</h1>{" "}
      </div>
      <form onSubmit={submitPostForm} encType="multipart/form-data">
      {!error ? null : <div className="warning">{error}</div>}
        <div className="form-group">
          <label htmlFor="firstName">Nom: </label>
          <input
            type="text"
            name="firstName"
            onChange={saveData}
            className="form-control"
            id="firstName"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Prénom: </label>
          <input
            type="text"
            name="lastName"
            onChange={saveData}
            className="form-control"
            id="lastName"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            onChange={saveData}
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            required
            onBlur={checkEmail}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mot de passe :</label>
          <div className="input-group">
            <input
              onChange={saveData}
              name="password"
              type={passwordclear? "text" : "password"}
              className="form-control"
              id="password"
              />
            <span 
              className={passwordclear ? "fa fa-eye-slash" : "fa fa-eye"} 
              onClick={()=>setpasswordclear(!passwordclear)}>
                
              </span>
            </div>
        </div>
        <div className="form-group mt-3">
          <label htmlFor="file">Choisir un Avatar</label>
          <input
            type="file"
            name="image"
            onChange={getImage}
            className="form-control"
            id="file"
          />
        </div>
        <div className="form-group form-check my-2">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
            required
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Accpeter les conditions d'utilisation
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Créer mon compte
        </button>
      </form>
      <div className="helpers">
        {" "}
        <button className="helpers_button mb-5">Se connecter</button>{" "}
      </div>
    </section>
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
    goToRegister: (bol) =>
      dispatch({
        type: "GOTO_REGISTER",
        payload: {
          showRegister: bol,
        },
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);

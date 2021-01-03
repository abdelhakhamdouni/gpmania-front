import React, { useState } from "react";
import { connect } from "react-redux";
import { editUser } from "../models/userHandler";

function ProfileScreen(props) {
  const [image, setimage] = useState(props.state.user.avatar);
  const [imageFile, setimageFile] = useState(null);
  const [data, setdata] = useState({
    firstName: props.state.user.firstName,
    lastName: props.state.user.lastName,
  });
  const [error, seterror] = useState(null);
  const [update, setupdate] = useState(false);

  function getImage(evt) {
    var tgt = evt.target,
      files = tgt.files;
    console.log(files);
    if (files.length > 0) {
      if (!files[0].type.match(/^image/)) {
        seterror("Le format du media n'est pas pris en compte !");
      } else {
        setimageFile(files);
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

  function submitPostForm(e) {
    e.preventDefault();
    editUser(
      update,
      data,
      imageFile,
      props.state.user.avatar,
      props.state.user.id
    )
      .then((res) => {
        if (res.status === 201) {
          window.location.href = "/profile";
        } else if (res.error) {
          seterror(res.error);
        }
      })
      .catch((err) => console.log("error:", err));
  }

  function saveData(e) {
    setdata({ ...data, [e.target.name]: e.target.value });
    setupdate(true);
  }

  return (
    <section className="editScreen">
      <div className="profile-header">
        <label htmlFor="file">
          <img id="avatar" src={image} alt="avatar" />
        </label>
        <input
          type="file"
          name="image"
          onChange={getImage}
          className="form-control"
          id="file"
        />
      </div>
      {!error ? null : <div className="warning">{error}</div>}
      <form onSubmit={submitPostForm} encType="multipart/form-data">
        <div className="form-group">
          <label htmlFor="firstName">Nom: </label>
          <input
            type="text"
            name="firstName"
            onChange={saveData}
            value={data.firstName}
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
            value={data.lastName}
            className="form-control"
            id="lastName"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Mettre a jour mon compte
        </button>
      </form>
    </section>
  );
}

const mapStateToProps = (state) => ({ state: state });

export default connect(mapStateToProps)(ProfileScreen);

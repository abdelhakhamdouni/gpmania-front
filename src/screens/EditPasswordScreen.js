import React, { useState } from "react";
import { connect } from "react-redux";
import { editUser } from "../models/userHandler";

function EditPasswordScreen(props) {
  const [imageFile, setimageFile] = useState(null);
  const [data, setdata] = useState({
    firstName: props.state.user.firstName,
    lastName: props.state.user.firstName,
  });
  const [error, seterror] = useState(null);
  const [update, setupdate] = useState(false);

  function submitPostForm(e) {
    e.preventDefault();
    editUser(update, data, imageFile)
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
      {!error ? null : <div className="warning">{error}</div>}
      <form onSubmit={submitPostForm} encType="multipart/form-data">
        <div className="form-group">
          <label htmlFor="password-last">Ancien mot de passe</label>
          <input
            type="password"
            name="password"
            onChange={saveData}
            className="form-control"
            id="password-last"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Nouveau mot de passe</label>
          <input
            type="password"
            name="password"
            onChange={saveData}
            className="form-control"
            id="password"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password-confirm">Confirmer le mot de passe</label>
          <input
            type="password"
            name="password"
            onChange={saveData}
            className="form-control"
            id="password-confirm"
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

export default connect(mapStateToProps)(EditPasswordScreen);

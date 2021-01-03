import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { addPost } from "../models/postHandler";

function AddPost(props) {
  let userId = props.userId;
  if (localStorage.getItem("userDat")) {
    userId = JSON.parse(localStorage.getItem("userDat")).userId;
  }

  const [image, setimage] = useState(null);
  const [alt, setalt] = useState(null);
  const [imageFile, setimageFile] = useState(null);
  const [data, setdata] = useState({ userId: userId });
  const [disabled, setdisabled] = useState(true);
  const [error, seterror] = useState(null);
  const history = useHistory();

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
    data.authorId = props.state.user.id;
    data.pseudo = props.state.user.lastName;
    addPost(data, imageFile, props.token)
      .then((res) => {
        if (res.status === 201) {
          resetForm();
          history.push("/");
        }
      })
      .catch((err) => console.log("error:", err));
  }

  function saveData(e) {
    setdata({ ...data, [e.target.name]: e.target.value });
    if (data.description !== undefined && data.title !== undefined) {
      //setdisabled(false)
    }
  }

  function resetForm() {
    setimage(null);
    document.querySelectorAll("input").value = "";
    document.querySelectorAll("textarea").value = "";
  }

  return (
    <section className="addpost">
      <h1>Ajouter un post !</h1>
      <h2>
        <span className="fa fa-info"></span> Poster des image et, des GIFs
        limitées à 2mb max. Une image ou un GIF est recquise pour poster
      </h2>
      <div>
        <form
          onSubmit={submitPostForm}
          encType="multipart/form-data"
          className="px-3"
        >
          <div className="form-group">
            <label htmlFor="title">Titre:</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              onChange={saveData}
              placeholder="titre de la publication"
            />
            <small className="text-muted">un titre pour votre annonce</small>
          </div>
          <div className="form-group my-2">
            <div className="showImage">
              {error ? (
                <div className="error">{error}</div>
              ) : (
                <img src={image} alt={alt} />
              )}
            </div>
            <input
              className="form-control d-none"
              type="file"
              id="image"
              onChange={getImage}
              name="image"
            />
            <label
              id="addImage"
              className="btn btn-success mt-2"
              htmlFor="image"
            >
              Ajouter une image içi*
            </label>
            <br />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              className="form-control"
              type="text"
              name="description"
              id="description"
              onChange={saveData}
              rows="5"
              placeholder="Description ..."
            ></textarea>
            <small className="text-muted">
              Une description, ou ce que vous voulez dire
            </small>
          </div>
          <div className="form-group mt-4">
            <button className="btn-submit" disabled={disabled} type="submit">
              Poster ma publication
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

const mapStateToProps = (state) => ({ state: state });
const mapDispatchToProps = (dispatch) => {
  return {
    toggleScreen: (screen) =>
      dispatch({
        type: "CHANGE_SCREEN",
        payload: {
          screen: screen,
        },
      }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddPost);

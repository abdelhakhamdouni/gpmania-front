import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getAllPostsWithId } from "../models/postHandler";
import { deleteUser } from "../models/userHandler";

function ProfileScreen(props) {
  const [postsCount, setpostsCount] = useState(0);

  function deleteProfile() {
    let confirmation = window.confirm(
      "Êtes-vous sur de vouloir supprimer votre compte ?"
    );
    if (confirmation) {
      deleteUser(props.state.user.id).then((res) => {
        if (res.status === 200) {
          localStorage.clear();
          window.location.href = "/";
        }
      });
    }
  }

  useEffect(() => {
    getAllPostsWithId(null, props.state.user.id)
      .then((posts) => {
        setpostsCount(posts.data.length);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="profile">
      <div className="profile-header">
        <img src={props.state.user.avatar} alt="avatar" />
        <span>
          Email: <strong>{props.state.user.email}</strong>
        </span>
        <span>
          Nom prénom:{" "}
          <strong>
            {props.state.user.firstName}, {props.state.user.lastName}
          </strong>
        </span>
        <span>
          Roles: <strong>{props.state.user.roles}</strong>
        </span>
        <span>
        Publications en ligne : <strong>{postsCount}</strong>
        </span>
      </div>
      <div className="profile-action">
        <button className="delete" onClick={deleteProfile}>
          {" "}
          Suprimer mon compte : <span className="fa fa-trash"></span>
        </button>
        <Link to="edit-profile" className="button edit-button">
          {" "}
          Modifier mes données : <span className="fa fa-edit"></span>
        </Link>
      </div>
      <div className="profile-body"></div>
    </section>
  );
}

const mapStateToProps = (state) => ({ state: state });

export default connect(mapStateToProps)(ProfileScreen);

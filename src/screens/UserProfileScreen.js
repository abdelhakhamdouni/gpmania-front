import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getCountAllPostsWithUserId } from "../models/postHandler";
import { deleteUser, getAllUsers, getUserById } from "../models/userHandler";

function ProfileScreen(props) {
  const [postsCount, setpostsCount] = useState(0);
  let { id } = useParams();
  const [user, setuser] = useState(null);
  function deleteProfile() {
    let confirmation = window.confirm(
      "Êtes-vous sur de vouloir supprimer votre compte ?"
    );
    if (confirmation) {
      deleteUser(user.id).then((res) => {
        if(props.state.user.id === user.id){
           if (res.status === 200) {
            localStorage.clear();
            window.location.href = "/";
          }
        }else{
          if (res.status === 200) {
            getAllUsers().then((users) => {
              props.setUsers(users.data.users);
            });
          }
        }
       
      });
    }
  }

  useEffect(() => {
    getUserById(id).then((user) => {
      setuser(user.data);
      getCountAllPostsWithUserId(null, user.data.id)
        .then((posts) => {
          setpostsCount(posts.data[0].count);
        })
        .catch((err) => console.log(err));
    });
  }, [id]);

  return !user ? null : (
    <section className="profile">
      <div className="profile-header">
        <img src={user.avatar} alt="avatar" />
        <span>
          Email: <strong>{user.email}</strong>
        </span>
        <span>
          Nom prénom:{" "}
          <strong>
            {user.firstName}, {user.lastName}
          </strong>
        </span>
        <span>
          Roles: <strong>{user.roles}</strong>
        </span>
        <span>
          Publications en ligne : <strong>{postsCount}</strong>
        </span>
      </div>
      <div className="profile-action">
        {props.state.user.roles.includes("ROLE_ADMIN") ||
        props.state.user.id === user.id ? (
          <button className="delete" onClick={deleteProfile}>
            {" "}
            Suprimer le compte : <span className="fa fa-trash"></span>
          </button>
        ) : null}
      </div>
      <div className="profile-body"></div>
    </section>
  );
}

const mapStateToProps = (state) => ({ state: state });
const matDispatchToProps = (dispatch) => {
  return {
    setUsers: (users) => {
      dispatch({
        type: "SET_USERS_LIST",
        payload: { users },
      });
    },
  };
};

export default connect(mapStateToProps, matDispatchToProps)(ProfileScreen);

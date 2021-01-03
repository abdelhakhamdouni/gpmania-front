import React from "react";
import { deletePost, getAllPosts } from "../models/postHandler";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

function PostSetting(props) {
  const history = useHistory();

  function deletethisposte() {
    let confirm = window.confirm(
      "Êtes-vous sur de vouloir suprimer ce poste ?"
    );
    if (confirm) {
      deletePost(props.id).then(() => {
        getAllPosts().then((posts) => {
          props.setPostsData(posts.data);
          history.push("/");
        });
      });
    }
  }

  return !props.show ? null : (
    <ul className="postSetting">
      <li className="delete" data-id={props.id} onClick={deletethisposte}>
        <span className="fa fa-trash"></span> Suprmier ce poste
      </li>
    </ul>
  );
}

const mapStateToProps = (state) => ({
  state: state,
});
const mapDispatchToProps = (dispatch) => {
  return {
    setPostsData: (posts) =>
      dispatch({
        type: "UPLOAD_POSTS_FROM_API",
        payload: {
          posts: posts,
        },
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostSetting);

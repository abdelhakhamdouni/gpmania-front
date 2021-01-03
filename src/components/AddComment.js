import React from "react";
import { connect } from "react-redux";
import { addComment, getAllCommentsByPostId } from "../models/commentHandler";
import { getPostById } from "../models/postHandler";

function AddComment(props) {

  let comment = {};
  function submitComment(e) {
    e.preventDefault();
    comment.content = document.querySelector("form textarea").value;
    comment.userId = props.userId;
    comment.postId = props.postId;
    comment.commentId = props.commentId | null;

    if (comment.content.length < 1) {
      return false;
    }
    addComment(comment).then((comment) => {
      getAllCommentsByPostId(null, props.postId).then((comments) => {
        getPostById(props.postId).then((post) => {
          props.setCommentsData(comments.data);
          props.showcommenthandler();
          props.setPostData(post.data);
        });
      });
    });
  }

  return !props.show ? null : (
    <article className="addcomment">
      <form onSubmit={submitComment}>
        <textarea
          name="comment"
          placeholder="votre commentaire içi..."
          rows="3"
        ></textarea>
        <button>Envoyer</button>
      </form>
    </article>
  );
}

const mapPropsToState = (state) => ({
  state: state,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setPostData: (post) =>
      dispatch({
        type: "UPLOAD_POST_FROM_API",
        payload: {
          post: post,
        },
      }),
    setCommentsData: (comments) =>
      dispatch({
        type: "UPLOAD_COMMENTS_FROM_API",
        payload: {
          comments: comments,
        },
      }),
  };
};

export default connect(mapPropsToState, mapDispatchToProps)(AddComment);

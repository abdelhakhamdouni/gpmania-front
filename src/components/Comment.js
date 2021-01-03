import React, { useState, useEffect } from "react";
import moment from "moment";
import AddComment from "./AddComment";
import { connect } from "react-redux";
import {
  deleteComment,
  getAllCommentsByPostId,
} from "../models/commentHandler";
import { useHistory } from "react-router-dom";
import { getUserById } from "../models/userHandler";

function Comment(props) {
  const [commentshow, setcommentshow] = useState(false);
  const [user, setuser] = useState(null);
  const history = useHistory();

  function deletecomment() {
    console.log(props.comment.id);
    deleteComment(null, props.comment.id).then((res) => {
      getAllCommentsByPostId(null, props.comment.PostId).then((comments) => {
        props.setCommentsData(comments.data);
      });
    });
  }

  useEffect(() => {
    getUserById(props.comment.UserId).then((user) => {
      console.log(user.data);
      setuser(user.data);
    });
  }, []);

  const setShow = () => setcommentshow(!commentshow);

  // formater la date et heure en locale français
  moment.locale("fr");
  //check if author, admin or not
  const author =
    props.user.id === props.comment.UserId ||
    props.user.roles.indexOf("ROLE_ADMIN");

  return !user ? null : (
    <article
      className={
        props.comment.id !== props.comment.CommentId
          ? "comment child"
          : "comment"
      }
    >
      <div className="comment_image">
        <img
          onClick={() => history.push("/profile")}
          src={user.avatar}
          alt="avatar"
        />
      </div>
      <div className="comment-body">
        <div className="comment-header d-flex flex-column justify-content-start align-items-start">
          <small className="font-weight-bold">
            {user.firstName + "-" + user.lastName}
          </small>
          <small className="comment-date">
            {moment(props.comment.createdAt).fromNow()}
          </small>
        </div>
        <div className="comment-comment">
          <p>{props.comment.content}</p>
        </div>
        <div className="comment-footer">
          {props.comment.id !== props.comment.CommentId ? null : (
            <button onClick={setShow}>
              <span
                className={!commentshow ? "fa fa-arrow-left" : "fa fa-times"}
              ></span>{" "}
              {!commentshow ? "Répondre" : "fermer"}
            </button>
          )}
          {author !== -1 && (
            <button onClick={deletecomment}>
              <span className="fa fa-times"></span> Supprimer
            </button>
          )}
          <button
            onClick={() =>
              window.confirm(
                "le commentaire a été signalé a l'adminstrateur du groupe merci!"
              )
            }
          >
            <span className="fa fa-exclamation-triangle"></span> Signaler
          </button>
        </div>
        <AddComment
          show={commentshow}
          showcommenthandler={setShow}
          postId={props.comment.PostId}
          userId={props.comment.UserId}
          commentId={props.comment.id}
        />
      </div>
    </article>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
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
export default connect(mapStateToProps, mapDispatchToProps)(Comment);

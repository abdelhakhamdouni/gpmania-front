import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import Post from "../components/Post";
import Comment from "../components/Comment";
import { getPostById } from "../models/postHandler";
import { getAllCommentsByPostId } from "../models/commentHandler";
import { connect } from "react-redux";

function PostScreen(props) {
  let { id } = useParams();

  const [post, setpost] = useState(props.state.post);
  const [comments, setcomments] = useState(props.state.comments);
  const history = useHistory();

  useEffect(() => {
    props.toggleScreen("post");
    getPostById(id)
      .then((post) => {
        setpost(post.data);
        getAllCommentsByPostId(null, id).then((comments) => {
          props.setCommentsData(comments.data);
        });
      })
      .catch((err) => {
        history.push("/");
      });
  }, [id]);

  function getComments(id) {
    getAllCommentsByPostId(null, props.state.post.id).then((comments) => {
      props.setCommentsData(comments.data);
    });
    getPostById(id).then((post) => {
      setpost(post.data);
    });
  }

  return !post ? null : (
    <section className="postScreen">
      <h1>{post.title}</h1>
      <Post post={post} />
      <div className="comment-list">
        {!props.state.comments
          ? null
          : props.state.comments.map((comment) => {
              return (
                <Comment
                  key={comment.id}
                  uploadComment={getComments}
                  comment={comment}
                />
              );
            })}
      </div>
    </section>
  );
}

const mapStateToProps = (state) => ({
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
    toggleScreen: (screen) =>
      dispatch({
        type: "CHANGE_SCREEN",
        payload: {
          screen: screen,
        },
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostScreen);

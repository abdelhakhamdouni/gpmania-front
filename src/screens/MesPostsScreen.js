import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import Post from "../components/Post";
import { getAllPostsWithId } from "../models/postHandler";

function MesPostsScreen(props) {
  let userId = props.state.user.id;

  useEffect(() => {
    getAllPostsWithId(null, userId)
      .then((posts) => {
        console.log(posts.data)
        props.setMesPostsData(posts.data);
        console.log("MES POSTS:", posts.data);
      })
      .catch((err) => console.log(err));
  },[userId]);



  return (
    <section className="home">
      {!props.state.posts ? null : props.state.posts.length == 0 ? (
        <div className="alert alert-success mt-5">
          Vous n'avez aucune publications pour l'instant !
        </div>
      ) : (
        props.state.posts.map((post, i) => {
          return <Post key={post.id} post={post} />;
        })
      )}
    </section>
  );
}

const mapStateToProps = (state) => ({ state: state });
const mapDispatchToProps = (dispatch) => {
  return {
    setMesPostsData: (posts) =>
      dispatch({
        type: "UPLOAD_POSTS_FROM_API",
        payload: {
          posts: posts,
        },
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MesPostsScreen);

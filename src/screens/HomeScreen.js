import React, { useEffect } from "react";
import Post from "../components/Post";
import { getAllPosts } from "../models/postHandler";
import { connect } from "react-redux";

function HomeScreen(props) {

  useEffect(() => {
    getAllPosts().then((posts) => {
      props.setPostsData(posts.data);
    });
  }, [props.state.screen]);

  return (
    <section className="home">
      {!props.state.posts
        ? null
        : props.state.posts.map((post, i) => {
            return <Post key={post.id} post={post} />;
          })}
    </section>
  );
}

const mapStateToProps = (state) => ({ state: state });
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

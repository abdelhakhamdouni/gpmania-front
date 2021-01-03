import React, { useEffect, useState } from "react";
import PostBanner from "./PostBanner";
import { getLastsPosts } from "../models/postHandler";
import { connect } from "react-redux";

function BannerPosts(props) {
  const [posts, setposts] = useState(null);

  useEffect(() => {
    document.querySelectorAll('.post_banner').forEach(ele=>{
      ele.addEventListener('click', ()=>{
        document.querySelector('.bannerPosts').classList.contains('shown')  ?
        document.querySelector('.bannerPosts').classList.remove('shown')  :
        document.querySelector('.bannerPosts').classList.add('shown')  
      })
    })
    getLastsPosts().then((posts) => {
      console.log(posts);
      props.setLastsPostsData(posts.data);
      setposts(posts.data);
    });
    return () => {
      document.querySelectorAll('.leftasideDesktop ul li').forEach(ele=>{
          ele.removeEventListener('click',null)
      })
    }
  }, [props.state.screen]);

  return (
    <section className="bannerPosts">
      <h2>Les derniers articles </h2>
      <section className="posts">
        {!posts
          ? null
          : posts.map((post, i) => {
              return <PostBanner class="post_banner" key={post.id} post={post} />;
            })}
      </section>
    </section>
  );
}

const mapStateToProps = (state) => ({ state: state });
const mapDispatchToProps = (dispatch) => {
  return {
    setLastsPostsData: (posts) =>
      dispatch({
        type: "UPLOAD_LASTS_POSTS_FROM_API",
        payload: {
          lastposts: posts,
        },
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BannerPosts);

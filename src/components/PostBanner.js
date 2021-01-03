import React from "react";
import { Link } from "react-router-dom";

function Post(props) {
  console.log(props.post.image);
  return !props.post ? null : (
    <article className="post">
      <Link className="post_image" to={"/post/" + props.post.id}>
        <img className="freezeframe" src={props.post.image} alt="gif" />
      </Link>
    </article>
  );
}
export default Post;

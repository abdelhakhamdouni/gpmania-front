import config from "../helpers/config";
import axios from "axios";
/**
 *
 * @param {Object} credentiels = {email, password}
 */
function addPost(data, file) {
  let formData = new FormData();
  formData.append("post", JSON.stringify(data));
  formData.append("image", file[0]);

  return axios.post(config.url + "posts", formData, {
    method: "post",
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  });
}

function getAllPosts(token = null) {
  token = !token ? localStorage.getItem("token") : token;
  return axios.get(config.url + "posts", {
    headers: { Authorization: "Bearer " + token },
  });
}

function getLastsPosts(token = null) {
  token = !token ? localStorage.getItem("token") : token;
  return axios.get(config.url + "posts/lasts", {
    headers: { Authorization: "Bearer " + token },
  });
}

function getAllPostsWithId(token = null, id) {
  token = !token ? localStorage.getItem("token") : token;
  return axios.get(config.url + "posts/user/"+ id +"/posts", {
    headers: { Authorization: "Bearer " + token },
  });
}

function getCountAllPostsWithUserId(token = null, UserId) {
  token = !token ? localStorage.getItem("token") : token;
  return axios.get(config.url + "posts/user/" + UserId, {
    headers: { Authorization: "Bearer " + token },
  });
}

function getPostById(id) {
  let token = localStorage.getItem("token");
  return axios.get(config.url + "posts/post/" + id, {
    timeout: 1000,
    headers: { Authorization: "Bearer " + token },
  });
}

function deletePost(id) {
  let token = localStorage.getItem("token");
  return axios.delete(config.url + "posts/" + id, {
    timeout: 1000,
    headers: { Authorization: "Bearer " + token },
  });
}

function getAllLikesById(token = null, postId) {
  if (!token) token = localStorage.getItem("token");
  return axios.post(config.url + "likes/" + postId, null, {
    timeout: 1000,
    headers: { Authorization: "Bearer " + token },
  });
}

function likeAPost(token = null, id, like, data) {
  if (!token) token = localStorage.getItem("token");
  return axios.post(config.url + "likes/" + id + "/" + like, data, {
    timeout: 1000,
    headers: { Authorization: "Bearer " + token },
  });
}

export {
  addPost,
  getAllPosts,
  getAllPostsWithId,
  getCountAllPostsWithUserId,
  getPostById,
  deletePost,
  likeAPost,
  getAllLikesById,
  getLastsPosts,
};

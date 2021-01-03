import config from "../helpers/config";
import axios from "axios";

function addComment(data, token = null) {
  let token_ = token || localStorage.getItem("token");
  return axios.post(config.url + "comments/", data, {
    headers: { Authorization: "Bearer " + token_ },
  });
}

function getAllCommentsByPostId(token, id) {
  let token_ = token || localStorage.getItem("token");
  return axios.get(config.url + "comments/" + id, {
    headers: { Authorization: "Bearer " + token_ },
  });
}

function getCountCommentsByPostId(token, id) {
  let token_ = token || localStorage.getItem("token");
  return axios.get(config.url + "comments/count/" + id, {
    headers: { Authorization: "Bearer " + token_ },
  });
}

function deleteComment(token, id) {
  let token_ = token || localStorage.getItem("token");
  return axios.delete(config.url + "comments/" + id, {
    headers: { Authorization: "Bearer " + token_ },
  });
}

export {
  addComment,
  getAllCommentsByPostId,
  getCountCommentsByPostId,
  deleteComment,
};

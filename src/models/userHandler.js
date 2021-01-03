import config from "../helpers/config";
import axios from "axios";

function logWithToken(token) {
  console.log("LOGIN with TOKEN", token);
  return axios.get(config.url + "auth", {
    timeout: 1000,
    headers: { Authorization: "Bearer " + token },
  });
}

function deleteUser(userId) {
  let token = localStorage.getItem("token");
  return axios.delete(config.url + "auth/" + userId, {
    timeout: 1000,
    headers: { Authorization: "Bearer " + token },
  });
}

/**
 * @param {Object} credentiels = {email, password}
 */
function logUser(credentiels) {
  return axios.post(config.url + "auth/login", credentiels);
}

function addUser(data, file) {
  let formData = new FormData();
  formData.append("user", JSON.stringify(data));
  if (file !== null) {
    formData.append("image", file[0] || null);
  }
  return axios.post(config.url + "auth/signup", formData, {
    method: "post",
  });
}

function editUser(update, data, file, lastImage, id) {
  if (!update && file === null) {
    return new Promise((resole) => {
      resole({
        error:
          "Vous n'avez pas changé vos information, si vous ne voulez pas modifier vos données allez à la page d'acceuil.",
      });
    });
  }

  let formData = new FormData();
  formData.append("lastImage", lastImage);
  formData.append("user", JSON.stringify(data));

  if (file !== null) {
    formData.append("image", file[0] || null);
  }
  return axios.put(config.url + "auth/" + id, formData, {
    timeout: 1000,
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  });
}

function checkUserPseudo(pseudo) {
  return axios.post(config.url + "auth/user/check/pseudo", {
    pseudo,
  });
}

function checkEmailFormBdd(email) {
  return axios.post(config.url + "auth/user/check/email", {
    email,
  });
}

function getUserById(id) {
  let token = localStorage.getItem("token");
  return axios.get(config.url + "auth/" + id, {
    timeout: 1000,
    headers: { Authorization: "Bearer " + token },
  });
}

function getAllUsers(token_ = null) {
  let token = token_ || localStorage.getItem("token");
  return axios.get(config.url + "auth/users", {
    timeout: 1000,
    headers: { Authorization: "Bearer " + token },
  });
}

export {
  logWithToken,
  deleteUser,
  logUser,
  addUser,
  editUser,
  checkUserPseudo,
  getUserById,
  getAllUsers,
  checkEmailFormBdd
};

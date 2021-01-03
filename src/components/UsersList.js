import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function UsersList(props) {


  return (
    <section className="bannerUsers">
      <ul className="userslist">
        {!props.users
          ? null
          : props.users.map((user, i) => {
              return (
                <li key={i}>
                  <Link
                    to={"/users/profile/" + user.id}
                    className={props.state.user.id === user.id ? "author" : ""}
                  >
                    <img src={user.avatar} alt="user avatar" />
                  </Link>
                </li>
              );
            })}
      </ul>
    </section>
  );
}

const mapStateToProps = (state) => ({ users: state.users, state: state });
const matDispatchToProps = (dispatch) => {
  return {
    setUsers: (users) => {
      dispatch({
        type: "SET_USERS_LIST",
        payload: { users },
      });
    },
  };
};

export default connect(mapStateToProps, matDispatchToProps)(UsersList);

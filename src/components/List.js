import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
  getUsers,
  deleteUser,
  sortUsersAction,
  searchUserAction,
} from "../actions/index.js";
import "./styles.css";

class UserList extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getUsers());
  }

  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      usersPerPage: 5,
    };
  }

  // update
  deleteUser(id) {
    const { dispatch } = this.props;
    dispatch(deleteUser(id));
  }

  sortIcon(col_name, col_id, is_numeric) {
    const ASC = -1;
    const DSC = 1;
    const cname = "fas fa-sort-" + (is_numeric ? "numeric" : "alpha") + "-down";
    const { dispatch } = this.props;
    return (
      <th>
        {col_name}
        <button
          className="ml-1"
          onClick={() => dispatch(sortUsersAction(col_id, ASC))}
        >
          <i className={cname}></i>
        </button>
        <button
          className="ml-1"
          onClick={() => dispatch(sortUsersAction(col_id, DSC))}
        >
          <i className={cname + "-alt"}></i>
        </button>
      </th>
    );
  }

  renderTable() {
    const { users } = this.props;
    const { currentPage, usersPerPage } = this.state;
    const indexOfLastPost = currentPage * usersPerPage;
    const indexOfFirstPost = indexOfLastPost - usersPerPage;
    const currentUsers = users.slice(indexOfFirstPost, indexOfLastPost);

    return (
      <div className="text-center">
        <table className="table table-striped">
          <thead className="thead-primary">
            <tr className="thead">
              <th>Edit</th>
              <th>Delete</th>
              {this.sortIcon("First Name", "firstName", false)}
              {this.sortIcon("Last Name", "lastName", false)}
              {this.sortIcon("Sex", "sex", false)}
              {this.sortIcon("Age", "age", true)}
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => {
              return (
                <tr key={user._id} className="text-capitalize">
                  <td>
                    <button className="btn btn-light text-primary">
                      <Link
                        to={{
                          pathname: `/editUser/${user._id}`,
                          state: user,
                        }}
                      >
                        <i className="fas fa-pencil-alt"></i> Edit
                      </Link>
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-light text-danger"
                      onClick={() => this.deleteUser(user._id)}
                    >
                      <i className="fas fa-trash-alt"></i> Delete
                    </button>
                  </td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.sex}</td>
                  <td>{user.age}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  render() {
    const { users, dispatch } = this.props;
    const { usersPerPage, currentPage } = this.state;
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(users.length / usersPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="grid-container">
        <div className="headers">
          <h1>Manage Users</h1>
        </div>
        <div className="ui row ml-4" style={{ fontSize: "20px" }}>
          <input
            type="text"
            placeholder="search"
            onChange={(e) => dispatch(searchUserAction(e.target.value))}
          />
        </div>
        <div className="ml-4 mt-5">
          <label>show:</label>
          <select
            className="userPerPage"
            id="userPerPage"
            onChange={(e) =>
              this.setState({ usersPerPage: e.target.value, currentPage: 1 })
            }
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </select>
          <label className="ml-2 mt-2">users per page</label>
        </div>
        <div className="ui divided list">{this.renderTable()}</div>
        <nav>
          <ul className="pagination">
            <button
              className={currentPage > 1 ? "active-button" : "disable-button"}
              onClick={() => this.setState({ currentPage: currentPage - 1 })}
            >
              Prev
            </button>
            <p>&nbsp;</p>
            {pageNumbers.map((number) => (
              <li key={number} className="mt-3">
                <button
                  className={
                    number === currentPage ? "disable-button" : "active-button"
                  }
                  disabled={number === currentPage}
                  onClick={() => this.setState({ currentPage: number })}
                >
                  {number}
                </button>
              </li>
            ))}
            <p>&nbsp;</p>
            <button
              className={
                users.length > currentPage * usersPerPage
                  ? "active-button"
                  : "disable-button"
              }
              onClick={() => this.setState({ currentPage: currentPage + 1 })}
            >
              Next
            </button>
          </ul>
        </nav>
        <div>
          <form method="get" action="/addUser">
            <button type="submit" className="submit-button">
              <i className="fas fa-user-alt"></i> Create New User
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { users: state.displayData };
};

export default connect(mapStateToProps)(UserList);

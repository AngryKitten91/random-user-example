import React, { Component } from "react";

import "./App.css";

const URL = "https://randomuser.me/api/?results=";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loading: true,
      err: null
    };
  }

  

  componentDidMount() {
    fetchUsers(10)
    .then(({ results }) => {
      this.setState({ users: results, loading: false });
    })
    .catch(err => {
      this.setState({ err, loading: false });
    });
  }

  render() {
    const { loading, users, err } = this.state;

    if (err) {
      return (
        <div className="App">
          <div className="error">
            <p>{err.toString()}</p>
          </div>
        </div>
      );
    }

    return (
      <div className="App">
        {loading ? (
          <div>
            <p>Loading...</p>
          </div>
        ) : (
          <div>
            {users.map((user, id) => {
              const {
                name: { first, last },
                gender
              } = user;
              console.log(user);
              return (
                <div className="user" key={id}>
                  <p>{`${first} ${last}`}</p>
                  <p>{gender}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

const fetchUsers = amount => {
  return fetch(URL + amount)
    .then(resp => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("Connection Error");
      }
    })
};
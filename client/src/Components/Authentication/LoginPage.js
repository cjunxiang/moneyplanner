import React from "react";
const request = require("request");

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }
  componentDidMount = () => {
    // this.handleCheckAuth();
    this.props.history.push("/");
  };

  handleCheckAuth = () => {
    const { history } = this.props;
    fetch("/checkToken")
      .then(res => {
        if (res.status === 200) {
          history.push("/");
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch(err => {
        history.push("/login");
        console.error(err);
      });
  };

  handleInputChange = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  };
  onSubmit = event => {
    const { history } = this.props;
    const { email, password } = this.state;
    event.preventDefault();
    request.post(
      "http://localhost:4000/api/user/authenticate",
      {
        json: {
          email: email,
          password: password
        }
      },
      (error, res, body) => {
        if (error) {
          console.log(`Error ${error}`);
        }
        if (res.body === "OK") {
          history.push("/");
        }
      }
    );

    // fetch('https://localhost:4000/api/user/authenticate', {
    //   method: 'POST',
    //   body: JSON.stringify(this.state),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // })
    //   .then(res => {
    //     if (res.status === 200) {
    //       this.props.history.push('/');
    //     } else {
    //       const error = new Error(res.error);
    //       throw error;
    //     }
    //   })
    //   .catch(err => {
    //     console.error(err);
    //     alert('Error logging in please try again');
    //   });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <h1>Login Below!</h1>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={this.state.email}
          onChange={this.handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={this.state.password}
          onChange={this.handleInputChange}
          required
        />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import logginIn from '../../actions';

import './loginStyle.css';

import wallet from '../../images/wallet.png';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      emailAutentication: false,
      passwordAutentication: false,
    };

    this.handleData = this.handleData.bind(this);
    this.checkStateEmail = this.checkStateEmail.bind(this);
    this.checkStatePassword = this.checkStatePassword.bind(this);
  }

  // handleData = (event) => {
  //   const { name, value } = event.target;
  //   this.setState({
  //     [name]: value,
  //   });
  // };

  handleData(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    }, () => {
      this.checkStateEmail();
      this.checkStatePassword();
    });
  }

  checkStateEmail() {
    const { email } = this.state;
    if (
      email.includes('@')
      && email.includes('.com')
    ) {
      this.setState({
        emailAutentication: true,
      });
    } else {
      this.setState({
        emailAutentication: false,
      });
    }
  }

  checkStatePassword() {
    const { password } = this.state;
    const PASSWORD_LENGTH = 6;
    if (
      password.length >= PASSWORD_LENGTH

    ) {
      this.setState({
        passwordAutentication: true,
      });
    } else {
      this.setState({
        passwordAutentication: false,
      });
    }
  }

  render() {
    const { email, password, passwordAutentication, emailAutentication } = this.state;
    const { logActionStore, history } = this.props;
    const payload = {
      email, password,
    };
    return (
      <main className="login-main">
        <img src={ wallet } alt="Wallet" className="wallet-img" />
        <form action="GET" className="login-form">
          <label htmlFor="email">
            Email:
            <input
              type="text"
              name="email"
              value={ email }
              onChange={ this.handleData }
              data-testid="email-input"
            />
          </label>

          <label htmlFor="password">
            Password:
            <input
              type="password"
              name="password"
              value={ password }
              onChange={ this.handleData }
              data-testid="password-input"
            />
          </label>

          <button
            type="button"
            disabled={ !(passwordAutentication && emailAutentication) }
            onClick={ () => {
              logActionStore(payload);
              history.push('/carteira');
            } }
          >
            Entrar

          </button>

        </form>
      </main>
    );
  }
}

const mapDispathToProps = (dispatch) => ({
  logActionStore: (payload) => dispatch(logginIn(payload)),
});

Login.propTypes = {
  logActionStore: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,

};

export default connect(null, mapDispathToProps)(Login);

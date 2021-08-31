import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BuyForm from '../Components/BuyForm';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalField: 0,
      headerCurrencyField: 'BRL',
    };
  }

  render() {
    const { userState } = this.props;
    const { email } = userState;
    const { totalField, headerCurrencyField } = this.state;
    return (
      <main>
        <header>
          <div data-testid="email-field">
            Email:
            {' '}
            {email}
          </div>
          <div>
            <p data-testid="total-field">{totalField}</p>
            <p data-testid="header-currency-field">{headerCurrencyField}</p>
          </div>
        </header>
        <BuyForm />
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  userState: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  hello: () => { dispatch({ oi: 'oi' }); },
});

Wallet.propTypes = {
  userState: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,

};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

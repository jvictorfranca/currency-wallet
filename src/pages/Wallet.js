import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BuyForm from '../Components/BuyForm';
import { addExpense } from '../actions';
import Table from '../Components/Table';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headerCurrencyField: 'BRL',
    };
    this.buttonAction = this.buttonAction.bind(this);
  }

  async buttonAction(obj) {
    const { addExpenseFunction } = this.props;
    addExpenseFunction(obj);
  }

  render() {
    const { userState, total } = this.props;
    const { email } = userState;
    const { headerCurrencyField } = this.state;
    console.log(total);
    return (
      <main>
        <header>
          <div data-testid="email-field">
            Email:
            {' '}
            {email}
          </div>
          <div>
            <p data-testid="total-field">
              {total || 0}
            </p>
            <p data-testid="header-currency-field">{headerCurrencyField}</p>
          </div>
        </header>
        <BuyForm act={ this.buttonAction } />
        <Table />
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  userState: state.user,
  expenses: state.wallet.expenses,
  total: state.wallet.total,
});

const mapDispatchToProps = (dispatch) => ({
  addExpenseFunction: (obj) => { dispatch(addExpense(obj)); },
});

Wallet.propTypes = {
  userState: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,

  total: PropTypes.number.isRequired,
  addExpenseFunction: PropTypes.func.isRequired,

};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

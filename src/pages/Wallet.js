import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BuyForm from '../Components/BuyForm';
import { addExpense } from '../actions';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalField: 0,
      headerCurrencyField: 'BRL',
    };
    this.updateTotal = this.updateTotal.bind(this);
    this.buttonAction = this.buttonAction.bind(this);
  }

  getExpenseValue(object) {
    const value = parseFloat(object.value);
    let answer;
    if (object.currency === 'BRL') {
      answer = value;
    } else {
      answer = value * parseFloat(object.exchangeRates[0].ask);
    }
    answer = parseFloat(answer.toFixed(2));
    return answer;
  }

  async updateTotal() {
    const { expenses } = await this.props;
    expenses.forEach((expense) => console.log(expense.exchangeRates[0].ask));
    const total = expenses.reduce(
      (acum, expense) => acum + this.getExpenseValue(expense), 0,
    );
    this.setState({
      totalField: total,
    });
  }

  async buttonAction(obj) {
    const { addExpenseFunction } = this.props;
    const oi = await addExpenseFunction(obj);
    this.updateTotal();
  }

  render() {
    const { userState, expenses, addExpenseFunction } = this.props;
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
        <BuyForm act={ this.buttonAction } />
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  userState: state.user,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  addExpenseFunction: (obj) => { dispatch(addExpense(obj)); },
});

Wallet.propTypes = {
  userState: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,

  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  addExpenseFunction: PropTypes.func.isRequired,

};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

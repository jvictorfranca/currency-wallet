import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeExpenseAction } from '../actions';

class Table extends React.Component {
  getValue(expense) {
    const { value, exchangeRates, currency } = expense;
    const { ask } = exchangeRates[currency];

    const changed = parseFloat(ask) * parseFloat(value);
    const answer = changed.toFixed(2);
    return answer;
  }

  render() {
    const { expenses, remove } = this.props;
    return (
      <table>
        <tbody>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>

          {expenses.map((expense, index) => (
            <tr key={ expense.id }>
              <td>{expense.description}</td>
              <td>{expense.tag}</td>
              <td>{expense.method}</td>
              <td>{expense.value}</td>
              <td>{expense.exchangeRates[expense.currency].name}</td>
              <td>
                {parseFloat(
                  expense.exchangeRates[expense.currency].ask,
                ).toFixed(2)}
              </td>
              <td>{this.getValue(expense)}</td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                  onClick={ () => remove(index) }
                  data-testid="delete-btn"
                >
                  Remove
                </button>

              </td>
            </tr>
          ))}

        </tbody>

      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  remove: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  remove: (index) => dispatch(removeExpenseAction(index)),

});

export default connect(mapStateToProps, mapDispatchToProps)(Table);

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeExpenseAction } from '../actions';
import TableItem from './TableItem';

import './table-form-styles.css';

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
      <table className="currency-tables">
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
            <TableItem
              expense={ expense }
              onClick={ () => remove(index) }
              key={ expense.id }
            />
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

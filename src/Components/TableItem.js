import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { startEditing } from '../actions';

class TableItem extends React.Component {
  getValue(expense) {
    const { value, exchangeRates, currency } = expense;
    const { ask } = exchangeRates[currency];

    const changed = parseFloat(ask) * parseFloat(value);
    const answer = changed.toFixed(2);
    return answer;
  }

  render() {
    const { onClick, expense, edit } = this.props;
    return (
      <tr>
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
            onClick={ onClick }
            data-testid="delete-btn"
          >
            Remove
          </button>

          <button
            type="button"
            onClick={ () => edit(expense) }
            data-testid="edit-btn"
          >
            Edit
          </button>

        </td>
      </tr>
    );
  }
}

TableItem.propTypes = {
  expense: PropTypes.shape({
    description: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    exchangeRates: PropTypes.arrayOf(PropTypes.object).isRequired,

  }).isRequired,
  onClick: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  edit: (expense) => dispatch(startEditing(expense)),

});

export default connect(null, mapDispatchToProps)(TableItem);

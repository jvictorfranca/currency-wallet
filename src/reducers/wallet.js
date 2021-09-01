// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
// Esse reducer será responsável por tratar as informações da pessoa usuária

const INNITIAL_STATE = {
  expenses: [],
  total: 0,
};

const getExpenseValue = (object) => {
  const value = parseFloat(object.value);
  let answer;
  if (object.currency === 'BRL') {
    answer = value;
  } else {
    const { currency } = object;
    answer = value * parseFloat(object.exchangeRates[currency].ask);
  }
  answer = parseFloat(answer.toFixed(2));
  return answer;
};

function walletReducer(state = INNITIAL_STATE, action) {
  switch (action.type) {
  case 'ADD_EXPENSE':
    return {
      ...state,
      expenses: [...state.expenses, { ...action.payload, id: state.expenses.length }],
      total: state.expenses.reduce(
        (acum, expense) => acum + getExpenseValue(expense), 0,
      ) + getExpenseValue(action.payload),
    };
  case 'REMOVE_EXPENSE':
    return {
      ...state,
      expenses: [...state.expenses.slice(0, action.payload),
        ...state.expenses.slice(action.payload + 1)],
      total: state.expenses.reduce(
        (acum, expense) => acum + getExpenseValue(expense), 0,
      ) - getExpenseValue(state.expenses[action.payload]),
    };

  default:
    return state;
  }
}

export default walletReducer;

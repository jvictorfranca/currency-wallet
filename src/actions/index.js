// Coloque aqui suas actions
const logginIn = (payload) => ({
  type: 'LOGIN_SUCCESS',
  payload,
});

const addExpenseAction = (payload) => ({
  type: 'ADD_EXPENSE',
  payload }
);

export const removeExpenseAction = (payload) => ({
  type: 'REMOVE_EXPENSE', payload,
});

export const addExpense = (payload) => async (dispatch) => {
  let data = await fetch('https://economia.awesomeapi.com.br/json/all');
  data = await data.json();

  const object = { ...payload, exchangeRates: data };

  dispatch(
    addExpenseAction(object),
  );
};

export const startEditing = (payload) => ({
  type: 'START_EDITING', payload,
});

export const endEditing = (payload) => ({
  type: 'END_EDITING', payload,
});

export default logginIn;

// Coloque aqui suas actions
const logginIn = (payload) => ({
  type: 'LOGIN_SUCCESS',
  payload,
});

const addExpenseAction = (payload) => ({
  type: 'ADD_EXPENSE',
  payload }
);

export const addExpense = (payload) => async (dispatch) => {
  let data = await fetch(`https://economia.awesomeapi.com.br/json/${payload.currency}`);
  data = await data.json();

  const object = { ...payload, exchangeRates: data };

  dispatch(
    addExpenseAction(object),
  );
};

export default logginIn;

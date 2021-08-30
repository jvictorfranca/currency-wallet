// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
// Esse reducer será responsável por tratar as informações da pessoa usuária

const INNITIAL_STATE = {
  email: '',
  password: '',
  logged: false,
};

function walletReducer(state = INNITIAL_STATE, action) {
  switch (action.type) {
  case 'LOGIN_SUCCESS':
    return { ...state, ...action.payload, logged: true };

  default:
    return state;
  }
}

export default walletReducer;

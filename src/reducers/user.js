// Esse reducer será responsável por tratar as informações da pessoa usuária

const INNITIAL_STATE = {
  email: 'usuario@email.com',
  password: 'Essaeumaboasenha!',
  logged: false,
};

function userReducer(state = INNITIAL_STATE, action) {
  switch (action.type) {
  case 'LOGIN_SUCCESS':
    return { ...state, ...action.payload, logged: true };

  default:
    return state;
  }
}

export default userReducer;

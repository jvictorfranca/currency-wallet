import React from 'react';

class BuyForm extends React.Component {
  render() {
    return (
      <form action="GET">
        <label htmlFor="value">
          valor
          <input id="value" type="text" name="value" />
        </label>
        <label htmlFor="description">
          Descrição:
          <textarea name="description" id="description" cols="30" rows="10" />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select name="currency" id="currency">
            oi
          </select>
        </label>
        <label htmlFor="payment">
          método de pagamento
          <select name="payment" id="payment">
            <option value="money">Dinheiro</option>
            <option value="credit">cartão de crédito</option>
            <option value="debt">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="category">
          Tag
          <select name="category" id="category">
            <option value="food">Alimentação</option>
            <option value="enterteinment">Lazer</option>
            <option value="heath"> Saúde </option>
            <option value="work">Trabalho</option>
            <option value="transport">Transporte</option>
          </select>
        </label>
      </form>
    );
  }
}

export default BuyForm;

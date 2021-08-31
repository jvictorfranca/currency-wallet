import React from 'react';
import PropTypes from 'prop-types';

class BuyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: [],
      form: {
        value: '',
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Comida',
      },
    };
    this.handleData = this.handleData.bind(this);
  }

  componentDidMount() {
    this.fetchCurrencies();
  }

  async fetchCurrencies() {
    const data = await fetch('https://economia.awesomeapi.com.br/json/all');
    let currencies = await data.json();
    currencies = Object.keys(currencies);
    currencies = currencies.filter((currency) => currency !== 'USDT');
    this.setState({
      currencies,
    });
  }

  handleData(event) {
    const { value, name } = event.target;
    this.setState((prevState) => ({
      currencies: prevState.currencies,
      form: {
        ...prevState.form,
        [name]: value,
      },
    }));
  }

  render() {
    const { currencies, form } = this.state;
    const { value, description, currency, method, tag } = form;
    const { act } = this.props;
    const hand = this.handleData;
    const d = 'description';
    return (
      currencies.length > 1
        ? (
          <form action="GET">
            <label htmlFor="value">
              valor
              <input id="value" name="value" value={ value } onChange={ hand } />
            </label>
            <label htmlFor={ d }>
              Descrição:
              <textarea name={ d } id={ d } value={ description } onChange={ hand } />
            </label>
            <label htmlFor="currency">
              Moeda:
              <select name="currency" id="currency" value={ currency } onChange={ hand }>
                {currencies.map((sCurrency) => (
                  <option value={ sCurrency } key={ sCurrency }>
                    {sCurrency}
                  </option>))}
              </select>
            </label>
            <label htmlFor="method">
              método de pagamento
              <select name="method" id="method" value={ method } onChange={ hand }>
                <option value="Dinheiro">Dinheiro</option>
                <option value="Cartão de crédito">Cartão de crédito</option>
                <option value="Cartão de débito">Cartão de débito</option>
              </select>
            </label>
            <label htmlFor="tag">
              Tag
              <select name="tag" id="tag" value={ tag } onChange={ hand }>
                <option value="Comida">Alimentação</option>
                <option value="Lazer">Lazer</option>
                <option value="Saúde"> Saúde </option>
                <option value="Trabalho">Trabalho</option>
                <option value="Transporte">Transporte</option>
              </select>
            </label>
            <button type="button" onClick={ () => act(form) }>Adicionar despesa</button>
          </form>)
        : <p>Loading...</p>
    );
  }
}

BuyForm.propTypes = {
  act: PropTypes.func.isRequired,
};

export default BuyForm;

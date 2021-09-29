import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TagSelect from './TagSelect';

import './table-form-styles.css';

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
    this.actB = this.actB.bind(this);
    this.actE = this.actE.bind(this);
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

  actB(form) {
    const { act } = this.props;
    act(form);
    this.setState({
      form: {
        value: '',
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Comida',
      },
    });
  }

  actE(form) {
    const { actE } = this.props;
    actE(form);
    this.setState({
      form: {
        value: '',
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Comida',
      },
    });
  }

  // eslint-disable-next-line max-lines-per-function
  render() {
    const { currencies, form } = this.state;
    const { editing } = this.props;
    const { value, description, currency, method, tag } = form;
    const { actB, actE } = this;
    const hand = this.handleData;
    const d = 'description';
    console.log(editing);
    return (
      currencies.length > 1
        ? (
          <form action="GET" className="add-currency-form">
            <label htmlFor="value">
              Valor
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
              Método de pagamento
              <select name="method" id="method" value={ method } onChange={ hand }>
                <option value="Dinheiro">Dinheiro</option>
                <option value="Cartão de crédito">Cartão de crédito</option>
                <option value="Cartão de débito">Cartão de débito</option>
              </select>
            </label>
            <TagSelect value={ tag } onChange={ hand } />
            {!editing && (
              <button type="button" onClick={ () => actB(form) }>
                Adicionar despesa
              </button>)}
            {editing
            && (
              <button
                type="button"
                onClick={ () => actE(form) }
              >
                Editar despesa
              </button>)}
          </form>)
        : <p>Loading...</p>
    );
  }
}

const mapStateToProps = (state) => ({
  editing: state.wallet.editing.isEditing,
});

BuyForm.propTypes = {
  act: PropTypes.func.isRequired,
  actE: PropTypes.func.isRequired,
  editing: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(BuyForm);

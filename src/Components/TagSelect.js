import React from 'react';
import PropTypes from 'prop-types';

class TagSelect extends React.Component {
  render() {
    const { onChange, value } = this.props;
    return (
      <label htmlFor="tag">
        Tag
        <select name="tag" id="tag" value={ value } onChange={ onChange }>
          <option value="Comida">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Saúde"> Saúde </option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
        </select>
      </label>
    );
  }
}

TagSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default TagSelect;

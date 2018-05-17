import React, { Component } from 'react';

function handleSignIn(state, callback) {
  return
}

class EditSelf extends Component {
  constructor(props) {
    super(props);
    const { name, birthday, info } = props.initialState
    this.state = {
      name,
      birthday: birthday.slice(0, 10),
      info
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChange(event) {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.onsubmit(this.state)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Имя:
          <input
            name="name"
            type="text"
            value={this.state.name}
            onChange={this.handleInputChange} />
        </label>
        <br/>
        <label>
          День рождения:
          <input
            name="birthday"
            type="date"
            value={this.state.birthday}
            onChange={this.handleInputChange} />
        </label>
        <br/>
        <label>
          О себе:
          <input
            name="info"
            type="text"
            value={this.state.info}
            onChange={this.handleInputChange} />
        </label>
        <br/>
        <input type="submit" value="Обновить инфо" />
      </form>
    );
  }
}

export default EditSelf

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Profile.css'

class EditPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      image: ''
    }

    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleImgChange = this.handleImgChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleTextChange(event) {
    this.setState({
      text: event.target.value
    });
  }

  handleImgChange(event) {
    event.preventDefault();
    this.setState({
      image: event.target.files[0]
    });
  }

  handleSubmit(event) {
    event.preventDefault()
    if (!this.state.text) {
      alert("Введите текст")
      return
    }
    this.setState({
      text: ''
    });
    this.props.onsubmit(this.state)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Текст:
          <textarea
            name="email"
            value={this.state.text}
            onChange={this.handleTextChange} />
        </label>
        <br />
        <label>
          Картинка:
          <input
            name="pic"
            type="file"
            accept="image/*"
            onChange={this.handleImgChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}


EditPost.propTypes = {
  onsubmit: PropTypes.func.isRequired
}

export default EditPost
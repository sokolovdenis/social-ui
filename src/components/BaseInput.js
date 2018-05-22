import React, {Component} from 'react'


class BaseInput extends Component {
    state = {
        value: this.props.value
    };

    onChange = (event) => {
        const newValue = event.target.value;
        this.setState({value: newValue});
        this.props.onChange(newValue)
    };

    render() {
        const {id, type, name, label} = this.props;
        return (
            <div>
                <h4><label htmlFor={id}>{label}</label></h4>
                <input id={id}
                       type={type}
                       name={name}
                       value={this.props.value}
                       onChange={this.onChange}/>
            </div>
        );
    }
}

export default BaseInput;

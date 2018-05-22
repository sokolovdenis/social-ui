import React, {Component} from 'react'

import DatePicker from 'react-date-picker';


class DateInput extends Component {
    state = {
        value: this.props.value || new Date()
    };

    onChange = (value) => {
        this.setState({value: value});
        this.props.onChange(value)
    };

    render() {
        const {label} = this.props;
        return (
            <div>
                <h4><label htmlFor="date_input">{label}</label></h4>
                <DatePicker onChange={this.onChange} value={new Date(this.state.value)}/>
            </div>
        );
    }
}

export default DateInput;

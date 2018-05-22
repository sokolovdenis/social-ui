import React, {Component} from 'react'

class SideColumn extends Component {
    render() {
        const {inside} = this.props;

        return (
            <div className="side_column">{inside}</div>
        )
    }
}

export default SideColumn;

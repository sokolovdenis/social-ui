import React from 'react';
import '../style.css'
import './JumpUp.css'

class JumpUp extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
    }

    componentDidMount() {
        const setState = (obj) => this.setState(obj);
        const getState = () => this.state;
        window.addEventListener('scroll', function () {
            var d = document.documentElement;
            if (d.scrollTop !== 0 && !getState().visible) {
                setState({ visible: true });
            }
            if (d.scrollTop === 0 && getState().visible) {
                setState({ visible: false });
            }
        });
    }

    render() {
        if (this.state.visible) {
            return (
                <a href={ this.props.anchor } className="jump-up button">
                    <span>Up</span>
                </a>
            );
        } else {
            return null;
        }
    }
}

export default JumpUp;
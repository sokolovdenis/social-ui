import React, { Component } from 'react';
import injectTapeEventPlugin from 'react-tap-event-plugin';

import Start from './Start';
import './App.css'

injectTapeEventPlugin();

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginPage: [],
            uploadScreen: []
        }
    }

    componentWillMount() {
        let loginPage = [];
        loginPage.push(<Start parentContext={this} />);
        this.setState({loginPage: loginPage});
    }

    render() {
        return (
            <div className='App'>
                {this.state.loginPage}
                {this.state.uploadScreen}
            </div>
        );
    }
}

export default App;
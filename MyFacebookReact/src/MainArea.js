import React, { Component } from 'react';
import './MainArea.css';
import SideMenu from './SideMenu';
import UserBlock from './UserBlock';
import UsersList from './UsersList';
import EditUserInfoBlock from './EditUserInfoBlock';
import Feed from './Feed'
import { Switch, Route } from 'react-router-dom';

class MainArea extends Component {
    constructor(props) {
        super(props);

        this.state = {
            token: props.token,
            isEditMode: false
        };
    }

    editButtonHandler() {
        this.state.isEditMode = true;

        this.setState({
            token: this.state.token,
            isEditMode: this.state.isEditMode
        });
    }

    saveButtonHandler() {
        this.state.isEditMode = false;

        this.setState({
            token: this.state.token,
            isEditMode: this.state.isEditMode
        });
    }

    render() {
        return (
            <div class="main-area">
                <SideMenu />
                <Switch>
                    <Route exact path="/" render={() => {
                        if (this.state.isEditMode) {
                            return <EditUserInfoBlock token={this.state.token} onNotEditMode={() => this.saveButtonHandler()} />;
                        } else {
                            return <UserBlock token={this.state.token} isMe={true} onEditMode={() => this.editButtonHandler()} />;
                        }
                    }} />
                    <Route exact path="/users" render={() => {
                        return <UsersList token={this.state.token} />;
                    }} />
                    <Route exact path="/user/:userId" render={() => {
                        return <UserBlock token={this.state.token} isMe={false} />;
                    }} />
                    <Route exact path="/feed" render={() => {
                        return <Feed token={this.state.token} />;
                    }} />
                </Switch>
            </div>
        );
    }
}

export default MainArea;
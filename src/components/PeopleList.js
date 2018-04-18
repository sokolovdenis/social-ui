import React, {Component} from 'react';
import {connect} from "react-redux";

import PeopleListItem from './PeopleListItem'
import {getPeople} from '../api'

import './components.css';

/*
    Страница списка всех зарегистрированных на сайте людей
 */

class PeopleListPresentation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            users: []
        };
        this.loadPeople = this.loadPeople.bind(this);
    }

    loadPeople() {
        getPeople(this.props.token).then((response) =>{
            response.json().then((json) => {
                this.setState({
                    isLoaded: true,
                    users: json
                })
            });
        });
    }

    render() {
        document.title = "Friends - People";
        if (!this.state.isLoaded) {
            this.loadPeople()
        }
        let users = this.state.users.map((x) => {
            return <PeopleListItem userDetails={x} key={x.id}/>
        });
        return (
            <main>
                <div className="side_column"/>
                <div className="content_column">
                    <div className="content_header">
                        <h1 align="center">People:</h1>
                    </div>
                    <div className="users">
                        {users}
                    </div>
                </div>
                <div className="side_column"/>
            </main>
        );
    }
}

function mapStateToProps(state) {
    return {
        token: state.authentication.token
    }
}

const PeopleListContainer = connect(
    mapStateToProps
)(PeopleListPresentation);

export default PeopleListContainer;
import React, {Component} from 'react'
import './style.css'

import {API_URL} from './settings'
import {get_token} from "./auth";

import UserBlock from './UserBlock'
import PostBlock from './PostBlock'

function check_code(response) {
    if (response.status !== 200) {
        if (response.status === 401) {
            alert('Auth error')
        }
        if (response.status === 404) {
            alert('No user')
        }
        return;
    }
    return response.json()
}

class AllUsers extends Component {
    constructor() {
        super();
        this.state = {
            start: false,
            info_fetched: false,
            info: null,
        };

        this.fetch_info = this.fetch_info.bind(this);
        this.update_info = this.update_info.bind(this);
    }

    update_info(json) {
        this.state.info = json;
        this.setState({['info_fetched']: true})
    }

    fetch_info(id) {
        fetch(API_URL + 'users/', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + get_token(),
            }
        })
            .then(response => check_code(response))
            .then(json => this.update_info(json))
            .catch(function (error) {
                console.log('Request failed', error)
            });
    }

    render() {
        const id = this.props.match.params.id;
        if (!this.state.start) {
            this.state.start = true;
            this.fetch_info(id);
        }
        console.log(this.state.info);

        if (this.state.info_fetched) {
            let element = <div className="news-container">
                {
                    this.state.info.map((item) => (
                        <UserBlock
                            name={item.name}
                            birthday={item.birthday}
                            imageUrl={item.imageUrl}
                            info={item.info}
                            id={item.id}
                        />
                    ))
                }
            </div>;
            return element
        }
        else {
            return <div>Loading</div>;
        }
    }
}

export default AllUsers;

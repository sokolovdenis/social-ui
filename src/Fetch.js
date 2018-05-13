import React, {Component} from 'react';

const Fetch = (method, url, params) => (FetchComponent) =>
    class Fetch extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            isLoading: false,
            error: null,
        };
    }

    componentDidMount() {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW5" +
            "0aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjQyIiwiZXhwIjoxNTI2MjM0NTQ3fQ.Fulg8hhn8FE1QMLd6wlZfGOstkFtpLLEumAsSxC0BdQ";

        this.setState({isLoading: true});

        fetch('http://social-webapi.azurewebsites.net/api/' + url, {
            method: method,
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        })
            .then(res => res.json())
            .then(data => this.setState({data, isLoading: false}))
            .catch(error => this.setState({error, isLoading: false}));
    }

    render() {
        return <FetchComponent {...this.props} {...this.state} {...params} />
    }
};

export default Fetch;

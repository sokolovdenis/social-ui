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
        const token = params.token;

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

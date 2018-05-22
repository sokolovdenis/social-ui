import React, {Component} from 'react'


export default class PhotoInput extends Component {
    state = {
        file: this.props.value,
        previewUrl: this.props.previewUrl
    };

    onChange = (event) => {
        let reader = new FileReader();
        let file = event.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                previewUrl: reader.result
            })
        };
        reader.readAsDataURL(file);

        this.props.onChange(file)
    };

    render() {
        const {id, name, label} = this.props;
        return (
            <div style={{marginRight: "200px"}}>
                <div>
                    <img src={this.state.previewUrl} alt="" width="300px"/>
                </div>
                <input id={id}
                       type="file"
                       name={name}
                       value={this.state.value}
                       onChange={this.onChange}
                       style={{width: "300px", border: "none"}}/>
            </div>
        );
    }
}

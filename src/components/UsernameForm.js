import React, {Component} from 'react';
import logo from '../logo.png';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import './usernameForm.css'


export class UsernameForm extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.state = {connectionDegree: '1'}
    }

    handleChange(event) {
        this.props.onSubmitUsername(event.target.value)
    }

    handleSelectChange(event) {
        this.setState({connectionDegree: event.target.value})
    }


    render() {
        return (
            <div>
                <br/>
                <br/>
                <br/>
                <img src={logo} className="App-logo" alt="logo"/>

                <br/>
                <br/>

                    <TextField
                        id="outlined-name"
                        label="username"
                        onChange={this.handleChange}
                        margin="normal"
                        variant="outlined"
                    />
                <br/>
                <br/>
                <InputLabel className="input-label">Connection Degree</InputLabel>
                    <Select
                        value={this.state.connectionDegree}
                        onChange={this.handleSelectChange}
                        name="name">
                        <MenuItem value="1">1</MenuItem>
                        <MenuItem value="2">2</MenuItem>
                        <MenuItem value="3">3</MenuItem>
                    </Select>
                    <br/>

                <br/>
            </div>

        )
    }

}
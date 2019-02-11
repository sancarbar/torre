import React, {Component} from 'react';
import logo from '../logo.png';


export class UsernameForm extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.onSubmitUsername(event.target.value)
    }


    render() {
        return (
            <div>
                <br/>
                <br/>
                <br/>
                <img src={logo} className="App-logo" alt="logo"/>
                <form>
                    <label>
                        <input type="text" onChange={this.handleChange}
                               placeholder="username"/>
                    </label>
                    <br/>
                </form>

                <br/>
            </div>

        )
    }

}
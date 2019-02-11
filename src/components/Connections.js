import React, {Component} from 'react';
import {UsernameForm} from "./UsernameForm";


export class Connections extends Component {

    constructor(props) {
        super(props);
        this.state = {username: ''};
        this.onSubmitUsername = this.onSubmitUsername.bind(this);
        this.onFindClicked = this.onFindClicked.bind(this);
    }

    onSubmitUsername(username) {
        this.setState({username: username});
    }

    onFindClicked() {
        console.log("onFindClicked for username: ", this.state.username)
    }

    drawGraph() {
        
    }

    render() {

        let button;

        if (this.state.username.length > 3) {
            button = <button onClick={this.onFindClicked}> Find</button>
        }

        return (
            <div>
                <UsernameForm onSubmitUsername={this.onSubmitUsername}/>
                <p>Connections for <b>{this.state.username}:</b></p>
                {button}
            </div>
        );
    }


}
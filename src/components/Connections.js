import React, {Component} from 'react';
import {UsernameForm} from "./UsernameForm";
import {NodesGraph} from "./NodesGraph";


export class Connections extends Component {

    constructor(props) {
        super(props);
        this.state = {username: '', resultMessage: "", connections: []};
        this.onSubmitUsername = this.onSubmitUsername.bind(this);
        this.onFindClicked = this.onFindClicked.bind(this);
    }

    onSubmitUsername(username) {
        this.setState({username: username});
    }

    onFindClicked() {
        if (this.state.username.length > 3) {

            let context = this

            fetch("https://torre.bio/api/people/" + this.state.username + "/connections")

                .then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson.message) {
                        context.setState({resultMessage: responseJson.message});
                    } else {
                        context.setState({connections: responseJson});
                    }
                    console.log(responseJson);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }


    render() {

        let button;

        if (this.state.username.length > 3) {
            button = <button onClick={this.onFindClicked}>Find</button>
        }

        let nodes;

        if (this.state.connections.length > 0) {
            nodes = <NodesGraph username={this.state.username} connections={this.state.connections}/>
        }


        return (
            <div>
                <UsernameForm onSubmitUsername={this.onSubmitUsername}/>
                <p>Connections for <b>{this.state.username}:</b></p>
                {button}
                <br/>
                {this.state.resultMessage}

                <br/>
                <br/>

                {nodes}

            </div>
        );
    }


}
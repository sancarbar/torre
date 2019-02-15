import React, {Component} from 'react';
import {UsernameForm} from "./UsernameForm";
import {D3Graph} from "./D3Graph";


export class Connections extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '', resultMessage: "", connections: [], user: {},
            data: {
                nodes: [],
                links: []
            }
        };
        this.onSubmitUsername = this.onSubmitUsername.bind(this);
        this.onFindClicked = this.onFindClicked.bind(this);
    }

    onSubmitUsername(username) {
        this.setState({username: username});
    }

    onFindClicked() {
        if (this.state.username.length > 3) {

            let context = this

            fetch("https://torre.bio/api/bios/" + this.state.username)

                .then((response) => response.json())
                .then((user) => {
                    if (user.message) {
                        context.setState({resultMessage: user.message});
                    } else {
                        context.setState({user: user});

                        context.state.data.nodes.push({
                            id: user.person.id,
                            label: user.person.name
                        });


                        fetch("https://torre.bio/api/people/" + this.state.username + "/connections")

                            .then((response) => response.json())
                            .then((responseJson) => {
                                if (responseJson.message) {
                                    context.setState({resultMessage: responseJson.message});
                                } else {
                                    context.setState({connections: responseJson});
                                }
                                console.log("responseJson", responseJson);

                                this.state.connections.forEach(function (connection) {
                                    context.state.data.nodes.push({
                                        id: connection.person.id,
                                        label: connection.person.name
                                    });
                                    context.state.data.links.push({
                                        source: context.state.user.person.id,
                                        target: connection.person.id
                                    })
                                });


                            })
                            .catch((error) => {
                                console.error(error);
                            });


                    }


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

        if (this.state.data.links.length > 0) {

            nodes = <D3Graph data={this.state.data}/>
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
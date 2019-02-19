import React, {Component} from 'react';
import {UsernameForm} from "./UsernameForm";
import {D3Graph} from "./D3Graph";


export class Connections extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '', resultMessage: "", user: {},
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

                        let data = {
                            "nodes": [{
                                id: user.person.name.toUpperCase(),
                                svg: user.person.picture
                            }],
                            "links": []
                        };

                        context.setState({resultMessage: "finding connections for " + user.person.name + " ..."});


                        fetch("https://torre.bio/api/people/" + this.state.username + "/connections")

                            .then((response) => response.json())
                            .then((responseJson) => {
                                console.log("responseJson:  ", responseJson);
                                if (responseJson.message) {
                                    context.setState({resultMessage: responseJson.message});
                                } else {
                                    responseJson.forEach(function (connection) {
                                        if (connection.degrees === 1) {
                                            data.nodes.push({
                                                id: connection.person.name.toUpperCase(),
                                                svg: connection.person.picture,
                                                info: connection.person.professionalHeadline
                                            });
                                            data.links.push({
                                                source: context.state.user.person.name.toUpperCase(),
                                                target: connection.person.name.toUpperCase()
                                            })
                                        }
                                    });

                                    context.setState({data: data});

                                }

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
                <br/>
                {this.state.resultMessage}

                <br/>
                <br/>

                {nodes}

            </div>
        );
    }


}
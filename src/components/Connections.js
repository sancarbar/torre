import React, {Component} from 'react';
import {UsernameForm} from "./UsernameForm";
import {D3Graph} from "./D3Graph";
import Button from '@material-ui/core/Button';

export class Connections extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            connectionDegrees: 1,
            resultMessage: "",
            user: {},
            data: {
                nodes: [],
                links: []
            }
        };
        this.onUsernameTyped = this.onUsernameTyped.bind(this);
        this.onDegreesSelected = this.onDegreesSelected.bind(this);
        this.onFindClicked = this.onFindClicked.bind(this);
    }

    onUsernameTyped(username) {
        this.setState({username: username});
    }

    onDegreesSelected(degrees) {
        this.setState({connectionDegrees: degrees});
    }

    onFindClicked() {
        if (this.state.username.length > 3) {

            let context = this;

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

                        context.setState({resultMessage: `finding connections at ${context.state.connectionDegrees} degrees for ${user.person.name} ...`});

                        fetch("https://torre.bio/api/people/" + this.state.username + "/connections")

                            .then((response) => response.json())
                            .then((responseJson) => {

                                if (responseJson.message) {
                                    context.setState({resultMessage: responseJson.message});
                                } else {
                                    responseJson.forEach(function (connection) {

                                        if (connection.degrees <= context.state.connectionDegrees) {
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
            button = <Button variant="contained" color="primary" onClick={this.onFindClicked}>
                FIND
            </Button>
        }

        let nodes;

        if (this.state.data.links.length > 0) {

            nodes = <D3Graph data={this.state.data}/>
        }


        return (
            <div>
                <UsernameForm onUsernameTyped={this.onUsernameTyped} onDegreesSelected={this.onDegreesSelected}/>
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
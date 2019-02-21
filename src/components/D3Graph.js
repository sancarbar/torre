import {Graph} from 'react-d3-graph';
import React, {Component} from 'react';


export class D3Graph extends Component {

    constructor(props) {
        super(props);
        this.onClickNode = this.onClickNode.bind(this)
    }

    myConfig = {
        nodeHighlightBehavior: true,
        width: 1800,
        height: 600,
        focusZoom: 5,
        node: {
            color: 'orange',
            size: 120,
            highlightStrokeColor: 'red',
            renderLabel: true,
        },
        link: {
            highlightColor: 'red'
        }
    };

// graph event callbacks


    onClickNode = function (nodeId) {

        this.props.data.nodes.forEach(function (connection) {
            if (connection.id === nodeId) {
                window.alert(`${nodeId} \n \n ${connection.info}`);
                return
            }
        });
    };


    onClickLink = function (source, target) {
        window.alert(`Clicked link between ${source} and ${target}`);
    };


    render() {
        return (
            <Graph
                id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
                data={this.props.data}
                config={this.myConfig}
                onClickNode={this.onClickNode}
                onClickLink={this.onClickLink}
            />
        )
    }


}
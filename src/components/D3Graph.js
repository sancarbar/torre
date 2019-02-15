import {Graph} from 'react-d3-graph';
import React, {Component} from 'react';


export class D3Graph extends Component {


// graph payload (with minimalist structure)

    data = {
        nodes: [{id: 'Harry'}, {id: 'Sally'}, {id: 'Alice'}],
        links: [{source: 'Harry', target: 'Sally'}, {source: 'Harry', target: 'Alice'}]
    };

// the graph configuration, you only need to pass down properties
// that you want to override, otherwise default ones will be used

    myConfig = {
        nodeHighlightBehavior: true,
        node: {
            color: 'lightgreen',
            size: 120,
            highlightStrokeColor: 'blue'
        },
        link: {
            highlightColor: 'lightblue'
        }
    };

// graph event callbacks

    onClickGraph = function () {
        window.alert(`Clicked the graph background`);
    };


    onClickNode = function (nodeId) {
        window.alert(`Clicked node ${nodeId}`);
    };


    onRightClickNode = function (event, nodeId) {
        window.alert(`Right clicked node ${nodeId}`);
    };


    onClickLink = function (source, target) {
        window.alert(`Clicked link between ${source} and ${target}`);
    };


    onRightClickLink = function (event, source, target) {
        window.alert(`Right clicked link between ${source} and ${target}`);
    };



    render() {
        return (
            <Graph
                id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
                data={this.props.data}
                config={this.myConfig}
                onClickNode={this.onClickNode}
                onRightClickNode={this.onRightClickNode}
                onClickGraph={this.onClickGraph}
                onClickLink={this.onClickLink}
                onRightClickLink={this.onRightClickLink}
            />
        )
    }


}
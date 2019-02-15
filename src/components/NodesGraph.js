import React, {Component} from 'react';
import {InteractiveForceGraph, ForceGraphNode, ForceGraphLink} from 'react-vis-force';

export class NodesGraph extends Component {

    render() {

        let nodes

        nodes = this.props.connections.map((connection, index) =>
            [<ForceGraphNode key={index} node={{id: index + '-node', label: connection.person.name}} fill="blue"/>,
                <ForceGraphLink link={{source: index + '-node', target: 'user-node'}}/>]
        );


        return (
            <InteractiveForceGraph
                simulationOptions={{height: 2000, width: 2000}}
                labelAttr="label"
                onSelectNode={(node) => console.log(node)}
                highlightDependencies>

                <ForceGraphNode node={{id: 'user-node', label: this.props.username}} fill="orange"/>

                {nodes}

            </InteractiveForceGraph>
        );
    }


}
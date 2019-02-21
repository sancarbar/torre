import {Graph} from 'react-d3-graph';
import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Avatar from '@material-ui/core/Avatar';
import "./d3-graph.css"

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

export class D3Graph extends Component {

    constructor(props) {
        super(props);
        this.state = {openDialog: false, dialogTitle: "", dialogMessage: "", imageUrl: ""};
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
        let context = this;
        this.props.data.nodes.forEach(function (connection) {
            if (connection.id === nodeId) {
                context.setState({
                    dialogTitle: nodeId,
                    dialogMessage: connection.info,
                    imageUrl: connection.svg,
                    openDialog: true
                });
                return
            }
        });
    };


    onClickLink = function (source, target) {
        window.alert(`Clicked link between ${source} and ${target}`);

    };

    handleClose = () => {
        this.setState({openDialog: false});
    };


    render() {
        return (
            <>
                <Graph
                    id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
                    data={this.props.data}
                    config={this.myConfig}
                    onClickNode={this.onClickNode}
                    onClickLink={this.onClickLink}
                />
                <Dialog
                    open={this.state.openDialog}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description">

                    <DialogTitle id="alert-dialog-slide-title">
                        {this.state.dialogTitle}
                    </DialogTitle>
                    <DialogContent>
                        <Avatar alt={this.state.dialogTitle} src={this.state.imageUrl} className="avatar"/>
                        <DialogContentText id="alert-dialog-slide-description">
                            {this.state.dialogMessage}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            CLOSE
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        )
    }


}
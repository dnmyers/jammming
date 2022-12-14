import React from "react";

import './Track.css';

class Track extends React.Component {
    constructor(props) {
        super(props);

        this.renderAction = this.renderAction.bind(this);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
    }

    renderAction(isRemoval) {
        // displays a button element with - as its content if the isRemoval property is true,
        // and a + <button> element if the isRemoval property is false.
        // Set the class name to Track-action
        if(isRemoval) {
            return <button className="Track-action" onClick={this.removeTrack}>-</button>
        } else {
            return <button className="Track-action" onClick={this.addTrack}>+</button>
        }
    }

    addTrack() {
        // add this.props.track to the playlist
        this.props.onAdd(this.props.track);
    }

    removeTrack() {
        // remove this.props.track from the playlist
        this.props.onRemove(this.props.track);
    }

    render() {
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist} | {this.props.track.album}</p>
                </div>
                <button className="Track-action" onClick={this.addTrack}>{this.renderAction(this.props.isRemoval)}</button>
            </div>
        );
    }
}

export default Track;
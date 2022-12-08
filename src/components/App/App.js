import React from "react";
import './App.css';

import SearchBar from "../SearchBar/SearchBar";
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Footer from '../Footer/Footer';

import Spotify from '../../util/Spotify';


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchResults: [],
            playlistName: 'My Playlist',
            playlistTracks: []
        }

        // BIND this
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
        this.savePlaylist = this.savePlaylist.bind(this);
        this.search = this.search.bind(this);
    }

    // // ADD TRACK
    addTrack(track) {
        if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
            return;
        } 

        // the following line is the same as this:
        // this.setState({
        //  playlistTracks: this.state.playlistTracks.concat(track)
        // });
        this.setState({ playlistTracks: [...this.state.playlistTracks, track] });
    }

    // below is from walkthrough video
    // addTrack(track) {
    //     let tracks = this.state.playlistTracks;

    //     if(tracks.find(savedTrack => savedTrack.id === track.id)) {
    //         return;
    //     }

    //     tracks.push(track);
    //     this.setState({ playlistTracks: tracks });
    // }

    // // REMOVE TRACK
    removeTrack(track) {
        this.setState({
            playlistTracks: this.state.playlistTracks.filter(t => t.id !== track.id)
        })
    }

    // below is from walkthrough video
    // removeTrack(track) {
    //     let tracks = this.state.playlistTracks;

    //     tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);

    //     this.setState({ playlistTracks: tracks });
    // }

    // UPDATE PLAYLIST NAME
    updatePlaylistName(name) {
        this.setState({ playlistName: name });
    }

    // SAVE PLAYLIST
    savePlaylist() {
        const trackURIs = this.state.playlistTracks.map(track => track.uri);

        Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
            this.setState({
                playlistName: 'New Playlist',
                playlistTracks: []
            })
        })
    }

    // SEARCH
    search(term) {
        console.log(term);

        Spotify.search(term).then(searchResults => {
            this.setState({ searchResults: searchResults });
        });
    }

    // RENDER COMPONENT
    render() {
        return (
            <div>
                <h1>Ja<span className="highlight">mmm</span>ing</h1>
                <div className="App">
                    <SearchBar onSearch={this.search} />
                    <div className="App-playlist">
                        <SearchResults
                            searchResults={this.state.searchResults}
                            onAdd={this.addTrack}
                        />
                        <Playlist
                            playlistName={this.state.playlistName}
                            playlistTracks={this.state.playlistTracks}
                            onNameChange={this.updatePlaylistName}
                            onRemove={this.removeTrack}
                            onSave={this.savePlaylist}
                        />
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default App;

// Client ID: f1b58fbb435f44a28aa866b0aaf93a88
// Client Secret: 467b34493b8a47bba6cd9a3f3276af18

// TEST STATE
        // this.state = {
        //     searchResults: [{
        //         name: 'Tiny Dancer',
        //         artist: 'Elton John',
        //         album: 'Madman Across The Water',
        //         id: '1'
        //     }, {
        //         name: 'Tiny Dancer',
        //         artist: 'Tim McGraw',
        //         album: 'Love Story',
        //         id: '2'
        //     }, {
        //         name: 'Tiny Dancer',
        //         artist: 'Rockabye Baby!',
        //         album: 'Lullaby Renditions of Elton John',
        //         id: '3'
        //     }],
        //     playlistName: 'Playlist 1',
        //     playlistTracks: [{
        //         name: 'Tiny Dancer',
        //         artist: 'Elton John',
        //         album: 'Madman Across The Water',
        //         id: '1'
        //     }, {
        //         name: 'Tiny Dancer',
        //         artist: 'Tim McGraw',
        //         album: 'Love Story',
        //         id: '2'
        //     }, {
        //         name: 'Tiny Dancer',
        //         artist: 'Rockabye Baby!',
        //         album: 'Lullaby Renditions of Elton John',
        //         id: '3'
        //     }]
        // };
import React, { Component } from 'react';
import albumData from './../data/album';
import PlayerBar from './playerBar';


class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album,
      currentSong: album.songs[0],
      isPlaying: false,
      currentTime: 0,
      duration: album.songs[0].duration,
      currentVolume: 0.80
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;

  }

  componentDidMount(){
    this.eventListeners = {
      timeupdate: e => {
        this.setState({currentTime: this.audioElement.currentTime});
      },
      durationchange: e => {
        this.setState({duration: this.audioElement.duration});
      }
    };
    this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
  }

  componentWillUnmount() {
    this.audioElement.src = null;
    this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
  }

  play(){
    this.audioElement.play();
    this.setState({ isPlaying: true });
  }

  pause(){
    this.audioElement.pause();
    this.setState({ isPlaying: false });
  }

  setSong(song){
    this.audioElement.src = song.audioSrc;
    this.setState( {currentSong: song} );
  }

  handleSongClick(song){
    var isSameSong = this.state.currentSong === song;
    if(this.state.isPlaying && isSameSong){
      this.pause();
    }else{
      if (!isSameSong) { this.setSong(song); }
      this.play();
    }
  }

  handlePrevClick(){
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.max(0, currentIndex - 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play(newSong);
  }

  handleNextClick(){
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    if(currentIndex === this.state.album.songs.length - 1) {
      return;
    }else{
    const newIndex = currentIndex + 1
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play(newSong);
    }
  }

  handleTimeChange(e){
    const newTime = this.audioElement.duration * e.target.value;
    this.audioElement.currentTime = newTime;
    this.setState( { currentTime: newTime });
  }

  handleVolumeChange(e){
    const adjVolume = this.audioElement.volume = e.target.value;
    this.audioElement.volume = adjVolume;
    this.setState( {currentVolume: adjVolume });
  }

  handleMute(e){
    const prevVolume = this.state.currentVolume;
    if(this.audioElement.volume === 0){
      const unMute = prevVolume;
      this.audioElement.volume = unMute;
      this.setState( {currentVolume: unMute})
    }else{
    const muteVolume = this.audioElement.volume = 0;
    this.audioElement.volume = muteVolume;
    }
  }

  formatTime(seconds){
    if(isNaN(seconds) === true){ return "-:--"}
      const min = Math.floor(seconds / 60);
      const sec = (seconds - min * 60) * 0.01;
      const minSec = min + sec;
      return minSec.toFixed(2);

    }

  render(){
    return (
      <section className="Album">
        <section id="album-info">
          <img id="album-cover-art" src={this.state.album.albumCover} alt="album cover art" />
          <div className="album-details">
            <h1 id="album-title">{this.state.album.title}</h1>
            <h2 className="artist">{this.state.album.artist}</h2>
            <div id="release-info">{this.state.album.releaseInfo} </div>
          </div>
        </section>
        <table id="song-list">
          <colgroup>
            <col id="song-number-column" />
            <col id="song-title-column" />
            <col id="song-duration-column" />
          </colgroup>
          <tbody>
          {
            this.state.album.songs.map((song, index) =>
            <tr className={this.state.isPlaying && this.state.currentSong === song ? 'playing':'paused'} key={index} onClick={() => this.handleSongClick(song)}>
              <td className={this.state.currentSong === song && this.audioElement.paused ? 'paused':'playing'}>
              <button>
                  <span className="song-number">{index +1}</span>
                  <span className="ion-play"></span>
                  <span className="ion-pause"></span>
                  </button>
              </td>
              <td className="song-title">{song.title}</td>
              <td className="song-duration">{this.formatTime(song.duration)}</td>
            </tr>
            )
          }
          </tbody>
        </table>
        <PlayerBar
        isPlaying={this.state.isPlaying}
        currentSong={this.state.currentSong}
        currentTime={this.audioElement.currentTime}
        duration={this.audioElement.duration}
        currentVolume={this.state.currentVolume}
        handleSongClick={ () => this.handleSongClick(this.state.currentSong) }
        handlePrevClick={ () => this.handlePrevClick() }
        handleNextClick={ () => this.handleNextClick() }
        handleTimeChange={ (e) => this.handleTimeChange(e) }
        handleVolumeChange={ (e) => this.handleVolumeChange(e) }
        handleMute={ (e) => this.handleMute(e) }
        formatTime={ (seconds) => this.formatTime(seconds) }
        audioElement={this.audioElement}
        />
      </section>
    );
  }
}

export default Album;

import React, { Component } from 'react';
import albumData from './../data/album';
import { Link } from 'react-router-dom';

class Library extends Component {
  constructor(props){
    super(props);
    this.state = {
      album: albumData
    };
  }


  render() {
    return (
      <section className="Library">
      {
        this.state.album.map((album, index) =>
          <Link to={`/album/${album.slug}`}key={index}>
          <div className="album-art">
          <img className="album-img" src={album.albumCover} alt={album.title} />
          <div className="album-info"> {album.title} </div>
          <div className="album-info"> {album.artist} </div>
          <div className="album-info"> {album.songs.length} songs </div>
          </div>
          </Link>
        )
      }
      </section>
    );
  }
}

export default Library;

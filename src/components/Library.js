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
          <img className="album-img" src={album.albumCover} alt={album.title} />
          <div> {album.title} </div>
          <div> {album.artist} </div>
          <div> {album.songs.length} songs </div>
          </Link>
        )
      }
      <div className="album-img-empt"></div>
      </section>
    );
  }
}

export default Library;

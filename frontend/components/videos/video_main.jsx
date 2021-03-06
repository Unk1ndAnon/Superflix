import React from 'react';
import VideoPlayerContainer from '../video_player/video_player_container';
import { Link } from 'react-router-dom';

export default class VideoMain extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      muted: true
    };

    this.toggleMute = this.toggleMute.bind(this);
    this.toggleList = this.toggleList.bind(this);
  }

  getGenreNames() {
    const { video, genres } = this.props;

    let genreNames = video.genreIds.map(id => (
      genres[id].name
    )).slice(0, 4);

    return genreNames.join(", ");
  }

  toggleMute(e) {
    e.preventDefault();

    let videoEl = document.getElementsByClassName("main-video-player-video")[0];

    this.setState({
      muted: !this.state.muted
    });

    videoEl.muted = !videoEl.muted;
  }

  toggleList(e) {
    e.preventDefault();
    const { watched, video } = this.props;

    if (watched) {
      this.props.deleteFromList(video.id);
    } else {
      this.props.addToList(video.id);
    }
  }

  render() {
    const { video, watched } = this.props;
    const { muted } = this.state;

    let formattedDuration = `${Math.floor(video.duration / 60)}h ${video.duration % 60}m`;
    let videoPlayer = <VideoPlayerContainer video={video} type="mainPlayer" visibility="visible" />;
    //let videoEl = document.getElementsByClassName("main-video-player-video")[0];

    let volumeButton = muted ? (
      <button onClick={this.toggleMute}>
        <i className="material-icons">volume_off</i>
      </button>
    ) : (
      <button onClick={this.toggleMute}>
        <i className="material-icons">volume_up</i>
      </button>
    );

    let myListButtonClass = watched ? "fas fa-check" : "fas fa-plus";

    return (
      <section className={`main-video-details-container`}>
        {videoPlayer}

        <img className="main-video-logo" src={video.logo} />
        {/* <img className="main-video-logo" src={window.logo} /> */}

        <section className="main-video-details">
          <section className="info">
            <h2>{video.title}</h2>
            <h2>{video.year}, {formattedDuration}</h2>
            <h2>Genres: {this.getGenreNames()}</h2>
          </section>

          <section className="description">
            <p>{video.description}</p>
          </section>

          <section className="buttons">
            <Link to={`/watch/${video.id}`}>
              <button className="play">
                <i className="fas fa-play"></i> Play
              </button>
            </Link>

            <Link to="#">
              <button className="my-list" onClick={this.toggleList}>
                <i className={myListButtonClass}></i> My List
              </button>
            </Link>
          </section>

          <aside>
            {volumeButton}
            <div className="rating"><span>{video.maturity_rating}</span></div>
          </aside>
        </section>
      </section>
    );
  }
}
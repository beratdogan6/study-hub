import React, { Component } from 'react';

class MyAudioPlayer extends Component {
  constructor(props) {
    super(props);
    this.audioRef = React.createRef();
    this.state = {
      volume: 0,
    };
  }

  componentDidMount() {
    this.audioRef.current.volume = this.state.volume;
    this.audioRef.current.play();
  }

  handleVolumeChange = (e) => {
    const volume = e.target.value;
    this.setState({ volume }, () => {
      this.audioRef.current.volume = volume;
    });
  };

  render() {
    const { volume } = this.state;

    return (
      <div>
        <video className='hidden' controls autoPlay ref={this.audioRef}>
          <source src="/rain.mp3" type="audio/mpeg" />
          Tarayıcınız ses etiketini desteklemiyorsa, bu metni görüntüler.
        </video>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={this.handleVolumeChange}
        />
      </div>
    );
  }
}

export default MyAudioPlayer;

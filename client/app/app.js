import playlist from './mocks/playlist';
import setStyles from './components/progress-bar/progress-bar.utility';
import createProgressBar from './components/progress-bar/progress-bar';
import createButtonsContainer from './components/button-container/button-container';
import createPlaylistContainer from './components/playlist-container/playlist-container';

const appElement = document.querySelector('#app');

const app = () => {
  let mounted = false;
  let audioInstance;
  let progressBarInterval;

  let state = {
    playlist,
    play: false,
    pause: false,
    stop: false,
    currentSong: 0,
    percentage: 0,
  };

  const init = () => {
    render();
  };

  // ============setState==================

  const setState = (newState) => {
    state = { ...state, ...newState };

    render();
  };

  // ============Events on update and mount===============

  const didUpdate = () => {
    if (audioInstance.src !== state.playlist[state.currentSong].url) {
      audioInstance.setAttribute('src', state.playlist[state.currentSong].url);
    }

    if (state.play) {
      audioInstance.play();
    }

    if (state.pause) {
      audioInstance.pause();
    }

    if (state.stop) {
      audioInstance.pause();
      audioInstance.currentTime = 0;
    }

    styleProgressBarLine();
  };

  const didMount = () => {
    createAudio();
  };

  const createAudio = () => {
    audioInstance = new Audio();
    audioInstance.setAttribute('src', state.playlist[state.currentSong].url);
    audioInstance.addEventListener('ended', handleAudioEnded);
  };

  // =============Events==================
  const handleProgressBarIntervalChange = () => {
    styleProgressBarLine();
  };

  const handlePreviousButtonClick = () => {
    const isFirst = state.currentSong === 0;
    const index = !isFirst ? state.currentSong - 1 : state.playlist.length - 1;

    setState({
      currentSong: index,
    });
  };

  const startProgressBarInterval = () => {
    progressBarInterval = window.setInterval(
      handleProgressBarIntervalChange,
      200,
    );
  };

  const handlePlayButtonClick = () => {
    startProgressBarInterval();

    setState({
      play: true,
      pause: false,
      stop: false,
      audioEnded: false,
    });
  };

  const handlePauseButtonClick = () => {
    window.clearInterval(progressBarInterval);

    setState({
      pause: true,
      play: false,
      stop: false,
    });
  };

  const handleStopButtonClick = () => {
    setState({
      pause: false,
      play: false,
      stop: true,
    });
  };

  const handleNextButtonClick = () => {
    const isLast = state.playlist.length - 1 === state.currentSong;
    const index = !isLast ? state.currentSong + 1 : 0;

    setState({
      currentSong: index,
    });
  };

  const handlePlaylistItemClick = (index) => {
    startProgressBarInterval();

    setState({
      currentSong: index,
      play: true,
      pause: false,
      stop: false,
    });
  };

  const handleAudioEnded = () => {
    window.clearInterval(progressBarInterval);

    setState({
      play: false,
      pause: false,
      stop: false,
      audioEnded: true,
    });
  };

  // =============Render==================

  const render = () => {
    appElement.innerHTML = '';

    const container = document.createElement('div');
    container.classList.add('container');

    const buttonEvents = {
      handlePreviousButtonClick,
      handlePlayButtonClick,
      handlePauseButtonClick,
      handleNextButtonClick,
      handleStopButtonClick,
    };

    const playlistContainer = createPlaylistContainer(state, handlePlaylistItemClick);
    const buttonsContainer = createButtonsContainer(state, buttonEvents);
    const progressBar = createProgressBar(handlePlayButtonClick);

    const elements = [playlistContainer, progressBar, buttonsContainer];

    elements.forEach((element) => {
      container.appendChild(element);
    });

    appElement.appendChild(container);

    if (mounted) {
      didUpdate();
    }

    if (!mounted) {
      mounted = true;
      didMount();
    }
  };

  const styleProgressBarLine = () => {
    const progressBarLine = document.querySelector('.progress-bar__line');
    const percentage = !state.audioEnded
      ? (audioInstance.currentTime / audioInstance.duration) * 100
      : 0;

    setStyles(progressBarLine, {
      width: `${percentage}%`,
    });
  };

  init();
};

export default app();

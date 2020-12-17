const createProgressBar = (handlePlayButtonClick) => {
  const progressBarParent = document.createElement('div');
  progressBarParent.classList.add('progress-bar-container');

  const progressBar = document.createElement('div');
  progressBar.classList.add('progress-bar');

  const progressBarLine = document.createElement('div');
  progressBarLine.classList.add('progress-bar__line');

  progressBarLine.addEventListener('durationchange', handlePlayButtonClick);

  progressBar.appendChild(progressBarLine);
  progressBarParent.appendChild(progressBar);

  return progressBarParent;
};

export default createProgressBar;

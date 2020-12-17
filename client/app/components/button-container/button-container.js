import createButton from './create-button';

const createButtonsContainer = (state, buttonEvents) => {
  const buttonsContainer = document.createElement('div');
  buttonsContainer.classList.add('button-container');

  const buttons = [
    {
      text: '&#11244;',
      event: buttonEvents.handlePreviousButtonClick,
    },
    {
      text: '&#10074;&#10074;',
      event: buttonEvents.handlePauseButtonClick,
      active: state.pause,
    },
    {
      text: '&#11208;',
      event: buttonEvents.handlePlayButtonClick,
      active: state.play,
    },
    {
      text: '&#9724;',
      event: buttonEvents.handleStopButtonClick,
      active: state.stop,
    },
    {
      text: '&#11246;',
      event: buttonEvents.handleNextButtonClick,
    },
  ];

  buttons.forEach((button) => {
    const { text, event, active } = button;
    const newButton = createButton(text, event, active);
    buttonsContainer.appendChild(newButton);
  });

  return buttonsContainer;
};

export default createButtonsContainer;

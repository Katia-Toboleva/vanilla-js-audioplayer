const createButton = (text, event, active) => {
  const button = document.createElement('button');
  button.classList.add('button');

  const buttonIcon = document.createElement('button__icon');
  buttonIcon.classList.add('button__icon');
  buttonIcon.innerHTML = text;

  button.appendChild(buttonIcon);

  if (active) {
    button.classList.add('button--active');
  }

  button.addEventListener('click', event);
  return button;
};

export default createButton;

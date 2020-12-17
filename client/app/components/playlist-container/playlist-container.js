const createPlaylistContainer = (state, handlePlaylistItemClick) => {
  const playlistContainer = document.createElement('div');
  playlistContainer.classList.add('playlist');

  state.playlist.forEach((item, index) => {
    const playlistItem = document.createElement('div');
    playlistItem.classList.add('playlist__item');

    if (state.currentSong === index) {
      playlistItem.classList.add('playlist__item--active');
    }

    const playlistItemImage = document.createElement('div');
    playlistItemImage.classList.add('playlist__item__image');
    playlistItemImage.style.backgroundImage = `url(${item.image})`;

    const playlistItemDetails = document.createElement('div');
    playlistItemDetails.classList.add('playlist__item__details');

    const playlistItemName = document.createElement('div');
    playlistItemName.classList.add('playlist__item__name');
    playlistItemName.innerText = `${item.name}`;

    const playlistItemArtist = document.createElement('div');
    playlistItemArtist.classList.add('playlist__item__artist');
    playlistItemArtist.innerText = `${item.artist}`;

    const playlistItemExtra = document.createElement('div');
    playlistItemExtra.classList.add('playlist__item__extra');
    playlistItemExtra.innerHTML = '&#8943;';

    playlistItemDetails.appendChild(playlistItemName);
    playlistItemDetails.appendChild(playlistItemArtist);

    playlistItem.appendChild(playlistItemImage);
    playlistItem.appendChild(playlistItemDetails);
    playlistItem.appendChild(playlistItemExtra);

    playlistContainer.appendChild(playlistItem);

    playlistItem.addEventListener('click', () => {
      handlePlaylistItemClick(index);
    });
  });

  return playlistContainer;
};

export default createPlaylistContainer;

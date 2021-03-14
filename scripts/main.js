'use strict';

document.addEventListener('DOMContentLoaded', () => {

  const btnStartGame = document.body.querySelector('.startbox__btn_start');

  prepareGame();

  btnStartGame.addEventListener('click', e => {
    e.preventDefault();
    startGame();
  });


});
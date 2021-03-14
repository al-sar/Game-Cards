'use strict';

let startGame;
let prepareGame;

(() => {

  const mainCardlist = document.body.querySelector('.main__cardlist');
  const mainRange = document.body.querySelector('.main__range');
  const startbox = document.body.querySelector('.startbox');
  const headTimer = document.body.querySelector('.head__timer');
  const formMain = document.body.querySelector('.startbox__form_main');
  const formSettings = document.body.querySelector('.startbox__form_settings');
  const btnSettings = document.body.querySelector('.startbox__btn_settings');
  const btnOk = document.body.querySelector('.startbox__btn_ok');
  const timesetNumber = document.body.querySelector('.startbox__timeset_number');
  const timesetRange = document.body.querySelector('.startbox__timeset_range');
  const startboxDescr = document.body.querySelector('.startbox__descr');
  const stopbox = document.body.querySelector('.stopbox');
  const stopboxMessage = document.body.querySelector('.stopbox__message');
  const btnStopbox = document.body.querySelector('.stopbox__btn');
  const countCard16 = document.body.querySelector('#count_cards_16');
  const countCard12 = document.body.querySelector('#count_cards_12');
  const countCard8 = document.body.querySelector('#count_cards_8');
  const countCard6 = document.body.querySelector('#count_cards_6');
  const countCard4 = document.body.querySelector('#count_cards_4');
  const game1 = document.getElementById('game1');
  const game2 = document.getElementById('game2');
  const game3 = document.getElementById('game3');
  let listNumbers = [1, 2, 3, 4, 5, 6, 7, 8,];
  let listSymbols = ['@', '#', '$', '&', '&#9824;', '&#9827;', '&#9829;', '&#9830;',];
  let listPhotos = [
    '<img src="img/1.jpg"></img>',
    '<img src="img/2.jpg"></img>',
    '<img src="img/3.jpg"></img>',
    '<img src="img/4.jpg"></img>',
    '<img src="img/5.jpg"></img>',
    '<img src="img/6.jpg"></img>',
    '<img src="img/7.jpg"></img>',
    '<img src="img/8.jpg"></img>',
  ];
  let gameTimer;
  let changeTimer;
  let cardList;

  // Функция подготовки игры к запуску:
  prepareGame = () => {

    changeDescrTime();

    btnSettings.addEventListener('click', e => {
      e.preventDefault();
      formMain.classList.add('startbox__form_hide');
      setTimeout(() => {
        formMain.style.display = 'none';
        formSettings.style.display = 'flex';
        formSettings.classList.add('startbox__form_show');
        formMain.classList.remove('startbox__form_hide');
        setTimeout(() => {
          formSettings.classList.remove('startbox__form_show');
        }, 330);
      }, 301);
    });

    btnOk.addEventListener('click', e => {
      e.preventDefault();
      changeDescrTime();
      formSettings.classList.add('startbox__form_hide');
      setTimeout(() => {
        formSettings.style.display = 'none';
        formMain.style.display = 'flex';
        formMain.classList.add('startbox__form_show');
        formSettings.classList.remove('startbox__form_hide');
        setTimeout(() => {
          formMain.classList.remove('startbox__form_show');
        }, 330);
      }, 301);
    });

    timesetNumber.addEventListener('change', () => {
      if (parseInt(timesetNumber.value) > parseInt(timesetNumber.max)) {
        timesetNumber.value = timesetNumber.max;
      }
      if (parseInt(timesetNumber.value) < parseInt(timesetNumber.min)) {
        timesetNumber.value = timesetNumber.min;
      }
    });

    timesetNumber.addEventListener('input', () => {
      timesetRange.value = timesetNumber.value;
    });

    timesetRange.addEventListener('input', () => {
      timesetNumber.value = timesetRange.value;
    });

    btnStopbox.addEventListener('click', () => {
      stopbox.style.display = 'none';
      startbox.style.display = 'flex';
    });

  }

  // Функция запуска игры:
  startGame = () => {
    let countCard = choiceCountCard(); // выбранное пользователем количество карт на игровом поле
    let gameCards = choiceGameCards(); // выбранный пользователем тип карт для игры

    mainCardlist.innerHTML = '';  // очистка игрового поля

    cardList = createCardList(gameCards, countCard);  // создание списка пар на основе выбранного типа и кол-ва карт    
    changeRange(mainRange, countCard, 0);  // сброс индикатора продвижения игры до значения 0
    addCardsToPage(shuffleCards(cardList), mainCardlist); // добавление перемешанных карт на игровое поле
    gameLogic(mainCardlist, cardList.length); // запуск логики игры
    changeStylesForThisGame(countCard); // изменения стилей страницы под выбранное количество карт на поле

    startbox.style.display = 'none';  // скрытие стартового окна (окна запуска игры)

  }

  // Функция изменения стилей страницы под выбранное количество карт на поле:
  const changeStylesForThisGame = countCards => {
    const mainCards = document.body.querySelectorAll('.main__card');
    switch (countCards) {
      case 4:
        mainCardlist.style.minWidth = '40vh';
        mainCardlist.style.width = '64vh';
        mainCards.forEach(card => {
          card.style.maxWidth = '46vw';
          card.style.minWidth = '17.5vh';
          card.style.width = '30vh';
          card.style.height = '40vh';
        });
        break;
      case 6:
        mainCardlist.style.minWidth = '55vh';
        mainCardlist.style.width = '96vh';
        mainCards.forEach(card => {
          card.style.maxWidth = '30.4vw';
          card.style.minWidth = '17vh';
          card.style.width = '30vh';
          card.style.height = '40vh';
        });
        break;
      case 8:
        mainCardlist.style.minWidth = '76vh';
        mainCardlist.style.width = '130vh';
        mainCards.forEach(card => {
          card.style.maxWidth = '22.3vw';
          card.style.minWidth = '17vh';
          card.style.width = '30vh';
          card.style.height = '40vh';
        });
        break;
      case 12:
        mainCardlist.style.minWidth = '52.5vh';
        mainCardlist.style.width = '88vh';
        mainCards.forEach(card => {
          card.style.maxWidth = '22vw';
          card.style.minWidth = '12vh';
          card.style.width = '20vh';
          card.style.height = '26vh';
        });
        break;
      case 16:
      default:
        mainCardlist.style.minWidth = '40vh';
        mainCardlist.style.width = '68.5vh';
        mainCards.forEach(card => {
          card.style.maxWidth = '23vw';
          card.style.minWidth = '8.7vh';
          card.style.width = '15vh';
          card.style.height = '20vh';
        });
    }
  }

  // Функция изменения времени в тексте правил игры:
  const changeDescrTime = () => {

    let gameTime = setGameTime();

    let gameTimeFull = declOfNum(gameTime, ['секунда', 'секунды', 'секунд']);

    startboxDescr.textContent = `Нажмите на кнопку "начать игру" для запуска игры. После начала игры 
        включится таймер обратного отсчёта.У вас будет ${gameTimeFull} чтобы открыть все пары
        карт на игровом поле. Удачи!`;
  }

  // Функция установки времени игры:
  const setGameTime = () => {
    let gameTime = timesetRange.value;
    return gameTime;
  }

  // Универсальная функция, возвращающая число и слово в нужной форме:
  const declOfNum = (n, titles) => {
    return n + ' ' + titles[n % 10 === 1 && n % 100 !== 11 ?
      0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];
  }

  // Функция выбора типа карт для игры (цифры, знаки, фото)
  const choiceGameCards = () => {
    if (game1.checked === true) return listNumbers;
    if (game2.checked === true) return shuffleCards(listSymbols);
    if (game3.checked === true) return shuffleCards(listPhotos);
  }

  // Функция выбора количества карт на поле
  const choiceCountCard = () => {
    if (countCard16.checked === true) return 16;
    if (countCard12.checked === true) return 12;
    if (countCard8.checked === true) return 8;
    if (countCard6.checked === true) return 6;
    if (countCard4.checked === true) return 4;
  }

  // Функция создания чистого элемента card
  const createCard = () => {
    let li = document.createElement('li');
    let divOpenCard = document.createElement('div');
    let divCloseCard = document.createElement('div');
    li.classList.add('main__card');
    divOpenCard.classList.add('main__card_open');
    divCloseCard.classList.add('main__card_close');
    li.append(divOpenCard);
    li.append(divCloseCard);
    return li;
  }

  // Функция формирования списка(массива) элементов card (цифры, символы, фото)
  const createCardList = (cards, count) => {
    let arr = cards.slice(0, (count / 2));
    let cardList = [];
    for (let i = 0; i < (arr.length * 2); i++) {
      let j;
      let li = createCard();
      j = (i < arr.length) ? i : i - arr.length;
      li.key = j;
      li.firstChild.innerHTML = arr[j];
      cardList.push(li);
    }
    return cardList;
  }

  // Функция перемешивания по алг.Фишера и добавления элементов card на страницу
  const shuffleCards = (arr) => {
    for (let i = (arr.length - 1); i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
    return arr;
  }

  // Функция вывода элементов на экран:
  const addCardsToPage = (arr, block) => {
    for (let i = 0; i < arr.length; i++) {
      block.append(arr[i]);
    }
  }

  // Функция логики игры с отслеживанием событий клика по тому или иному элементу списка:
  const gameLogic = (block, numberCards) => {
    let card1 = null;
    let card2 = null;
    let openedCards;
    let timeDelay;
    openedCards = [];
    // Функция определяющая действия, если карты не одинаковые:
    const actionNotMatchedCard = () => {
      changeRange(mainRange, numberCards, (openedCards.length * 2), (96 / numberCards));
      closeCard(card1);
      closeCard(card2);
      card1 = null;
      card2 = null;
    }
    // Функция определяющая действия, если карты одинаковые:
    const actionMatchedCard = () => {
      openedCards.push(card1.key);
      changeRange(mainRange, numberCards, (openedCards.length * 2), (96 / numberCards));
      card1.classList.add('main__card_opened');
      card2.classList.add('main__card_opened');
      card1 = null;
      card2 = null;
      if (numberCards === (openedCards.length * 2)) {
        gameStop('Ура!!! Вы выиграли!!!', 'green');
      }
    }
    // Функция основной логики игры:
    const mainLogic = e => {
      // если происходит клик по 3й карте, а 2 предыдущие не совпали и ещё не перевернулись:
      if ((card1 !== null) && (card2 !== null)) {
        clearTimeout(timeDelay);
        clearInterval(changeTimer);
        actionNotMatchedCard();
      }
      // проверка: 1) был ли клик именно на одной из карт, а не в пустом месте
      //           2) Не добавлен ли ключ этого элемента в список открытых карт
      //           3) Не был ли это повторный клик по той же карте
      //  (просто пропускаем такие клики мимо)
      if ((e.target.parentNode.tagName === 'LI') && (openedCards.indexOf(e.target.parentNode.key) === -1) && (card1 != e.target.parentNode)) {
        openCard(e.target.parentNode);
        clearInterval(changeTimer);
        if (card1 === null) {
          card1 = e.target.parentNode;
          changeRange(mainRange, numberCards, (openedCards.length * 2 + 1), (96 / numberCards));
        } else {
          card2 = e.target.parentNode;
        }
        if (card2 !== null) {
          if (card1.key === card2.key) {
            actionMatchedCard();
          } else {
            timeDelay = setTimeout(actionNotMatchedCard, 1800);
          }
        }
      }
    }
    // Функция остановки игры:
    const gameStop = (message, color) => {
      clearInterval(gameTimer);
      block.removeEventListener('click', mainLogic);
      setTimeout(() => {
        stopboxMessage.textContent = message;
        stopboxMessage.style.color = color;
        stopbox.style.display = 'flex';
      }, 300);
    }
    // Функция старта таймера:
    const startTimer = (time) => {
      let separator;
      separator = ((time % 60) > 9) ? ':' : ':0';
      headTimer.textContent = (Math.floor(time / 60)) + separator + (time % 60);
      gameTimer = setInterval(() => {
        separator = (((parseInt(headTimer.textContent.slice(2))) > 10) || ((parseInt(headTimer.textContent.slice(2))) === 0)) ? ':' : ':0';
        if ((parseInt(headTimer.textContent.slice(0, 1)) > 0) || (parseInt(headTimer.textContent.slice(2)) > 1)) {
          if ((parseInt(headTimer.textContent.slice(2))) === 0) {
            headTimer.textContent = (parseInt(headTimer.textContent.slice(0, 1)) - 1) + separator + '59';
          } else {
            headTimer.textContent = parseInt(headTimer.textContent.slice(0, 1)) + separator + (parseInt(headTimer.textContent.slice(2)) - 1);
          }
        } else {
          headTimer.textContent = parseInt(headTimer.textContent.slice(0, 1)) + separator + (parseInt(headTimer.textContent.slice(2)) - 1);
          gameStop('Увы!!! Вы проиграли!!!', 'red');
        }
      }, 1000);
    }

    startTimer(setGameTime());

    block.addEventListener('click', mainLogic);
  }

  // Функция открытия карточки - (смена класса, контента + CSS анимация)
  const openCard = (card) => {
    card.firstChild.style.transform = 'rotateY(0deg)';
    card.lastChild.style.transform = 'rotateY(180deg)';
  }

  // Функция закрытия карточки - (смена класса, контента + CSS анимация)
  const closeCard = (card) => {
    card.firstChild.style.transform = 'rotateY(180deg)';
    card.lastChild.style.transform = 'rotateY(0deg)';
  }

  // Функция продвижения range с анимацией вперёд или назад при открытии и закрытии карточек
  const changeRange = (inputRangeName, maxCards, cards, speed = 6) => {
    let newValue = Math.round(parseInt((inputRangeName.max) / maxCards) * cards);
    let step;
    if ((parseInt(inputRangeName.value) > 10) && (newValue === 0)) {
      inputRangeName.value = 0;
      return;
    }
    changeTimer = setInterval(() => {
      step = (parseInt(inputRangeName.value) > newValue) ? -1 : 1;
      step = (parseInt(inputRangeName.value) === newValue) ? 0 : step;
      if ((parseInt(inputRangeName.value)) === (newValue)) {
        clearInterval(changeTimer);
      } else {
        inputRangeName.value = Math.round(parseInt(inputRangeName.value) + step);
      }
    }, (100 / speed));
  }

})();
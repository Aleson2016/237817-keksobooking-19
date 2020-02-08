'use strict';

var ITEMS_NUMBER = 8;
var MIN_Y = 130;
var MAX_Y = 630;
var MIN_TIME = 12;
var MAX_TIME = 14;

var OFFERS_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var mapOverlay = document.querySelector('.map__overlay');
var maxX = mapOverlay.clientWidth;
var map = document.querySelector('.map');

var getRandomNumber = function (min, max) {
  return (Math.floor(Math.random() * (max - min + 1)) + min);
};

var createRandomList = function (min, max) {
  var numbers = [];

  while (numbers.length < max) {
    var number = getRandomNumber(min, max);
    if (numbers.indexOf(number) === -1) {
      numbers.push(number);
    }
  }
  return numbers;
};

var getRandomItem = function (items) {
  var item = items[Math.floor(Math.random() * items.length)];
  return item;
};

var createRandomArray = function (items) {
  var arr = [];
  var lengthNumber = getRandomNumber(1, items.length);

  while (arr.length < lengthNumber) {
    var arrItem = getRandomItem(items);
    if (arr.indexOf(arrItem) === -1) {
      arr.push(arrItem);
    }
  }
  return arr;
};

var items = [];
var avatarUrlNumbers = createRandomList(1, ITEMS_NUMBER);

for (var i = 0; i < ITEMS_NUMBER; i++) {
  items.push({
    author: {
      avatar: 'img/avatars/user0' + avatarUrlNumbers[i] + '.png',
    },
    location: {
      x: getRandomNumber(0, maxX),
      y: getRandomNumber(MIN_Y, MAX_Y)
    },
    offer: {
      title: '',
      address: location.x + ', ' + location.y,
      price: +Number,
      type: getRandomItem(OFFERS_TYPES),
      rooms: +Number,
      guests: +Number,
      checkin: '' + getRandomNumber(MIN_TIME, MAX_TIME) + ':00',
      checkout: '' + getRandomNumber(MIN_TIME, MAX_TIME) + ':00',
      features: createRandomArray(FEATURES),
      description: '',
      photos: createRandomArray(PHOTOS)
    }
  });
}

map.classList.remove('map--faded');

var templatePin = document.querySelector('#pin').content.querySelector('button');
var fragment = document.createDocumentFragment();

for (var j = 0; j < items.length; j++) {
  var element = templatePin.cloneNode(true);
  element.style.left = items[j].location.x + 25 + 'px';
  element.style.top = items[j].location.y + 70 + 'px';
  element.querySelector('img').src = items[j].author.avatar;
  element.querySelector('img').alt = items[j].offer.title;

  fragment.appendChild(element);
}

var mapPins = document.querySelector('.map__pins');

mapPins.appendChild(fragment);

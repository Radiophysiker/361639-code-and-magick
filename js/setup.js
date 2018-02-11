'use strict';

var WIZARD_OPTION = {
  NAMES: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  SURNAMES: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  COAT_COLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  EYES_COLORS: ['black', 'red', 'blue', 'yellow', 'green'],
  FIREBALL_COLORS: ['rgb(238, 72, 48)', 'rgb(48, 168, 238)', 'rgb(92, 230, 192)', 'rgb(232, 72, 213)', 'rgb(230, 232, 72)']
};
var NUMBER_WIZARD = 4;

var KEY_CODE = {
  ESC: 27,
  ENTER: 13
};

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');

var setupWizard = setup.querySelector('.setup-wizard');
var setupWizardCoat = setupWizard.querySelector('.wizard-coat');
var setupWizardEyes = setupWizard.querySelector('.wizard-eyes');
var setupFireballWrap = setup.querySelector('.setup-fireball-wrap');

var userNameInput = setup.querySelector('.setup-user-name');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === KEY_CODE.ESC) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
  userNameInput.addEventListener('keydown', onUserNameInputEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
  userNameInput.removeEventListener('keydown', onUserNameInputEscPress);
};

var onUserNameInputEscPress = function (evt) {

  if (evt.keyCode === KEY_CODE.ESC) {
    evt.stopPropagation();
  }
};

var getNextElement = function (array, elem) {
  var i = array.indexOf(elem);
  if (i === -1) {
    return array[1];
  } else if (i < (array.length - 1)) {
    return array[i + 1];
  } else {
    return array[0];
  }
};

var randomIndex = function (array) {
  return Math.floor(Math.random() * (array.length - 1));
};

var renderWizard = function (wizard) {
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

var getRgbFrombackground = function (parBackground) {
  var n = parBackground.indexOf(') ');
  if (n > 0) {
    parBackground = parBackground.substr(0, n + 1);
  }
  return parBackground;
};

var cloneWizard = function () {
  var similarListElement = document.querySelector('.setup-similar-list');
  var fragment = document.createDocumentFragment();
  var wizards = [];
  for (var i = 0; i < NUMBER_WIZARD; i++) {
    wizards[i] = {
      name: WIZARD_OPTION.NAMES[randomIndex(WIZARD_OPTION.NAMES)] + ' ' + WIZARD_OPTION.SURNAMES[randomIndex(WIZARD_OPTION.SURNAMES)],
      coatColor: WIZARD_OPTION.COAT_COLORS[randomIndex(WIZARD_OPTION.COAT_COLORS)],
      eyesColor: WIZARD_OPTION.EYES_COLORS[randomIndex(WIZARD_OPTION.EYES_COLORS)]
    };
    fragment.appendChild(renderWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KEY_CODE.ENTER) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KEY_CODE.ENTER) {
    closePopup();
  }
});
cloneWizard();
setupWizardCoat.addEventListener('click', function () {
  setupWizardCoat.style.fill = getNextElement(WIZARD_OPTION.COAT_COLORS, setupWizardCoat.style.fill);
});

setupWizardEyes.addEventListener('click', function () {
  setupWizardEyes.style.fill = getNextElement(WIZARD_OPTION.EYES_COLORS, setupWizardEyes.style.fill);
});

setupFireballWrap.addEventListener('click', function () {
  setupFireballWrap.style.background = getNextElement(WIZARD_OPTION.FIREBALL_COLORS, getRgbFrombackground(setupFireballWrap.style.background));
});

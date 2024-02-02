import './index.css';
const currency = document.querySelectorAll('.currency');
const price = document.querySelectorAll('.number');

const courseDollarToRuble = 90;
const coursRubleToEuro = 0.01;
const coursEuroToDollar = 1.08;

window.addEventListener('load', () => {
  const price = document.querySelectorAll('.price');
  let time = 0;
  price.forEach((elem) => {
    setTimeout(() => elem.classList.add('price-visibil'), Number(`${time}000`));
    time += 1;
  });
});

const arrCurrency = ['$', '₽', '€'];

const changeLabelCurrency = (value, arr, elemArr) => {
  const indexCurrency = arr.indexOf(value);
  if (indexCurrency != -1) {
    arr.splice(indexCurrency, 1);
    arr.push(value);
    elemArr.forEach((elem) => {
      elem.textContent = arr[0];
    });
  }
};
const changePrice = (arrElem, value) => {
  arrElem.forEach((elem) => {
    let newPrice = 0;
    switch (value) {
      case '$':
        newPrice = courseDollarToRuble * elem.textContent;
        break;
      case '₽':
        newPrice = coursRubleToEuro * elem.textContent;
        break;
      case '€':
        newPrice = coursEuroToDollar * elem.textContent;
        break;
      default:
        newPrice = 0;
        break;
    }
    elem.textContent = Math.floor(newPrice);
  });
};
const changeCurrency = (evt) => {
  const currentCurrency = evt.target.textContent;
  changeLabelCurrency(currentCurrency, arrCurrency, currency);
  changePrice(price, currentCurrency);
};

currency.forEach((elem) => {
  elem.addEventListener('click', (evt) => changeCurrency(evt));
});

import './index.css';
const currency = document.querySelectorAll('.dollar');
const price = document.querySelectorAll('.number');
const courseDollar = 91;
const coursEuro = 98;
const coursRuble = 1;

window.addEventListener('load', () => {
  const price = document.querySelectorAll('.price');
  let time = 0;
  price.forEach((elem) => {
    setTimeout(() => elem.classList.add('price-visibil'), Number(`${time}000`));
    time += 1;
  });
});

const arrCurrency = ['$', '₽', '€'];

const changeCurrency = (evt) => {
  const currentCurrency = evt.target.textContent;

  const indexCurrency = arrCurrency.indexOf(currentCurrency);
  if (indexCurrency != -1) {
    arrCurrency.splice(indexCurrency, 1);
    arrCurrency.push(currentCurrency);
    currency.forEach((elem) => {
      elem.textContent = arrCurrency[0];
    });
    price.forEach((elem) => {
      let newPrice = 0;
      switch (currentCurrency) {
        case '$':
          if (courseDollar > coursRuble) {
            newPrice = courseDollar * elem.textContent;
          } else {
            newPrice = coursRuble / elem.textContent;
          }
          break;
        case '₽':
          if (coursEuro > courseDollar) {
            newPrice = elem.textContent / courseDollar;
          } else {
            newPrice = courseDollar * elem.textContent;
          }
          break;
        case '€':
          if (coursEuro > coursRuble) {
            newPrice = elem.textContent / coursEuro;
          } else {
            newPrice = coursEuro * elem.textContent;
          }
          break;
        default:
          newPrice = 0;
          break;
      }
      elem.textContent = Math.floor(newPrice);
    });
  }
};

currency.forEach((elem) => {
  elem.addEventListener('click', (evt) => changeCurrency(evt));
});

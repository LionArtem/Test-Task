import './index.css';
const currency = document.querySelectorAll('.currency');
const price = document.querySelectorAll('.number');
const period = document.querySelectorAll('.period');

const getOdjValue = (arr) => {
  const obj = {};
  for (let index = 0; index < arr.length; index++) {
    obj[`dollar${index}`] = arr[index].textContent;
  }
  return obj;
};

const listPriceDollars = getOdjValue(price);
let listCurrentPrice = getOdjValue(price);

const courseDollarToRuble = 90;
const coursDollarToEuro = 0.93;

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

const changePrice = (arrElem, value, dollars) => {
  arrElem.forEach((elem, i) => {
    let newPrice = 0;
    switch (value) {
      case '$':
        newPrice = courseDollarToRuble * dollars[`dollar${i}`];
        break;
      case '₽':
        newPrice = coursDollarToEuro * dollars[`dollar${i}`];
        break;
      case '€':
        newPrice = dollars[`dollar${i}`];
        break;
      default:
        newPrice = 0;
        break;
    }
    elem.textContent = Math.round(newPrice);
  });
  listCurrentPrice = getOdjValue(document.querySelectorAll('.number'));
};

const changeCurrency = (evt, dollars) => {
  const currentCurrency = evt.target.textContent;
  changeLabelCurrency(currentCurrency, arrCurrency, currency);
  changePrice(price, currentCurrency, dollars);
};

const chengeTextPeriod = (evt) => {
  const text = evt.target.textContent;
  period.forEach((elem) => {
    if (text === '/Months') {
      elem.textContent = '/Day';
    } else {
      elem.textContent = '/Months';
    }
  });
};

const chengePriceForPeriod = (evt, price, currentPrice) => {
  const period = evt.target.textContent;
  price.forEach((elem, i) => {
    console.log(period);
    if (period === '/Months') {
      elem.textContent = Math.round(currentPrice[`dollar${i}`] * 30);
    } else if (period === '/Day') {
      elem.textContent = Math.round(currentPrice[`dollar${i}`] / 30);
    }
    listCurrentPrice = getOdjValue(document.querySelectorAll('.number'));
  });
};

const changePeriod = (evt) => {
  chengeTextPeriod(evt);
  console.log(listCurrentPrice);
  chengePriceForPeriod(evt, price, listCurrentPrice);
};

currency.forEach((elem) => {
  elem.addEventListener('click', (evt) =>
    changeCurrency(evt, listPriceDollars)
  );
});

period.forEach((elem) => {
  elem.addEventListener('click', (evt) => changePeriod(evt));
});

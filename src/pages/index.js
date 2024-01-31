import './index.css';

window.addEventListener('load', () => {
    console.log(4);
  const price = document.querySelectorAll('.price');
  let time = 0;
  price.forEach((elem) => {
    setTimeout(() => elem.classList.add('price-visibil'), Number(`${time}000`));
    time += 1;
  });
});


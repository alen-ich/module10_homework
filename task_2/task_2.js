const btn = document.querySelector('.j-btn-test');

btn.addEventListener('click', () => {
  const userWidth = window.screen.width;
  const userHeight = window.screen.height;
  const userMsg = `Высота экрана: ${userWidth}рх, ширина экрана: ${userHeight}px`;
  alert(userMsg);
});
let clickedCircle = null;
let preventClick = false;
let combosFound = 0;

const colors = [
  'red',
  'green',
  'blue',
  'orange',
  'purple',
  'yellow',
  'pink',
  'aqua',
  'grey',
  'white'

];

const circles = [...document.querySelectorAll('.circle')];
for (let color of colors) {
  const circleAIndex = parseInt(Math.random() * circles.length);
  const circleA = circles[circleAIndex];
  circles.splice(circleAIndex, 1);
  circleA.className += ` ${color}`;
  circleA.setAttribute('data-color', color);

  const circleBIndex = parseInt(Math.random() * circles.length);
  const circleB = circles[circleBIndex];
  circles.splice(circleBIndex, 1);
  circleB.className += ` ${color}`;
  circleB.setAttribute('data-color', color);
}

function onCircleClicked(e) {
  const target = e.currentTarget;

  if (
    preventClick ||
    target === clickedCircle ||
    target.className.includes('done')
  ) {
    return;
  }

  target.className = target.className
    .replace('color-hidden', '')
    .trim();
  target.className += ' done';

  if (!clickedCircle) {
    // if we haven't clicked a card, keep track of the card, display it's color
    clickedCircle = target;
  } else if (clickedCircle) {
    // if we have already clicked a card, check if the new card matches the old card color
    if (
      clickedCircle.getAttribute('data-color') !==
      target.getAttribute('data-color')
    ) {
      preventClick = true;
      setTimeout(() => {
        clickedCircle.className =
          clickedCircle.className.replace('done', '').trim() +
          ' color-hidden';
        target.className =
          target.className.replace('done', '').trim() +
          ' color-hidden';
        clickedCircle = null;
        preventClick = false;
      }, 500);
    } else {
      combosFound++;
      clickedCircle = null;
      if (combosFound === 10) {
        alert('YOU WIN');
      }
    }
  }
}
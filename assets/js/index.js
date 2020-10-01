let objects = ['glass', 'glass', 'key', 'key', 'space-shuttle', 'space-shuttle', 'headphones', 'headphones', 'eye', 'eye', 'star', 'star',
      'pencil', 'pencil', 'envelope', 'envelope'
   ],

   // Selectors
   $container = $('.container'),
   $scorePanel = $('.score-panel'),
   $scoring = $('.scoring'),
   $flips = $('.flips'),
   $timer = $('.timer'),
   $deck = $('.deck'),

   // Set variables 
   nowTime,
   allOpen = [],
   match = 0,
   second = 0,
   flips = 0,
   wait = 420,
   totalCard = objects.length / 2,

   // Scoring system from 1 to 3 
   score3 = 15,
   score2 = 16,
   score1 = 20;

// Adds a score from 1 to 3  depending on the amount of flips done
function scoring(flips) {
   let scoring = 3;
   if (flips <= score3) {
      $scoring.eq(3)
   } else if (flips >= score2 && flips < score1) {
      $scoring.eq(2)
      scoring = 2;
   } else if (flips >= score1) {
      $scoring.eq(1)
      scoring = 1;
   }
   return {
      score: scoring
   };
}

// Shuffling function: enables that no two games have the same card arrangement 
function shuffle(array) {
   let currentIndex = array.length,
      temporaryValue, randomIndex;

   while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
   }
   return array;
}

// The function init() enables the game to begin
function init() {

   // The shuffle function shuffles the objects array
   let allCards = shuffle(objects);
   $deck.empty();

   // The game starts with no matching cards and zero moves 
   match = 0;
   flips = 0;
   $flips.text('0');

   // A for loop creates 16  <li> tags with the class of card for every <i> tag
   // A class of fa fa- and a name of each object from the objects=[] array
   for (let i = 0; i < allCards.length; i++) {
      $deck.append($('<li class="card"><i class="fa fa-' + allCards[i] + '"></i></li>'))
   }
   addCardListener();

   // Enables the timer to reset to 0 when the game is restarted
   resetTimer(nowTime);
   second = 0;
   $timer.text(`${second}`)
   initTime();
}


// Add boostrap modal alert window showing time, moves, score it took to finish the game, toggles when all pairs are matched.
function gameOver(flips, score) {
   $('#winnerText').text(`In ${second} seconds, you made a total of ${flips} flips with a score of ${score}. Well done!`);
   $('#winnerModal').modal('toggle');
}


// This function allows each card to be validated that is an equal match to another card that is clicked on to stay open.
// If cards do not match, both cards are flipped back over.
let addCardListener = function () {

   // With the following, the card that is clicked on is flipped
   $deck.find('.card').bind('click', function () {
      let $this = $(this);

      if ($this.hasClass('show') || $this.hasClass('match')) {
         return true;
      }

      let card = $this.context.innerHTML;
      $this.addClass('open show');
      allOpen.push(card);

      // Compares cards if they matched
      if (allOpen.length > 1) {
         if (card === allOpen[0]) {
            $deck.find('.open').addClass('match');
            setTimeout(function () {
               $deck.find('open').removeClass('open show');
            }, wait);
            match++;

            // If cards are not matched, there is a delay of 630ms, and the cards will turn back cover up.
         } else {
            $deck.find('.open').addClass('notmatch');
            setTimeout(function () {
               $deck.find('.open').removeClass('open show');
            }, wait / 1.5);
         }

         // The allOpen array specifies all added cards facing up
         allOpen = [];

         // Increments the number of flips by one only when two cards are matched or not matched
         flips++;

         // The number of flips is added to the scoring that will determine the score
         scoring(flips);

         // The number of flips are added to the modal HTML alert
         $flips.html(flips);
      }

      // The game is finished once all cards have been matched, with a short delay
      if (totalCard === match) {
         scoring(flips);
         let score = scoring(flips).score;
         setTimeout(function () {
            gameOver(flips, score);
         }, 500);
      }
   });
}

// Initiates the timer as soon as the game is loaded
function initTime() {
   nowTime = setInterval(function () {
      $timer.text(`${second}`)
      second = second + 1
   }, 1000);
}

// Resets the timer when the game ends or is restarted
function resetTimer(timer) {
   if (timer) {
      clearInterval(timer);
   }
}

init();
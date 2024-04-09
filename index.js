import * as readline from 'readline';
class NumberGuessingGame {
    minNumber;
    maxNumber;
    maxAttempts;
    secretNumber;
    attempts;
    rl;
    constructor(minNumber, maxNumber, maxAttempts) {
        this.minNumber = minNumber;
        this.maxNumber = maxNumber;
        this.maxAttempts = maxAttempts;
        this.secretNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
        this.attempts = 0;
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }
    startGame() {
        console.log(`Welcome to the Number Guessing Game!`);
        console.log(`I've selected a number between ${this.minNumber} and ${this.maxNumber}.`);
        this.getUserGuess();
    }
    getUserGuess() {
        this.rl.question(`Attempt ${this.attempts + 1}/${this.maxAttempts}: Enter your guess: `, (input) => {
            const guess = parseInt(input.trim());
            if (isNaN(guess) || guess < this.minNumber || guess > this.maxNumber) {
                console.log(`Please enter a valid number between ${this.minNumber} and ${this.maxNumber}.`);
                this.getUserGuess();
            }
            else {
                this.attempts++;
                if (guess === this.secretNumber) {
                    console.log(`Congratulations! You've guessed the correct number ${this.secretNumber} in ${this.attempts} attempts.`);
                    this.rl.close();
                }
                else if (this.attempts === this.maxAttempts) {
                    console.log(`Sorry, you've used all ${this.maxAttempts} attempts. The correct number was ${this.secretNumber}.`);
                    this.rl.close();
                }
                else {
                    if (guess < this.secretNumber) {
                        console.log(`Try again. The secret number is higher than ${guess}.`);
                    }
                    else {
                        console.log(`Try again. The secret number is lower than ${guess}.`);
                    }
                    this.getUserGuess();
                }
            }
        });
    }
}
// Example usage:
const minNumber = 1;
const maxNumber = 100;
const maxAttempts = 10;
const game = new NumberGuessingGame(minNumber, maxNumber, maxAttempts);
game.startGame();

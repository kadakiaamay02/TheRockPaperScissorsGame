import { Component } from '@angular/core';
import { GameService, ROCK, PAPER, SCISSORS } from './game.service';
let wins;
let draws;
let losses;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  ngOnInit(): void {
    this.loadScores();
  }
  
  private gameService = new GameService;
  title = 'The Rock Paper Scissor Game';
  wins = 0;
  draws = 0;
  losses = 0;
  flashTextdata: string = ''

  onEmojiClick(userMove: number): void {
    const computerMove = this.gameService.getComputerMove();
    const result = this.gameService.decideWinner(userMove, computerMove);
    this.displayResults(result, computerMove);
  };

  displayResults(res: string, computerMove: number):void{
    let color = 'white';
    let move;
  switch(computerMove){
    case 1:{
      move = '🪨';
      break;
    }
    case 2: {
      move = '📝';
      break;
    }
    default: {
      move = '✂️';
      break;
    }
  }
    switch(res) {
      case 'win': {
        color = 'lightgreen';
        this.flashTextdata = 'Computer played: ' +  move + ', you Win!';
        this.wins = this.wins+1;
        break;
      }
      case 'lose': {
        this.flashTextdata = 'Computer played: ' +  move + ', you Lost!';
        color = 'lightcoral';
        this.losses = this.losses + 1;
        break;
      }
      case 'draw': {
        color = 'lightyellow';
        this.flashTextdata = 'Computer played: ' +  move + ', its a Draw!';
        this.draws = this.draws +1;
        break;
      }
      default: {
        color = 'white';
        break;
      }
    }
    
    this.flashBackgroundColor(color);
    this.flashText();
    this.saveScores();
  };

  flashBackgroundColor(color: string):void {
    const body = document.body;
    const originalColor = body.style.backgroundColor;
    body.style.backgroundColor = color; // Flash color
    setTimeout(() => {
      body.style.backgroundColor = originalColor;
    }, 500); // Duration of the flash in milliseconds
  };

  flashText():void {
    setTimeout(() => {
      this.flashTextdata = ''; 
    }, 650); // Duration of the flash in milliseconds
  };

  getComputerMove(): number {
    return Math.floor(Math.random() * 3) + 1;
    // 1 = Rock
    // 2 = Paper
    // 3 = scissor
  };

  resetScores(): void {
    this.wins = 0;
    this.losses = 0;
    this.draws = 0;
    localStorage.removeItem('scores');
  }
  
  saveScores(): void {
    const scores = { wins: this.wins, losses: this.losses, draws: this.draws };
    localStorage.setItem('scores', JSON.stringify(scores));
  }
  
  loadScores(): void {
    const savedScores = localStorage.getItem('scores');
    if (savedScores) {
      const { wins, losses, draws } = JSON.parse(savedScores);
      this.wins = wins;
      this.losses = losses;
      this.draws = draws;
    }
  }
  
  
}
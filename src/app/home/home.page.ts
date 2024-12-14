import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonText, IonButton } from '@ionic/angular/standalone';
import { GameService, ROCK, PAPER, SCISSORS } from 'src/app/game.service';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonButton, IonHeader, IonToolbar, IonTitle, IonContent, IonText],
})
export class HomePage {
Move = {
  ROCK: '🪨',
  PAPER: '📝',
  SCISSOR:'✂️'

};

OriginalColor = {
  Hex: '#121212'
}

Timer = {
  time: 800
}


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
      move = this.Move.ROCK;
      break;
    }
    case 2: {
      move = this.Move.PAPER;
      break;
    }
    default: {
      move = this.Move.SCISSOR;
      break;
    }
  }
    switch(res) {
      case 'win': {
        color = 'lightgreen';
        this.flashTextdata = 'Computer played: ' +  move + ', you Win!';
        this.wins = this.wins + 1;
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
        this.draws = this.draws + 1;
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

  flashBackgroundColor(color: string): void {
    const app = document.querySelector('ion-app') as HTMLElement;
    if (!app) {
      console.warn('ion-app not found');
      return;
    }
    // Set the new color
    app.style.setProperty('--ion-background-color', color);
  
    // Reset to the original color after 500 ms
    setTimeout(() => {
      app.style.setProperty('--ion-background-color', this.OriginalColor.Hex);
    }, this.Timer.time);
  }
  

  flashText():void {
    setTimeout(() => {
      this.flashTextdata = ''; 
    }, this.Timer.time); // Duration of the flash in milliseconds
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


import { Component } from '@angular/core';

let wins;
let draws;
let losses;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {
    
  title = 'The Rock Paper Scissor Game';
  wins = 0;
  draws = 0;
  losses = 0;
  flashTextdata: string = ''

  onEmojiClick(userMove: number): void {
    const res = this.decideWinner(userMove);
  }

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
  }

  flashBackgroundColor(color: string):void {
    const body = document.body;
    const originalColor = body.style.backgroundColor;
    body.style.backgroundColor = color; // Flash color
    setTimeout(() => {
      body.style.backgroundColor = originalColor;
    }, 200); // Duration of the flash in milliseconds
  }

  flashText():void {
    setTimeout(() => {
      this.flashTextdata = ''; 
    }, 500); // Duration of the flash in milliseconds
  }

  decideWinner(userMove: number):void  {
    // 1 = Rock
    // 2 = Paper
    // 3 = scissor
    const computerMove = this.getComputerMove();
    console.log(computerMove)
    let result= 'draw';
    
    if(userMove == computerMove){
       result = 'draw';
    } else if(userMove == 1 && computerMove == 3){
       result = 'win';
    }else if(userMove == 2 && computerMove == 1){
       result = 'win';
    }else if(userMove == 3 && computerMove == 2){
       result = 'win';
    }else {
       result = 'lose'
    }
    
    this.displayResults(result, computerMove);
  }

  getComputerMove(): number {
    const seed = new Date().getTime(); // Get current timestamp as seed
    const random = Math.sin(seed) * 10000;
    return Math.floor((random - Math.floor(random)) * 3) + 1;
    // 1 = Rock
    // 2 = Paper
    // 3 = scissor
  }
  
}

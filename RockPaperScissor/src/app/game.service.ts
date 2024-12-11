// src/app/game.service.ts
import { Injectable } from '@angular/core';

export const ROCK = 1;
export const PAPER = 2;
export const SCISSORS = 3;

@Injectable({
  providedIn: 'root',
})
export class GameService {
  getComputerMove(): number {
    return Math.floor(Math.random() * 3) + 1;
  }

  decideWinner(userMove: number, computerMove: number): string {
    const outcomes: { [key: number]: { [key: number]: string } } = {
      1: { 1: 'draw', 2: 'lose', 3: 'win' },
      2: { 1: 'win', 2: 'draw', 3: 'lose' },
      3: { 1: 'lose', 2: 'win', 3: 'draw' },
    };
    return outcomes[userMove][computerMove];
  }
  
}


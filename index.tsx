import React from 'react';
import { useState, useRef } from 'react';
import { render } from 'react-dom';

// import React, { useState } from 'react';

export class Board {
  private playerOneChar: string = '';
  private playerTwoChar: string = '';

  private board: string[][] = [
    ['_', '_', '_'],
    ['_', '_', '_'],
    ['_', '_', '_'],
  ];

  constructor(playerOneChar?: string, playerTwoChar?: string) {
    this.playerOneChar = playerOneChar ?? 'x';
    this.playerTwoChar = playerTwoChar ?? 'o';
    this.board = [
      ['_', '_', '_'],
      ['_', '_', '_'],
      ['_', '_', '_'],
    ];
  }

  public create(playerOneChar: string, playerTwoChar: string): void {
    this.resetBoard();
    this.playerOneChar = playerOneChar;
    this.playerTwoChar = playerTwoChar;
  }
  private resetBoard() {
    this.board = [
      ['_', '_', '_'],
      ['_', '_', '_'],
      ['_', '_', '_'],
    ];
  }
  public isTaken(r: number, c: number) {
    return this.board[r][c] !== '_';
  }
  public getBoard() {
    return this.board;
  }

  private setTaken(r: number, c: number, side: string) {
    this.board[r][c] = side;
  }
  getPlayerOne() {
    return this.playerOneChar;
  }
  getPlayerTwo() {
    return this.playerTwoChar;
  }
  public getSpot(r: number, c: number) {
    return this.board[r][c];
  }
  /**
   * @returns 1 if player 1 wins, 2 if player 2 wins, 0 if else.
   */
  public calcWin(): number {
    for (let row = 0; row < 3; row++) {
      if (
        this.board[row][0] === this.board[row][1] &&
        this.board[row][1] === this.board[row][2]
      ) {
        if (this.board[row][0] === this.playerOneChar) return 1;
        else if (this.board[row][0] === this.playerTwoChar) return 2;
      }
    }

    for (let col = 0; col < 3; col++) {
      if (
        this.board[0][col] === this.board[1][col] &&
        this.board[1][col] === this.board[2][col]
      ) {
        if (this.board[0][col] === this.playerOneChar) return 1;
        else if (this.board[0][col] === this.playerTwoChar) return 2;
      }
    }

    if (
      this.board[0][0] === this.board[1][1] &&
      this.board[1][1] === this.board[2][2]
    ) {
      if (this.board[0][0] === this.playerOneChar) return 1;
      else if (this.board[0][0] === this.playerTwoChar) return 2;
    }

    if (
      this.board[0][2] === this.board[1][1] &&
      this.board[1][1] === this.board[2][0]
    ) {
      if (this.board[0][2] === this.playerOneChar)
        // check diagonally
        return 1;
      else if (this.board[0][2] === this.playerTwoChar) return 2;
    }
    return 0;
  }

  /**
   * @returns true iff the space was not taken.
   */
  public takeSpace(r: number, c: number, user: string): boolean {
    if (this.calcWin() || this.board[r][c] !== '_') return false;
    return !!(this.board[r][c] = user);
  }
}
export const BoardComponent = ({ props }) => {
  const board: Board = props;
  const [turn, setTurn] = useState(true);
  const [winState, setWinState] = useState(0);
  const [classState, setClassState] = useState('rows');
  const handleClick = (row: number, col: number) => {
    if (
      board.takeSpace(
        row,
        col,
        turn ? board.getPlayerOne() : board.getPlayerTwo()
      )
    ) {
      setTurn(!turn);
    } else {
      // do css stuff with the element
    }

    setWinState(board.calcWin());
    if (board.calcWin()) {
      console.log('player ' + winState + ' wins!');
      setClassState('winState');
      return;
    }
    console.log(turn);
  };

  const useBoardButton = (row: number, col: number) => {
    return (
      <button
        id={`r${row}c${col}`}
        className='boardButton'
        onClick={() => handleClick(row, col)}
      >
        {board.getSpot(row, col)}
      </button>
    );
  };
  let indx = 0;
  let indy = 0;

  return (
    <div className='mainBoard'>
      <div className={classState}>
      <div className = 'row'>
      {Array.from({length: 9} , (_, i) => i).map((v, i) => {
        indx = Math.floor( i / 3);
        indy++;
        if (i % 3 === 0) {
          return (
            <span>
            <br />
            {useBoardButton(indx, indy -= indy)}
            </span>
          )
        }
        return useBoardButton(indx, indy)
      })}
      </div>
      </div> 
      <span className='textDisplay'>
        {winState
          ? 'Player ' + winState + ' wins!'
          : `It is currently ${
              turn ? "Player one's turn" : "Player two's turn"
            }`}
      </span>
    </div>
  );
};

export function App() {
  const board = useRef();

  return (
    <div className='wrapper'>
      <div className='Board'>
        <BoardComponent props={new Board('x', 'o')} />
      </div>
    </div>
  );
}

render(<App />, document.querySelector('#app'));

import React, { Component } from 'react';
import { useState, useCallback, useRef } from 'react';
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
  public takeSpace(r: number, c: number, user: string) {
    this.board[r][c] = user;
  }

  //  return [playerOneChar, playerTwoChar, setTaken, getBoard, isTaken];
}
export const BoardComponent = ({ props }) => {
  const board: Board = props;
  const [turn, setTurn] = useState(true);

  const handleClick = (row : number, col : number) => {
    board.takeSpace(
      row,
      col,
      turn ? board.getPlayerOne() : board.getPlayerTwo()
    );
    setTurn(!turn);
    console.log(turn);
  };

  const useBoardButton = (row: number, col: number) => {
    return (
      <button className='boardButton' onClick={() => handleClick(row, col)}>
        {board.getSpot(row, col)}
      </button>
    );
  };
  return (
    <div className='rows'>
      <div className='row'>
        {useBoardButton(0, 0)}
        {useBoardButton(0, 1)}
        {useBoardButton(0, 2)}
      </div>
      <div className='row'>
        {useBoardButton(1, 0)}
        {useBoardButton(1, 1)}
        {useBoardButton(1, 2)}
      </div>
      <div className='row'>
        {useBoardButton(2, 0)}
        {useBoardButton(2, 1)}
        {useBoardButton(2, 2)}
      </div>
    </div>
  );
};

export function App() {
  const board = useRef();

  return (
    <div className='Board'>
      <BoardComponent props={new Board("x", "o")} />
      hello world
    </div>
  );
}

render(<App />, document.querySelector('#app'));

const GameBoard = (() => {
    let board = ['','','','','','','','',''];

    return { board }
})();

const Player = (name, marker) => {
    return { name, marker }
}

const Game = (() => {
    const player1 = Player('Witek', 'X');
    const player2 = Player('Halyna', 'O');

    return { player1, player2 }
})();

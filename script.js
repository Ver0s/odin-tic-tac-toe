const GameBoard = (() => {
    const tiles = document.querySelectorAll('.tile');
    const board = ['','','','','','','','',''];

    const placeMarker = (tile, playerMarker) => {
        if (tile.hasChildNodes()) return;

        const markerElement = document.createElement('p');
        markerElement.textContent = playerMarker;
        markerElement.classList.add('marker');
        tile.appendChild(markerElement);
    }

    const getTileIndex = (tile) => {
        return tile.getAttribute('data-tile-index');
    }

    const setMarkerInBoard = (tile, playerMarker) => {
        board[getTileIndex(tile)] = playerMarker;
        console.log(board);
    }

    const checkGameStatus = () => {

    }

    return { board, placeMarker, tiles, setMarkerInBoard }
})();

const Player = (name, marker) => {
    return { name, marker }
}

const Game = (() => {
    const player1 = Player('Witek', 'X');
    const player2 = Player('Halyna', 'O');
    let currentPlayer = player1;

    const setCurrentPlayer = (player) => {
        return currentPlayer = player;
    }
    
    const switchPlayer = () => {
        return currentPlayer = (currentPlayer === player1) ? player2 : player1;
    }

    GameBoard.tiles.forEach(tile => {
        tile.addEventListener('click', () => {
            GameBoard.placeMarker(tile, currentPlayer.marker);
            GameBoard.setMarkerInBoard(tile, currentPlayer.marker);
            switchPlayer();
        })
    })
    
    return {  }
})();


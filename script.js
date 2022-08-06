const GameBoard = (() => {
    const tiles = document.querySelectorAll('.tile');
    let board = ['','','','','','','','',''];

    const placeMarker = (tile, playerMarker) => {
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
    }

    const resetBoard = () => {
        tiles.forEach(tile => {
            if (tile.hasChildNodes()) {
                tile.removeChild(tile.firstChild);
            }
        })
        board = ['','','','','','','','',''];
    }

    const checkGameStatus = () => {

    }

    return { placeMarker, tiles, setMarkerInBoard, resetBoard }
})();

const Player = (name, marker) => {
    return { name, marker }
}

const Game = (() => {
    const player1 = Player('Player1', 'X');
    const player2 = Player('Player2', 'O');

    // set who goes first
    let currentPlayer = player1;

    const switchPlayer = () => {
        return currentPlayer = (currentPlayer === player1) ? player2 : player1;
    }

    GameBoard.tiles.forEach(tile => {
        tile.addEventListener('click', () => {
            if (tile.hasChildNodes()) return;
            GameBoard.placeMarker(tile, currentPlayer.marker);
            GameBoard.setMarkerInBoard(tile, currentPlayer.marker);
            switchPlayer();
        })
    })
    
    return {  }
})();


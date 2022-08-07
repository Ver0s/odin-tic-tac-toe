const GameBoard = (() => {
    const tiles = document.querySelectorAll('.tile');
    let board = new Array(9).fill('');

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
        board.fill('');
    }

    const getBoard = () => {
        return board;
    }

    // it also has to take an argument of a current board status to compare against
    const checkWin = (marker) => {
        const winCoords = [
            // horizontal win
            [marker, marker, marker, '', '', '', '', '', ''], 
            ['', '', '', marker, marker, marker, '', '', ''],
            ['', '', '', '', '', '', marker, marker, marker],
    
            // vertical win
            [marker, '', '', marker, '', '', marker, '', ''],
            ['', marker, '', '', marker, '', '', marker, ''],
            ['', '', marker, '', '', marker, '', '', marker],
    
            //cross win
            [marker, '', '', '', marker, '', '', '', marker],
            ['', '', marker, '', marker, '', marker, '', '']
        ]
    }

    const checkGameStatus = () => {
        // takes result of checkWin - if true display congrats
        // else continue until draw or win
    }

    return { placeMarker, tiles, setMarkerInBoard, resetBoard, getBoard }
})();

const Player = (name, marker) => {
    const getMarker = () => {
        return marker;
    }
    return { name, marker, getMarker }
}

const Game = (() => {
    const player1 = Player('Player1', 'X');
    const player2 = Player('Player2', 'O');
    let currentPlayer = player1;

    const switchPlayer = () => {
        return currentPlayer = (currentPlayer === player1) ? player2 : player1;
    }

    const resetGameBtn = document.querySelector('#resetGame');
    resetGameBtn.addEventListener('click', GameBoard.resetBoard);

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


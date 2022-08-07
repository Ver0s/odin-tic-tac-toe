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

    // https://bobbyhadz.com/blog/javascript-find-index-all-occurrences-of-element-in-array
    const getMarkerIndexes = (board, marker) => {
        const indexes = [];
        for (let index = 0; index < board.length; index++) {
            if (board[index] === marker) {
                indexes.push(index);
            }
        }
        return indexes;
    }

    const checkWin = (board, marker) => {
        const winningIndexes = [
            // horizontal win
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
        
            // vertical win
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
        
            //cross win
            [0, 4, 8],
            [2, 4, 6],
        ]

        for (const indexSet of winningIndexes) {
            // https://stackoverflow.com/questions/38811421/how-to-check-if-an-array-is-a-subset-of-another-array-in-javascript
            // if (indexSet.every(index => getMarkerIndexes(board, marker).includes(index))) return true
            if (indexSet.every(index => getMarkerIndexes(board, marker).includes(index))) {console.log('win')};
        }
    }

    const checkGameStatus = () => {
        // here i can check game, continue or draw
    }

    return { placeMarker, tiles, setMarkerInBoard, resetBoard, getBoard, checkWin }
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
            GameBoard.checkWin(GameBoard.getBoard(), currentPlayer.marker);
            switchPlayer();
        })
    })
    
    return {  }
})();


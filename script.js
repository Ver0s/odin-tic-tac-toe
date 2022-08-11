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
            if (indexSet.every(index => getMarkerIndexes(board, marker).includes(index))) return true;
        }
    }

    const checkDraw = (board) => {
        return board.every(element => element !== '');
    }

    const getBoard = () => {
        return board;
    }

    return { placeMarker,tiles, setMarkerInBoard, resetBoard, getBoard, checkDraw, checkWin }
})();

const Player = (name, marker) => {
    const setName = (newName) => {
        return name = newName;
    }

    const getName = () => {
        return name;
    }

    const getMarker = () => {
        return marker;
    }
    return { setName, getName, getMarker }
}

const DisplayController = (() => {
    const gameContainer = document.querySelector('.game-container');
    const gameSettings = document.querySelector('.game-settings');
    
    const displayGame = () => {
        gameSettings.style.display = 'none';
        gameContainer.style.display = 'flex';
    }
    
    const displaySettings = () => {
        gameSettings.style.display = 'block';
        gameContainer.style.display = 'none';
    }

    const showResultModal = (show) => {
        const announcementBoxModal = document.querySelector('.announcement-box-modal');
        announcementBoxModal.style.display = (show) ? 'block' : 'none';
    }
    
    const displayResult = (result, player) => {
        const h2 = document.querySelector('.announcement-box-modal h2');
        h2.textContent = (result === 'win') ? `${player} wins` : 'It\'s a draw!';
        showResultModal(true);
    }
    
    const highlightCurrentPlayer = (currentPlayerMarker) => {
        const player1Box = document.querySelector('.player1-box');
        const player2Box = document.querySelector('.player2-box');

        if (currentPlayerMarker === 'X') {
            player1Box.classList.add('current-player-highlight');
            player2Box.classList.remove('current-player-highlight');
        } else if (currentPlayerMarker === 'O') {
            player1Box.classList.remove('current-player-highlight');
            player2Box.classList.add('current-player-highlight');
        }
    }
    
    const displayPlayersData = (player1, player2) => {
        const player1NameDisplay = document.querySelector('#player1NameDisplay');
        const player1MarkerDisplay = document.querySelector('#player1MarkerDisplay');
        const player2NameDisplay = document.querySelector('#player2NameDisplay');
        const player2MarkerDisplay = document.querySelector('#player2MarkerDisplay');
        
        player1NameDisplay.textContent = `${player1.getName()}`;
        player1MarkerDisplay.textContent = `${player1.getMarker()}`;
        player2NameDisplay.textContent = `${player2.getName()}`;
        player2MarkerDisplay.textContent = `${player2.getMarker()}`;
    }

    const clearPlayerNameInputs = () => {
        document.querySelector('#player1Name').value = '';
        document.querySelector('#player2Name').value = '';
    }

    return {displayGame, displaySettings, displayPlayersData, highlightCurrentPlayer, displayResult, showResultModal, clearPlayerNameInputs}
})();

const Game = (() => {
    const player1 = Player('', 'X');
    const player2 = Player('', 'O');
    let currentPlayer = player1;

    const switchPlayer = () => {
        return currentPlayer = (currentPlayer === player1) ? player2 : player1;
    }
    
    const setPlayersNames = () => {
        const player1Name = document.querySelector('#player1Name').value || document.querySelector('#player1Name').placeholder;
        const player2Name = document.querySelector('#player2Name').value || document.querySelector('#player2Name').placeholder;
        player1.setName(player1Name);
        player2.setName(player2Name);
    }

    const startGame = () => {
        setPlayersNames();
        DisplayController.displayGame();
        DisplayController.highlightCurrentPlayer(currentPlayer.getMarker());
        DisplayController.displayPlayersData(player1, player2);
    }

    const mainMenu = () => {
        DisplayController.displaySettings();
        currentPlayer = player1;
        GameBoard.resetBoard();
        DisplayController.highlightCurrentPlayer(currentPlayer.getMarker());
        player1.setName('');
        player2.setName('');
        DisplayController.showResultModal(false);
        DisplayController.clearPlayerNameInputs();
    }

    const resetRound = () => {
        currentPlayer = player1;
        GameBoard.resetBoard();
        DisplayController.highlightCurrentPlayer(currentPlayer.getMarker());
        DisplayController.showResultModal(false);
    }

    const getCurrentPlayer = () => {
        return currentPlayer;
    }

    // EVENT LISTENERS
    const startGameBtn = document.querySelector('#startGame');
    const resetRoundBtn = document.querySelector('#resetRound');
    const mainMenuBtns = document.querySelectorAll('.mainMenu');

    startGameBtn.addEventListener('click', startGame);
    resetRoundBtn.addEventListener('click', resetRound);
    mainMenuBtns.forEach(btn => {
        btn.addEventListener('click', mainMenu)
    })

    // main game loop
    GameBoard.tiles.forEach(tile => {
        tile.addEventListener('click', () => {
            if (tile.hasChildNodes()) return;
            GameBoard.placeMarker(tile, currentPlayer.getMarker());
            GameBoard.setMarkerInBoard(tile, currentPlayer.getMarker());
            
            if (GameBoard.checkWin(GameBoard.getBoard(), currentPlayer.getMarker())) {
                DisplayController.displayResult('win', currentPlayer.getName());
            } else if (GameBoard.checkDraw(GameBoard.getBoard())) {
                DisplayController.displayResult('draw', currentPlayer.getName());
            } else {
                switchPlayer();
                DisplayController.highlightCurrentPlayer(currentPlayer.getMarker());
            }
        })
    })

    return { switchPlayer, getCurrentPlayer }
})();
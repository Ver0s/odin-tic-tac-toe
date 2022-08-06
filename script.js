const GameBoard = (() => {
    let board = ['','','','','','','','',''];

    const placeMarker = (tile, playerMarker) => {
        const marker = document.createElement('p');
        marker.textContent = playerMarker;
        marker.classList.add('marker');
        tile.appendChild(marker);
    }

    return { board, placeMarker }
})();

const Player = (name, marker) => {
    return { name, marker }
}

const Game = (() => {
    const tiles = document.querySelectorAll('.tile');
    const player1 = Player('Witek', 'X');
    const player2 = Player('Halyna', 'O');

    tiles.forEach(tile => {
        tile.addEventListener('click', () => {
            GameBoard.placeMarker(tile, player1.marker)
        })
    })
    
    return { player1, player2 }
})();


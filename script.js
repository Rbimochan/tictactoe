const cells = document.querySelectorAll('[data-cell]');
        const status = document.querySelector('.status');
        const restartButton = document.querySelector('.restart');
        let currentPlayer = 'X';
        let gameActive = true;
        let gameState = ['', '', '', '', '', '', '', '', ''];

        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        cells.forEach((cell, index) => {
            cell.addEventListener('click', () => handleCellClick(cell, index));
        });

        cells.forEach(cell => {
            cell.addEventListener('mouseover', () => {
                if (!cell.textContent && gameActive) {
                    cell.style.opacity = '0.7';
                }
            });
            
            cell.addEventListener('mouseout', () => {
                cell.style.opacity = '1';
            });
        });

        restartButton.addEventListener('click', restartGame);

        function handleCellClick(cell, index) {
            if (gameState[index] !== '' || !gameActive) return;

            cell.style.transform = 'scale(0.9)';
            setTimeout(() => {
                cell.style.transform = 'scale(1)';
            }, 100);

            gameState[index] = currentPlayer;
            cell.textContent = currentPlayer;
            
            if (checkWin()) {
                status.textContent = `Player ${currentPlayer} wins! 🎉`;
                gameActive = false;
                return;
            }

            if (checkDraw()) {
                status.textContent = "Game ended in a draw! 🤝";
                gameActive = false;
                return;
            }

            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            status.textContent = `Player ${currentPlayer}'s turn`;
        }

        function checkWin() {
            return winningCombinations.some(combination => {
                return combination.every(index => {
                    return gameState[index] === currentPlayer;
                });
            });
        }

        function checkDraw() {
            return gameState.every(cell => cell !== '');
        }

        function restartGame() {
            currentPlayer = 'X';
            gameActive = true;
            gameState = ['', '', '', '', '', '', '', '', ''];
            status.textContent = `Player ${currentPlayer}'s turn`;
            cells.forEach(cell => {
                cell.textContent = '';
            });
        }
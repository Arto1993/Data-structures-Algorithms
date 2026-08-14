/**
 * N-Queens Backtracking Solver in JavaScript (ES6+)
 * 
 * Places N non-attacking queens on an N x N chessboard.
 * Demonstrates recursive state space tree exploration with prune & backtrack.
 * 
 * Time Complexity: O(N!)
 * Space Complexity: O(N)
 */

export class NQueens {
  static solve(n = 4) {
    const solutions = [];
    const board = Array.from({ length: n }, () => new Array(n).fill('.'));
    const steps = [];

    const isSafe = (row, col) => {
      // Check column above
      for (let i = 0; i < row; i++) {
        if (board[i][col] === 'Q') return false;
      }
      // Check top-left diagonal
      for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
        if (board[i][j] === 'Q') return false;
      }
      // Check top-right diagonal
      for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
        if (board[i][j] === 'Q') return false;
      }
      return true;
    };

    steps.push({
      type: 'init',
      board: board.map(r => [...r]),
      row: 0,
      col: 0,
      explanation: `Initialized empty ${n}x${n} chessboard. Starting backtracking on row 0.`
    });

    const backtrack = (row) => {
      if (row === n) {
        const solutionSnapshot = board.map(r => r.join(''));
        solutions.push(solutionSnapshot);

        steps.push({
          type: 'solution_found',
          board: board.map(r => [...r]),
          row,
          solutionCount: solutions.length,
          explanation: `👑 VALID SOLUTION #${solutions.length} FOUND! Placed all ${n} queens safely.`
        });
        return;
      }

      for (let col = 0; col < n; col++) {
        steps.push({
          type: 'try_place',
          board: board.map(r => [...r]),
          row,
          col,
          explanation: `Trying to place Queen at row ${row}, col ${col}.`
        });

        if (isSafe(row, col)) {
          board[row][col] = 'Q';

          steps.push({
            type: 'placed',
            board: board.map(r => [...r]),
            row,
            col,
            explanation: `✅ Placed Queen at (${row}, ${col}). Advancing to row ${row + 1}.`
          });

          backtrack(row + 1);

          // Backtrack
          board[row][col] = '.';

          steps.push({
            type: 'backtrack',
            board: board.map(r => [...r]),
            row,
            col,
            explanation: `↩️ Backtracking: Removed Queen from (${row}, ${col}) to explore other options.`
          });
        }
      }
    };

    backtrack(0);

    steps.push({
      type: 'complete',
      totalSolutions: solutions.length,
      explanation: `🎉 N-Queens complete for N=${n}: Found ${solutions.length} total distinct solutions.`
    });

    return { solutions, steps };
  }
}

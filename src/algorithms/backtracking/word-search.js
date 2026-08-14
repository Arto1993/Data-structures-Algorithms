/**
 * Word Search Backtracking on 2D Grid
 * 
 * Time Complexity: O(M * N * 4^L) where L = word length
 * Space Complexity: O(L) recursion stack
 */

export class WordSearch {
  static solve(
    board = [
      ['A', 'B', 'C', 'E'],
      ['S', 'F', 'C', 'S'],
      ['A', 'D', 'E', 'E']
    ],
    word = 'ABCCED'
  ) {
    const rows = board.length;
    const cols = board[0].length;
    const steps = [];
    const visited = Array.from({ length: rows }, () => new Array(cols).fill(false));

    steps.push({
      type: 'init',
      board: board.map(r => [...r]),
      word,
      path: [],
      explanation: `Searching for word "${word}" in ${rows}x${cols} grid using DFS Backtracking.`
    });

    const dfs = (r, c, idx, path) => {
      if (idx === word.length) return true;
      if (r < 0 || r >= rows || c < 0 || c >= cols || visited[r][c] || board[r][c] !== word[idx]) {
        return false;
      }

      visited[r][c] = true;
      path.push([r, c]);

      steps.push({
        type: 'match_char',
        board: board.map(row => [...row]),
        word,
        r,
        c,
        char: word[idx],
        idx,
        path: [...path],
        explanation: `Matched char '${word[idx]}' at [${r}, ${c}]. Progress: "${word.slice(0, idx + 1)}".`
      });

      if (idx === word.length - 1) {
        steps.push({
          type: 'found',
          board: board.map(row => [...row]),
          word,
          path: [...path],
          explanation: `🎯 WORD FOUND! Full path for "${word}" completed.`
        });
        return true;
      }

      const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]];
      for (const [dr, dc] of dirs) {
        if (dfs(r + dr, c + dc, idx + 1, path)) return true;
      }

      // Backtrack
      visited[r][c] = false;
      const [backR, backC] = path.pop();

      steps.push({
        type: 'backtrack',
        board: board.map(row => [...row]),
        word,
        r: backR,
        c: backC,
        char: word[idx],
        idx,
        path: [...path],
        explanation: `Backtracked from [${backR}, ${backC}] for char '${word[idx]}'.`
      });

      return false;
    };

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (board[r][c] === word[0]) {
          if (dfs(r, c, 0, [])) {
            return { found: true, steps };
          }
        }
      }
    }

    steps.push({
      type: 'not_found',
      board: board.map(r => [...r]),
      word,
      path: [],
      explanation: `❌ Word "${word}" was not found in the grid.`
    });

    return { found: false, steps };
  }
}

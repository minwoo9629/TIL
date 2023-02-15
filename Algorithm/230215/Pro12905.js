function solution(board) {
  let answer = 0;
  const row = board.length;
  const col = board[0].length;
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      answer = Math.max(answer, board[i][j]);
    }
  }
  for (let i = 1; i < row; i++) {
    for (let j = 1; j < col; j++) {
      if (board[i][j] !== 0) {
        const one = board[i - 1][j];
        const two = board[i - 1][j - 1];
        const three = board[i][j - 1];
        board[i][j] += Math.min(one, Math.min(two, three));
        answer = Math.max(answer, board[i][j]);
      }
    }
  }
  return answer * answer;
}

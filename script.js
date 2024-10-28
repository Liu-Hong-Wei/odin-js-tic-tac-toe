const createPlayer = (myId, myMark) => {
  const id = myId;
  const mark = myMark;
  return { id, mark };
};

const GameBoard = (() => {
  const players = [createPlayer(1, "X"), createPlayer(2, "O")];
  let blocks = [];
  let currentPlayerNumber = 0;

  const togglePlayer = () => {
    currentPlayerNumber = (currentPlayerNumber + 1) % 2;
  };

  const calculateWinner = () => {
    let lines = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [1, 5, 9],
      [3, 5, 7],
    ];
    for (let line of lines) {
      if (
        blocks[line[0] - 1] != null &&
        blocks[line[1] - 1] != null &&
        blocks[line[2] - 1] != null &&
        blocks[line[0] - 1] === blocks[line[1] - 1] &&
        blocks[line[1] - 1] === blocks[line[2] - 1] &&
        blocks[line[0] - 1] === blocks[line[2] - 1]
      ) {
        return blocks[line[0] - 1];
      }
    }
    return 0;
  };

  const gameOver = (winner) => {
    if (winner == 1) {
      console.log("X winner!");
    } else {
      console.log("O winner!");
    }

  };

  const start = () => {
    const allBlocks = document.querySelectorAll(".block");
    allBlocks.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        const block = e.target;
        if (blocks[e.target.id - 1] == null) {
          blocks[e.target.id - 1] = players[currentPlayerNumber].id;
          const markDiv = document.createElement("div");
          markDiv.classList.add("mark");
          markDiv.textContent = players[currentPlayerNumber].mark;
          block.appendChild(markDiv);
          togglePlayer();
          let result = calculateWinner();
          if (result !== 0) {
            gameOver(result);
          }
        }
      });
    });
    console.log("Game Started!");
  };

  return { players, blocks, start, calculateWinner };
})();

GameBoard.start();
const GameBoard = (() => {
  const createPlayer = (myId, myMark) => {
    const id = myId;
    const mark = myMark;
    return { id, mark };
  };
  const players = [createPlayer(1, "X"), createPlayer(2, "O")];

  let blocks = [];
  let currentPlayerNumber = 0;
  const lines = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];

  const calculateWinner = () => {
    for (let line of lines) {
      let [a, b, c] = line;
      if (
        blocks[a - 1] != null &&
        blocks[b - 1] != null &&
        blocks[c - 1] != null &&
        blocks[a - 1] === blocks[b - 1] &&
        blocks[b - 1] === blocks[c - 1] &&
        blocks[a - 1] === blocks[c - 1]
      ) {
        return blocks[a - 1];
      }
    }
    return 0;
  };

  const togglePlayer = () => {
    currentPlayerNumber = (currentPlayerNumber + 1) % players.length;
  };

  const markBlock = (block) => {
    const markDiv = document.createElement("div");
    markDiv.classList.add("mark");
    markDiv.textContent = players[currentPlayerNumber].mark;
    block.appendChild(markDiv);
    console.log(
      `block ${block.id} marked with "${players[currentPlayerNumber].mark}"`
    );
  };

  const gameOver = (result, isEnd) => {
    // game not over
    if (!isEnd && result == 0) {
      return;
    }

    // someone win
    if (result) {
      console.log(`${players[result - 1].mark} win!`);
    } else if (isEnd) {
      // it's a draw!
      console.log("Draw!");
    }
  };

  const start = () => {
    const allBlocks = document.querySelectorAll(".block");
    allBlocks.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        const block = e.target;
        if (
          block.classList.contains("block") &&
          blocks[block.id - 1] === undefined
        ) {
          blocks[block.id - 1] = players[currentPlayerNumber].id;
          markBlock(block);
          togglePlayer();
          let isEnd =
            blocks.filter((item) => {
              return item !== undefined;
            }).length === 9;
          gameOver(calculateWinner(), isEnd);
        } else {
          console.log("The Current Block is Occupied!");
        }
      });
    });
    console.log("Game Started!");
  };

  return { players, blocks, start, calculateWinner };
})();

GameBoard.start();

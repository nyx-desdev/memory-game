import React, { useState } from "react";
import Img1 from "./assets/icons8-amethyst-universe.svg";
import Img2 from "./assets/icons8-bt21-mang.svg";
import Img3 from "./assets/icons8-morty-smith.svg";
import Img4 from "./assets/icons8-pochacco.svg";
import Img5 from "./assets/icons8-tanjiro-kamado.svg";
import Img6 from "./assets/icons8-scooby-doo-velma-dinkley.svg";
import { shuffle } from "./utils/shuffle";

type Props = {};

type ResponeProp = {
  value: number | null;
  rowIndex: number | null;
  colIndex: number | null;
};

const gameObj = [
  shuffle([
    {
      value: 0,
      img: Img1,
      isRevealed: false,
    },
    {
      value: 0,
      img: Img1,
      isRevealed: false,
    },
    {
      value: 1,
      img: Img2,
      isRevealed: false,
    },
    {
      value: 1,
      img: Img2,
      isRevealed: false,
    },
  ]),
  shuffle([
    {
      value: 2,
      img: Img3,
      isRevealed: false,
    },
    {
      value: 2,
      img: Img3,
      isRevealed: false,
    },
    {
      value: 3,
      img: Img4,
      isRevealed: false,
    },
    {
      value: 3,
      img: Img4,
      isRevealed: false,
    },
  ]),
  shuffle([
    {
      value: 4,
      img: Img5,
      isRevealed: false,
    },
    {
      value: 4,
      img: Img5,
      isRevealed: false,
    },
    {
      value: 5,
      img: Img6,
      isRevealed: false,
    },
    {
      value: 5,
      img: Img6,
      isRevealed: false,
    },
  ]),
];

const gameObj2 = [
  [
    {
      value: 0,
      img: Img1,
      isRevealed: false,
    },
    {
      value: 0,
      img: Img1,
      isRevealed: false,
    },
    {
      value: 1,
      img: Img2,
      isRevealed: false,
    },
    {
      value: 1,
      img: Img2,
      isRevealed: false,
    },
  ],
  [
    {
      value: 2,
      img: Img3,
      isRevealed: false,
    },
    {
      value: 2,
      img: Img3,
      isRevealed: false,
    },
    {
      value: 3,
      img: Img4,
      isRevealed: false,
    },
    {
      value: 3,
      img: Img4,
      isRevealed: false,
    },
  ],
  [
    {
      value: 4,
      img: Img5,
      isRevealed: false,
    },
    {
      value: 4,
      img: Img5,
      isRevealed: false,
    },
    {
      value: 5,
      img: Img6,
      isRevealed: false,
    },
    {
      value: 5,
      img: Img6,
      isRevealed: false,
    },
  ],
];

const AdvancedGame = (props: Props) => {
  const [advancedGameGrid, setAdvancedGameGrid] = useState(
    JSON.parse(JSON.stringify(gameObj))
  );

  const [previousResponse, setPreviousResponse] = useState<ResponeProp>({
    value: null,
    rowIndex: null,
    colIndex: null,
  });

  const resetGame = () => {
    console.log("reset");
    setAdvancedGameGrid(JSON.parse(JSON.stringify(gameObj)));
  };

  const handleCardClick = (rowIndex: number, colIndex: number) => {
    if (advancedGameGrid[rowIndex][colIndex].isRevealed == true) {
      return;
    }
    const clickedNumber = advancedGameGrid[rowIndex][colIndex].value;
    // console.log(rowIndex, colIndex);
    const revealAdvancedGameGrid = [...advancedGameGrid];
    revealAdvancedGameGrid[rowIndex][colIndex].isRevealed = true;
    setAdvancedGameGrid(revealAdvancedGameGrid);
    setPreviousResponse({
      value: revealAdvancedGameGrid[rowIndex][colIndex].value,
      rowIndex: rowIndex,
      colIndex: colIndex,
    });
    if (previousResponse.value === clickedNumber) {
      console.log("no matched");
      setPreviousResponse({ value: null, rowIndex: null, colIndex: null });
    }
    if (
      previousResponse.value !== clickedNumber &&
      previousResponse.value !== null &&
      previousResponse.rowIndex !== null &&
      previousResponse.colIndex !== null
    ) {
      console.log("click, previous", clickedNumber, previousResponse.value);
      revealAdvancedGameGrid[rowIndex][colIndex].isRevealed = true;
      setAdvancedGameGrid(revealAdvancedGameGrid);
      setPreviousResponse({ value: null, rowIndex: null, colIndex: null });
      setTimeout(() => {
        console.log("called");
        let updateGrid = [...advancedGameGrid];
        //@ts-ignore
        updateGrid[previousResponse.rowIndex][
          previousResponse.colIndex
        ].isRevealed = false;
        updateGrid[rowIndex][colIndex].isRevealed = false;
        setAdvancedGameGrid(updateGrid);
      }, 600);
    }

    const hasWon = revealAdvancedGameGrid
      .flat()
      .every((item) => item.isRevealed);
    if (hasWon) {
      setTimeout(() => {
        alert("You won");
      }, 100);
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen">
      <h1 className="text-3xl py-10 text-center">Play Memory game</h1>
      <div className="max-w-lg mx-auto">
        <div className="flex flex-col gap-5">
          {advancedGameGrid.map((row: any, rowIndex: any) => (
            <div key={`row-${rowIndex}`} className="flex gap-5">
              {row.map((number: any, colIndex: any) => (
                <div
                  key={`col-${colIndex}`}
                  onClick={() => handleCardClick(rowIndex, colIndex)}
                  className={`${
                    advancedGameGrid[rowIndex][colIndex].isRevealed
                      ? "revealed"
                      : ""
                  } p-5 bg-white w-32 h-32 flex items-center justify-center cursor-pointer hover:shadow-xl transition-shadow`}
                >
                  {number.isRevealed && (
                    <img className="h-52" src={number.img} />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center m-12">
          <button
            onClick={() => resetGame()}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Reset Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdvancedGame;

import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import AdvancedGame from "./AdvancedGame";

const App = () => {
  const [gameGrid, setGameGrid] = useState([
    [0, 1, 2, 3],
    [0, 1, 2, 3],
    [4, 5, 5, 4],
  ]);
  const [revealGameGrid, setRevealGameGrid] = useState([
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
  ]);

  const [previousNumber, setPreviousNumber] = useState<number | null>(null);
  const [previousNumberRowIndex, setPreviousNumberRowIndex] = useState<
    number | null
  >(null);
  const [previousNumberColIndex, setPreviousNumberColIndex] = useState<
    number | null
  >(null);

  const handleCardClick = (rowIndex: number, colIndex: number) => {
    const clickedNumber = gameGrid[rowIndex][colIndex];
    if (revealGameGrid[rowIndex][colIndex] == true) {
      return;
    }
    const updatedGameGrid = [...revealGameGrid];
    updatedGameGrid[rowIndex][colIndex] = true;
    setRevealGameGrid(updatedGameGrid);
    setPreviousNumber(clickedNumber);
    setPreviousNumberRowIndex(rowIndex);
    setPreviousNumberColIndex(colIndex);
    if (previousNumber === clickedNumber) {
      console.log("no matched");
      setPreviousNumber(null);
      setPreviousNumberRowIndex(null);
      setPreviousNumberColIndex(null);
    }

    if (
      clickedNumber !== previousNumber &&
      previousNumber !== null &&
      previousNumberRowIndex !== null &&
      previousNumberColIndex !== null
    ) {
      console.log("inside", clickedNumber, previousNumber);
      updatedGameGrid[rowIndex][colIndex] = true;
      setRevealGameGrid(updatedGameGrid);
      setPreviousNumber(null);
      setTimeout(() => {
        console.log("called");
        console.log(updatedGameGrid);
        let test = [...revealGameGrid];
        test[rowIndex][colIndex] = false;
        test[previousNumberRowIndex][previousNumberColIndex] = false;
        setRevealGameGrid(test);
      }, 500);
    }

    const hasWon = revealGameGrid.flat().every((isRevealed) => isRevealed);
    if (hasWon) {
      setTimeout(() => {
        alert("you won");
      }, 0);
    }
  };

  return (
    // <div className="bg-gray-200 min-h-screen">
    //   <h1 className="text-3xl py-10 text-center">Play Memory game</h1>
    //   <div className="max-w-lg mx-auto">
    //     <div className="flex flex-col gap-5">
    //       {gameGrid.map((row, rowIndex) => (
    //         <div key={rowIndex} className="flex gap-5">
    //           {row.map((number, colIndex) => (
    //             <div
    //               key={colIndex}
    //               onClick={() => handleCardClick(rowIndex, colIndex)}
    //               className={`${
    //                 revealGameGrid[rowIndex][colIndex] ? "revealed" : ""
    //               } p-5 bg-white w-32 h-32 flex items-center justify-center cursor-pointer hover:shadow-xl transition-shadow`}
    //             >
    //               {/* {number} */}
    //               {revealGameGrid[rowIndex][colIndex] ? (
    //                 <span>{number}</span>
    //               ) : (
    //                 ""
    //               )}
    //             </div>
    //           ))}
    //         </div>
    //       ))}
    //     </div>{" "}
    //   </div>
    // </div>
    <>
      <AdvancedGame />
    </>
  );
};

export default App;

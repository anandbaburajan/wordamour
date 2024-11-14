"use client";

import MeshGradientBackground from "@/components/gradient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import WordSearch from "@blex41/word-search";
import dayjs from "dayjs";
import { Playfair_Display } from "next/font/google";
import { useState } from "react";

// If loading a variable font, you don't need to specify the font weight
const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
});

const currentDate = dayjs();
const formattedDate = currentDate.format("MMM DD, YYYY");

export default function Home() {
  const [wordsList, setWordsList] = useState("");

  const handleInputChange = (event) => {
    setWordsList(event.target.value);
  };

  const [grid, setGrid] = useState([]);

  return (
    <div className="h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-row h-full">
        <div className="flex flex-col justify-between w-1/4 border-gray-200 relative">
          <MeshGradientBackground />
          <div className="flex flex-col p-10 h-full w-full absolute">
            <Input
              className="flex mb-4 backdrop-blur-md bg-white/20 shadow-none border-none"
              placeholder="Title (for eg: Caleb & Ava)"
            />
            <Input
              className="flex mb-4 backdrop-blur-md bg-white/20 shadow-none border-none"
              placeholder="Date"
            />
            <Textarea
              value={wordsList}
              onChange={handleInputChange}
              className="flex h-[20rem] mb-4 backdrop-blur-md bg-white/20 shadow-none border-none"
              placeholder="Enter the words (one per line)"
            />
          </div>
          <div className="p-10 flex flex-col w-full absolute bottom-0">
            <Button
              onClick={() => {
                setGrid(getGrid(wordsList.split(/\r?\n/)));
              }}
            >
              Update
            </Button>
          </div>
        </div>
        <div className="flex flex-col w-3/4 p-12 bg-white">
          <div className="flex justify-center mb-4">
            <h1 className={`text-5xl font-medium ${playfair.className}`}>
              Caleb & Ava
            </h1>
          </div>
          <div className="flex justify-center">
            <h6 className="text-sm mb-12 text-gray-400">{formattedDate}</h6>
          </div>
          <div className="flex justify-center">
            <table className="text-sm">
              <tbody>
                {grid &&
                  grid.length > 0 &&
                  grid.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex} className="p-2 text-gray-900">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

function getGrid(wordsList) {
  if (wordsList.length === 0) return;

  const options = {
    cols: 22,
    rows: 16,
    disabledDirections: ["N", "W", "NW", "SW"],
    dictionary: wordsList,
    maxWords: 32,
    backwardsProbability: 0.3,
    upperCase: true,
    diacritics: true,
  };

  const ws = new WordSearch(options);

  return ws.grid;
}

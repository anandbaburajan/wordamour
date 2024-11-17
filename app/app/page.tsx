"use client";

import MeshGradientBackground from "@/components/gradient";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import WordSearch from "@blex41/word-search";
import { PopoverClose } from "@radix-ui/react-popover";
import { format } from "date-fns";
import dayjs from "dayjs";
import { Playfair_Display } from "next/font/google";
import { useRef, useState } from "react";

// If loading a variable font, you don't need to specify the font weight
const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
});

export default function Home() {
  const [wordsList, setWordsList] = useState("");

  const handleWordsListChange = (event) => {
    setWordsList(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const [grid, setGrid] = useState([]);

  const [title, setTitle] = useState("");

  const [puzzleDate, setPuzzleDate] = useState<Date>();

  const [paperSize, setPaperSize] = useState("");

  const [illustration, setIllustrations] = useState("");

  const popOverRef = useRef<HTMLButtonElement | null>(null);

  return (
    <div className="h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-row h-full">
        <div className="flex flex-col justify-between w-1/4 border-gray-200 relative">
          <MeshGradientBackground />
          <div className="flex flex-col p-10 h-full w-full absolute">
            <Input
              className="flex mb-4 backdrop-blur-2xl bg-gray-400/10 hover:bg-gray-400/15 focus:bg-gray-400/15 transition duration-200 focus-visible:ring-0 font-medium shadow-none border-none placeholder:text-gray-500 placeholder:font-medium"
              placeholder="Title (for eg: Caleb & Ava)"
              onChange={handleTitleChange}
            />
            <Popover>
              <PopoverClose ref={popOverRef}></PopoverClose>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className="flex justify-start mb-4 px-3 backdrop-blur-2xl bg-gray-400/10 hover:bg-gray-400/15 focus:bg-gray-400/15 transition duration-200 focus-visible:ring-0 font-medium shadow-none border-none"
                >
                  {puzzleDate ? (
                    format(puzzleDate, "PPP")
                  ) : (
                    <span className="text-gray-500">Date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={puzzleDate}
                  initialFocus
                  onSelect={(e) => {
                    popOverRef.current?.click();
                    setPuzzleDate(e);
                  }}
                />
              </PopoverContent>
            </Popover>
            <Select onValueChange={setPaperSize}>
              <SelectTrigger
                className={`${
                  paperSize ? "" : "text-gray-500"
                } flex mb-4 backdrop-blur-2xl bg-gray-400/10 hover:bg-gray-400/15 focus:bg-gray-400/15 transition duration-200 focus-visible:ring-0 font-medium shadow-none border-none`}
              >
                <SelectValue placeholder="Paper size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A4">A4</SelectItem>
                <SelectItem value="A5">A5</SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={setIllustrations}>
              <SelectTrigger
                className={`${
                  illustration ? "" : "text-gray-500"
                } flex mb-4 backdrop-blur-2xl bg-gray-400/10 hover:bg-gray-400/15 focus:bg-gray-400/15 transition duration-200 focus-visible:ring-0 font-medium shadow-none border-none`}
              >
                <SelectValue placeholder="Illustration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Illustration 1">Illustration 1</SelectItem>
                <SelectItem value="Illustration 2">Illustration 2</SelectItem>
                <SelectItem value="Illustration 3">Illustration 3</SelectItem>
                <SelectItem value="Illustration 4">Illustration 4</SelectItem>
                <SelectItem value="Illustration 5">Illustration 5</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="p-10 flex flex-col w-full absolute bottom-0">
            <Textarea
              value={wordsList}
              onChange={handleWordsListChange}
              className="h-[16rem] flex mb-4 backdrop-blur-2xl bg-gray-400/10 hover:bg-gray-400/15 focus:bg-gray-400/15 transition duration-200 focus-visible:ring-0 font-medium shadow-none border-none placeholder:text-gray-500 placeholder:font-medium"
              placeholder="Words (one per line)"
            />
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
              {title || "Untitled"}
            </h1>
          </div>
          <div className="flex justify-center">
            <h6 className="text-sm mb-12 text-gray-400">
              {dayjs(puzzleDate).format("MMM DD, YYYY")}
            </h6>
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

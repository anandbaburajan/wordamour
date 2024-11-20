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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import WordSearch from "@blex41/word-search";
import { PopoverClose } from "@radix-ui/react-popover";
import { format } from "date-fns";
import dayjs from "dayjs";
import { Eye, EyeOff, Printer, Shuffle } from "lucide-react";
import { Instrument_Serif } from "next/font/google";
import { useRef, useState } from "react";
import generatePDF, { Margin, Resolution } from "react-to-pdf";
import { toast } from "sonner";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

export default function Home() {
  const [wordsList, setWordsList] = useState("");

  const handleWordsListChange = (event) => {
    setWordsList(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const [wordSearchObj, setWordSearchObj] = useState<WordSearch>();

  const [title, setTitle] = useState("");

  const [puzzleDate, setPuzzleDate] = useState<Date>();

  const [paperSize, setPaperSize] = useState("");

  const [wordsShown, setWordsShown] = useState(false);

  const [uniqueCoords, setUniqueCoords] = useState([]);

  const popOverRef = useRef<HTMLButtonElement | null>(null);

  const options = {
    // default is `save`
    method: "save",
    filename: "wordamour.pdf",
    // default is Resolution.MEDIUM = 3, which should be enough, higher values
    // increases the image quality but also the size of the PDF, so be careful
    // using values higher than 10 when having multiple pages generated, it
    // might cause the page to crash or hang.
    resolution: Resolution.MEDIUM,
    page: {
      // margin is in MM, default is Margin.NONE = 0
      margin: Margin.SMALL,
      // default is 'A4'
      format: "A4",
      // default is 'portrait'
      orientation: "portrait",
    },
    canvas: {
      // default is 'image/jpeg' for better size performance
      mimeType: "image/jpeg",
      qualityRatio: 1,
    },
    // Customize any value passed to the jsPDF instance and html2canvas
    // function. You probably will not need this and things can break,
    // so use with caution.
    overrides: {
      // see https://artskydj.github.io/jsPDF/docs/jsPDF.html for more options
      pdf: {
        compress: true,
      },
      // see https://html2canvas.hertzen.com/configuration for more options
      canvas: {
        useCORS: true,
      },
    },
  };

  // you can use a function to return the target element besides using React refs
  const getTargetElement = () => document.getElementById("content-id");

  return (
    <div className="h-screen overflow-y-hidden font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-row h-full">
        <div className="flex flex-col justify-between w-[20.6rem] border-gray-200 relative">
          <MeshGradientBackground />
          <div className="flex flex-col p-10 h-full w-full absolute">
            <Input
              className="flex mb-4 backdrop-blur-2xl bg-gray-400/10 hover:bg-gray-400/15 focus:bg-gray-400/15 transition duration-200 focus-visible:ring-0 font-medium shadow-none border-none placeholder:text-gray-500 placeholder:font-medium"
              placeholder="Title"
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
              <PopoverContent className="w-fit p-0" align="start">
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
                <SelectItem value="A4">A4 (8.27" x 11.69")</SelectItem>
                <SelectItem value="A5">A5 (5.83" x 8.27")</SelectItem>
                <SelectItem value="Letter">Letter (8.5" x 11")</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="p-10 flex flex-col w-full absolute bottom-0">
            <Textarea
              value={wordsList}
              onChange={handleWordsListChange}
              className="h-[16rem] resize-none flex mb-4 backdrop-blur-2xl bg-gray-400/10 hover:bg-gray-400/15 focus:bg-gray-400/15 transition duration-200 focus-visible:ring-0 font-medium shadow-none border-none placeholder:text-gray-500 placeholder:font-medium"
              placeholder="Words (one per line)"
            />
            <Button
              className="mb-10 bg-[#008A00] rounded-lg h-4 w-4 p-4 shadow-none text-white"
              onClick={() => {
                if (wordsList.split(/\r?\n/).length > 32) {
                  toast.info("Only 32 words are allowed.");
                  return;
                }

                if (wordsList.length === 0) return;

                const options = {
                  cols: 22,
                  rows: 16,
                  disabledDirections: ["N", "W", "NW", "SW", "NE"],
                  dictionary: wordsList.split(/\r?\n/),
                  maxWords: 32,
                  backwardsProbability: 0.3,
                  upperCase: true,
                  diacritics: true,
                };

                const ws = new WordSearch(options);

                setWordSearchObj(ws);

                setUniqueCoords(getUniqueCoordinates(ws.words));
              }}
            >
              <Shuffle className="h-3 w-3" strokeWidth={2} />
            </Button>
            <Sheet modal={false}>
              <SheetTrigger>
                <span className="font-medium text-sm text-black/40 cursor-pointer h-fit flex items-center w-full justify-between underline">
                  See example questions for inspiration
                </span>
              </SheetTrigger>
              <SheetContent
                onPointerDownOutside={(e) => e.preventDefault()}
                onInteractOutside={(e) => e.preventDefault()}
                className="min-w-[calc(75vw)] p-10"
              >
                <SheetHeader>
                  <SheetTitle>Example questions for inspiration</SheetTitle>
                  <SheetDescription>
                    <ul className="marker:text-gray-500 ml-4 mt-4 list-disc marker:font-bold space-y-2 text-black font-medium text-base">
                      <li>Easy-to-use word search puzzle maker</li>
                      <li>50+ questions to help you come up with words</li>
                      <li>5+ illustrations</li>
                      <li>Choose between A4/A5 paper sizes</li>
                      <li>High-quality PDF download</li>
                      <li>
                        What's your son's and/or daughter's name/nickname?
                      </li>
                      <li>What's your pet's name?</li>
                    </ul>
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        <div className="flex flex-col w-[calc(100vw-20.6rem)] bg-white">
          <div className="flex flex-col h-screen p-10 relative">
            <div className="absolute right-10 flex flex-col space-y-2">
              <Button
                onClick={() => generatePDF(getTargetElement, options)}
                className={`${
                  wordSearchObj ? "" : "invisible"
                } items-center transition duration-200 bg-gradient-to-r from-[#ff5858] to-[#f09819] hover:from-black hover:to-black h-4 w-4 p-4 rounded-lg font-medium shadow-none text-white`}
              >
                <Printer className="h-3 w-3" strokeWidth={2} />
              </Button>
              <Button
                className={`${
                  wordSearchObj ? "" : "invisible"
                } items-center bg-gray-600/10 h-4 w-4 p-4 rounded-lg hover:bg-gray-600/20 font-medium transition duration-200 shadow-none text-gray-700`}
                onClick={() => {
                  setUniqueCoords(getUniqueCoordinates(wordSearchObj.words));
                  setWordsShown(!wordsShown);
                }}
              >
                {!wordsShown && (
                  <>
                    <Eye className="h-3 w-3" strokeWidth={2} />
                  </>
                )}
                {wordsShown && (
                  <>
                    <EyeOff className="h-5 w-5" strokeWidth={2} />
                  </>
                )}
              </Button>
            </div>
            <div className="flex justify-center w-full h-screen bg-white flex-col items-center">
              <div className="flex justify-center mb-4">
                <h1 className={`text-5xl ${instrumentSerif.className}`}>
                  {title || "Untitled"}
                </h1>
              </div>
              <div className="flex justify-center">
                <h6 className="text-sm mb-16 text-gray-400">
                  {dayjs(puzzleDate).format("MMM DD, YYYY")}
                </h6>
              </div>
              <div className="flex justify-center">
                <table className="text-sm">
                  <tbody>
                    {wordSearchObj &&
                      wordSearchObj.grid.length > 0 &&
                      wordSearchObj.grid.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {row.map((cell, cellIndex) => (
                            <td
                              key={cellIndex}
                              className={`${
                                wordsShown &&
                                uniqueCoords.some(
                                  (coord) =>
                                    coord.x === cellIndex &&
                                    coord.y === rowIndex
                                )
                                  ? "bg-lime-300/50"
                                  : ""
                              } p-2 text-gray-900`}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div
            className="flex flex-col p-10 relative w-[210mm] min-h-[594mm] justify-center items-center bg-white"
            id="content-id"
          >
            <div className="flex justify-center w-full h-full bg-white flex-col items-center">
              <div className="flex justify-center mb-8">
                <h1 className={`text-5xl ${instrumentSerif.className}`}>
                  {title || "Untitled"}
                </h1>
              </div>
              <div className="flex justify-center">
                <h6 className="text-sm mb-16 text-gray-400">
                  {dayjs(puzzleDate).format("MMM DD, YYYY")}
                </h6>
              </div>
              <div className="flex justify-center">
                <table className="text-sm">
                  <tbody>
                    {wordSearchObj &&
                      wordSearchObj.grid.length > 0 &&
                      wordSearchObj.grid.map((row, rowIndex) => (
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
            <div className="flex justify-center w-full h-full bg-white flex-col items-center">
              <div className="flex justify-center mb-8">
                <h1 className={`text-5xl ${instrumentSerif.className}`}>
                  {title || "Untitled"}
                </h1>
              </div>
              <div className="flex justify-center">
                <h6 className="text-sm mb-16 text-gray-400">
                  {dayjs(puzzleDate).format("MMM DD, YYYY")}
                </h6>
              </div>
              <div className="flex justify-center">
                <table className="text-sm">
                  <tbody>
                    {wordSearchObj &&
                      wordSearchObj.grid.length > 0 &&
                      wordSearchObj.grid.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {row.map((cell, cellIndex) => (
                            <td
                              key={cellIndex}
                              className={`${
                                uniqueCoords.some(
                                  (coord) =>
                                    coord.x === cellIndex &&
                                    coord.y === rowIndex
                                )
                                  ? "bg-lime-300/50"
                                  : ""
                              } p-2 text-gray-900`}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <Toaster />
      </main>
    </div>
  );
}

function getUniqueCoordinates(data) {
  const uniqueCoordinates = new Set();

  data.forEach((item) => {
    item.path.forEach((coord) => {
      const key = `${coord.x},${coord.y}`; // Create a unique string representation
      uniqueCoordinates.add(key);
    });
  });

  // Convert the set back to an array of coordinate objects
  return Array.from(uniqueCoordinates).map((coord) => {
    const [x, y] = coord.split(",").map(Number);
    return { x, y };
  });
}

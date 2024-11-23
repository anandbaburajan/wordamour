"use client";

import MeshGradientBackground from "@/components/gradient";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
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
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import WordSearch from "@blex41/word-search";
import { PopoverClose } from "@radix-ui/react-popover";
import { format } from "date-fns";
import dayjs from "dayjs";
import { Coffee, Download, Eye, EyeOff, Shuffle } from "lucide-react";
import { Instrument_Serif } from "next/font/google";
import Link from "next/link";
import { useRef, useState } from "react";
import generatePDF, { Resolution } from "react-to-pdf";
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
      margin: 0.05,
      // default is 'A4'
      format: paperSize,
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

  const getTargetElement = () => document.getElementById("content-id");

  return (
    <div className="h-screen overflow-y-hidden font-[family-name:var(--font-geist-sans)]">
      <main className="hidden lg:flex flex-row h-full">
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
                <SelectItem value="letter">Letter (8.5" x 11")</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="p-10 flex flex-col w-full absolute bottom-0">
            <Textarea
              value={wordsList}
              onChange={handleWordsListChange}
              className="h-[20rem] resize-none flex mb-4 backdrop-blur-2xl bg-gray-400/10 hover:bg-gray-400/15 focus:bg-gray-400/15 transition duration-200 focus-visible:ring-0 font-medium shadow-none border-none placeholder:text-gray-500 placeholder:font-medium"
              placeholder="Words (one per line)"
            />
            <Button
              className="mb-10 bg-[#008A00] hover:bg-[#339833] rounded-lg h-4 w-4 p-4 shadow-none text-white"
              onClick={() => {
                if (wordsList.length === 0) {
                  toast.info("Please enter some words.");
                  return;
                }

                if (wordsList.split(/\r?\n/).length > 32) {
                  toast.info("Only 32 words are allowed.");
                  return;
                }

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
              <SheetTrigger asChild>
                <span className="font-medium text-sm text-black/40 cursor-pointer h-fit flex items-center w-full justify-between underline underline-offset-4">
                  See example questions for inspiration
                </span>
              </SheetTrigger>
              <SheetContent
                onPointerDownOutside={(e) => e.preventDefault()}
                onInteractOutside={(e) => e.preventDefault()}
                className="min-w-[calc(100vw-20.6rem)] p-10 overflow-y-auto"
              >
                <SheetTitle>Example questions for inspiration</SheetTitle>
                <SheetDescription>
                  <ul className="marker:text-gray-500 ml-4 mt-4 list-disc marker:font-bold space-y-2 text-black font-medium text-base">
                    <li>Nice adjectives to describe your partner?</li>
                    <li>Nicknames?</li>
                    <li>Birth place?</li>
                    <li>
                      Words reminding of your partner's adventurous moments?
                    </li>
                    <li>Words reminding of your partner's special moments?</li>
                    <li>
                      Words reminding of special moments shared by you two?
                    </li>
                    <li>
                      Words reminding of your partner's embarrasing moments?
                    </li>
                    <li>Words reminding of your partner's dreams?</li>
                    <li>Words reminding of your inside jokes?</li>
                    <li>Go-to drink?</li>
                    <li>
                      Where did your partner go for high school or college?
                    </li>
                    <li>
                      Words reminding of your partner's favorite monthly/annual
                      activies?
                    </li>
                    <li>Quirky words your partner uses?</li>
                    <li>A song you loving jamming together?</li>
                    <li>Favourite snacks or dishes or street food?</li>
                    <li>Where did you first meet?</li>
                    <li>Pet's name?</li>
                    <li>Kinds of animals they adore?</li>
                    <li>Son's and/or daughter's name/nickname?</li>
                    <li>Where did you go or plan to go for honeymoon?</li>
                    <li>Favorite childhood cartoon character?</li>
                    <li>Words related to their favourite subject/topic?</li>
                    <li>First dream job?</li>
                    <li>Favorite color?</li>
                    <li>Favorite season?</li>
                    <li>Favorite sports?</li>
                    <li>Favorite books/movies/shows/songs/games?</li>
                    <li>Favorite bands/artists?</li>
                    <li>Favorite clothing/shoe/tech brands?</li>
                    <li>Dream car?</li>
                  </ul>
                </SheetDescription>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        <div className="flex flex-col w-[calc(100vw-20.6rem)] bg-white">
          <div className="flex flex-col h-screen p-10 relative">
            <div className="absolute right-10 flex flex-col space-y-2">
              {wordSearchObj && (!title || !puzzleDate || !paperSize) && (
                <Button
                  onClick={() => {
                    if (!title) {
                      toast.info("Please set the title.");
                      return;
                    }

                    if (!puzzleDate) {
                      toast.info("Please set the date for the puzzle.");
                      return;
                    }

                    if (!paperSize) {
                      toast.info("Please set the paper size.");
                      return;
                    }
                  }}
                  className="items-center transition duration-200 bg-gradient-to-r from-[#ff5858] to-[#f09819] hover:from-[#fa6969] hover:to-[#fbaa38] h-4 w-4 p-4 rounded-lg font-medium shadow-none text-white"
                >
                  <Download className="h-3 w-3" strokeWidth={2} />
                </Button>
              )}
              {title && puzzleDate && paperSize && wordSearchObj && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      onClick={() => generatePDF(getTargetElement, options)}
                      className="items-center transition duration-200 bg-gradient-to-r from-[#ff5858] to-[#f09819] hover:from-[#fa6969] hover:to-[#fbaa38] h-4 w-4 p-4 rounded-lg font-medium shadow-none text-white"
                    >
                      <Download className="h-3 w-3" strokeWidth={2} />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="p-12 w-auto">
                    <p>Your Wordamour has been downloaded!</p>
                    <p>
                      There are two pages to be printed — the first one with the
                      word search puzzle and the second one with the solutions
                      (to be shared later). I would highly recommend folding the
                      first page into an{" "}
                      <Link
                        href="https://www.youtube.com/watch?v=jizmI8xUA6Q"
                        className="underline underline-offset-4"
                      >
                        origami heart
                      </Link>{" "}
                      for gifting!
                    </p>
                    <p>
                      If Wordamour brings a smile to your special someone's
                      face, do consider{" "}
                      <Link
                        href="https://www.buymeacoffee.com/anandbaburajan"
                        className="underline underline-offset-4 inline-flex items-center"
                      >
                        buying me a coffee{" "}
                        <Coffee
                          className="h-5 w-5 ml-1 text-[#FEDD03]"
                          strokeWidth={2}
                        />
                      </Link>
                      !
                    </p>
                  </DialogContent>
                </Dialog>
              )}
              <Button
                className={`${
                  wordSearchObj ? "" : "invisible"
                } items-center bg-gray-600/10 h-4 w-4 p-4 rounded-lg hover:bg-gray-600/15 font-medium transition duration-200 shadow-none text-gray-700`}
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
                  {puzzleDate
                    ? dayjs(puzzleDate).format("MMM DD, YYYY")
                    : "Date"}
                </h6>
              </div>
              <div className="flex justify-center">
                {wordSearchObj ? (
                  <table className="text-sm">
                    <tbody>
                      {wordSearchObj.grid.length > 0 &&
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
                ) : (
                  <div className="flex items-center justify-center w-[37rem] h-[36rem] border border-gray-200 rounded-lg text-gray-400">
                    No words added yet.
                  </div>
                )}
              </div>
            </div>
          </div>
          <div
            className={cn(
              "flex flex-col bg-white",
              paperSize === "A4" && "w-[210mm] min-h-[594mm]",
              paperSize === "A5" && "w-[148mm] min-h-[420mm]",
              paperSize === "letter" && "w-[215.9mm] min-h-[558.8mm]"
            )}
            id="content-id"
          >
            <div
              className={cn(
                "flex justify-center w-full h-1/2 bg-white flex-col items-center",
                paperSize === "A4" && "a4-bg",
                paperSize === "A5" && "a5-bg",
                paperSize === "letter" && "letter-bg"
              )}
            >
              <div className="flex justify-center mb-8">
                <h1 className={`text-5xl ${instrumentSerif.className}`}>
                  {title || "Untitled"}
                </h1>
              </div>
              <div className="flex justify-center">
                <h6 className="text-sm mb-16 text-gray-400">
                  {puzzleDate
                    ? dayjs(puzzleDate).format("MMM DD, YYYY")
                    : "Date"}
                </h6>
              </div>
              <div className="flex justify-center">
                <table
                  className={cn(
                    paperSize === "A4" && "text-sm",
                    paperSize === "letter" && "text-sm",
                    paperSize === "A5" && "text-xs"
                  )}
                >
                  <tbody>
                    {wordSearchObj &&
                      wordSearchObj.grid.length > 0 &&
                      wordSearchObj.grid.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {row.map((cell, cellIndex) => (
                            <td
                              key={cellIndex}
                              className={cn(
                                "text-gray-900",
                                paperSize === "A4" && "p-2",
                                paperSize === "letter" && "p-2",
                                paperSize === "A5" && "p-1.5"
                              )}
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
            <div
              className={cn(
                "flex justify-center w-full h-1/2 bg-white flex-col items-center",
                paperSize === "A4" && "a4-bg",
                paperSize === "A5" && "a5-bg",
                paperSize === "letter" && "letter-bg"
              )}
            >
              <div className="flex justify-center mb-8">
                <h1 className={`text-5xl ${instrumentSerif.className}`}>
                  {title || "Untitled"}
                </h1>
              </div>
              <div className="flex justify-center">
                <h6 className="text-sm mb-16 text-gray-400">
                  {puzzleDate
                    ? dayjs(puzzleDate).format("MMM DD, YYYY")
                    : "Date"}
                </h6>
              </div>
              <div className="flex justify-center">
                <table
                  className={cn(
                    paperSize === "A4" && "text-sm",
                    paperSize === "letter" && "text-sm",
                    paperSize === "A5" && "text-xs"
                  )}
                >
                  <tbody>
                    {wordSearchObj &&
                      wordSearchObj.grid.length > 0 &&
                      wordSearchObj.grid.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {row.map((cell, cellIndex) => (
                            <td
                              key={cellIndex}
                              className={cn(
                                "text-gray-900",
                                uniqueCoords.some(
                                  (coord) =>
                                    coord.x === cellIndex &&
                                    coord.y === rowIndex
                                ) && "bg-gray-300/50",
                                paperSize === "A4" && "p-2",
                                paperSize === "letter" && "p-2",
                                paperSize === "A5" && "p-1.5"
                              )}
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

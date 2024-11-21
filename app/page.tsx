import MeshGradientBackground from "@/components/gradient";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Instrument_Serif } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

export default function Home() {
  return (
    <div className="w-screen h-screen overflow-y-hidden flex flex-col font-[family-name:var(--font-geist-sans)] p-5">
      <MeshGradientBackground />
      <div className="flex flex-row justify-between w-full h-[5rem]">
        <h5 className={`text-lg text-black`}>@ Wordamour</h5>
        <Link
          href="https://www.buymeacoffee.com/anandbaburajan"
          className="h-fit"
        >
          <Button
            className="bg-gray-600/10 hover:bg-gray-600/15 font-medium text-sm transition duration-200 rounded-xl shadow-none text-gray-600"
            size={"sm"}
          >
            Buy me a coffee?
          </Button>
        </Link>
      </div>
      <div className="flex flex-row justify-center items-center h-[calc(100vh-5rem)]">
        <div className="flex flex-col w-[50rem] ml-[11rem] mr-[5rem]">
          <h1
            className={`${instrumentSerif.className} text-6xl text-black mt-6`}
          >
            Surprise your <br />
            special someone with
            <br />a personalised puzzle.
          </h1>
          <h3
            className={`flex font-normal text-xl text-black/40 mt-6 w-[40rem]`}
          >
            Turn your cherished words into a beautiful, printed word search
            puzzle. Choose sweet nicknames, inside jokes, and treasured memories
            that mean the most to you both. A thoughtful gift that's uniquely
            yours.
          </h3>
          <Link href="/app" className="h-fit mt-6 w-fit">
            <Button className="flex w-max text-md rounded-xl border-t border-[#fff9f9] transition duration-200 bg-gradient-to-r from-[#ff5858] to-[#f09819] hover:from-[#fa6969] hover:to-[#fbaa38]">
              Create your Wordamour — it's free
            </Button>
          </Link>
          <div className={`flex mt-16`}>
            <Dialog>
              <DialogTrigger>
                <span className="font-medium text-md text-black/70 underline cursor-pointer">
                  Features
                </span>
              </DialogTrigger>
              <DialogContent className="p-12 w-auto">
                <ul
                  className={`marker:text-gray-500 list-disc marker:font-bold space-y-2`}
                >
                  <li>Easy-to-use word search puzzle maker</li>
                  <li>25+ questions to help you come up with words</li>
                  <li>High-quality PDF (A4/A5/Letter) download</li>
                  <li>100% secure (your data is never stored with us)</li>
                  <li>
                    100% free (you can{" "}
                    <Link
                      href="https://www.buymeacoffee.com/anandbaburajan"
                      className="underline"
                    >
                      buy me a coffee
                    </Link>{" "}
                    if you like!)
                  </li>
                </ul>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="flex w-[50rem]">
          <Image
            src="/demo.png"
            className="rounded-lg origin-top-left rotate-12"
            width={500}
            height={0}
            alt="Wordamour example"
            priority={true}
            unoptimized={true}
          ></Image>
        </div>
      </div>
    </div>
  );
}

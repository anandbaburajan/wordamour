import MeshGradientBackground from "@/components/gradient";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Playfair_Display } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
});

export default function Home() {
  return (
    <div className="w-screen h-screen flex flex-col font-[family-name:var(--font-geist-sans)] p-5">
      <MeshGradientBackground />
      <div className="flex flex-row justify-between w-full h-[5rem]">
        <h5 className="font-semibold text-xl text-gray-500">@</h5>
        <Link
          href="https://www.buymeacoffee.com/anandbaburajan"
          className="h-fit"
        >
          <Button
            className="bg-gray-600/10 hover:bg-gray-600/20 font-medium text-sm transition duration-200 rounded-2xl shadow-none text-gray-600"
            size={"sm"}
          >
            Buy me a coffee?
          </Button>
        </Link>
      </div>
      <div className="flex flex-row justify-center items-center h-[calc(100vh-5rem)]">
        <div className="flex flex-col w-[50rem] ml-[11rem] mr-[5rem]">
          <h5
            className={`${playfair.className} font-semibold text-3xl text-black/25`}
          >
            Wordamour
          </h5>
          <h1
            className={`${playfair.className} flex font-semibold text-5xl text-black/70 backdrop-blur-4xl mt-6`}
          >
            Surprise your <br />
            special someone with
            <br />a personalised puzzle.
          </h1>
          <h3 className={`flex font-medium text-xl text-black/40 mt-6`}>
            Turn your cherished words into a beautiful, printed word search
            puzzle. Choose sweet nicknames, inside jokes, and treasured memories
            that mean the most to you both. A thoughtful gift that's uniquely
            yours.
          </h3>
          <Link href="/app" className="h-fit mt-6 w-fit">
            <Button className="flex w-max text-md transition duration-200 bg-gradient-to-r from-[#ff5858] to-[#f09819] hover:from-black hover:to-black">
              Create your Wordamour — it's free
            </Button>
          </Link>
          <div className={`flex mt-16`}>
            <Dialog>
              <DialogTrigger>
                <span className="font-medium text-md text-black/40 underline cursor-pointer">
                  Features
                </span>
              </DialogTrigger>
              <DialogContent className="p-12 w-auto">
                <ul
                  className={`marker:text-gray-500 list-disc marker:font-bold space-y-2`}
                >
                  <li>Easy-to-use word search puzzle maker</li>
                  <li>50+ questions to help you come up with words</li>
                  <li>Choose between A4/A5/Letter paper sizes</li>
                  <li>High-quality PDF download</li>
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
            alt="Demo"
          ></Image>
        </div>
      </div>
    </div>
  );
}

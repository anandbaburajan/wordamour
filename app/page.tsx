import MeshGradientBackground from "@/components/gradient";
import LogoW from "@/components/logo-w";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
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
    <div className="w-screen lg:h-screen h-[100dvh] lg:overflow-y-hidden overflow-x-hidden flex flex-col font-[family-name:var(--font-geist-sans)] p-8 lg:p-5">
      <MeshGradientBackground />
      <div className="flex flex-row justify-between w-full h-[5rem]">
        <Link href="/" className="mt-1.5">
          <LogoW className="w-[1.8rem]" />
        </Link>
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
      <div className="hidden lg:flex flex-row justify-center items-center h-[calc(100vh-5rem)]">
        <div className="flex flex-col w-[50rem] ml-[11rem] mr-[5rem]">
          <h1
            className={`${instrumentSerif.className} text-6xl text-black mt-6 leading-[1.05]`}
          >
            Surprise your <br />
            special someone
            <br />
            with a Wordamour.
          </h1>
          <h3
            className={`flex font-normal text-xl text-black/40 mt-6 w-[36rem]`}
          >
            Turn your cherished words into a beautiful, printed word search
            puzzle. Choose sweet nicknames, inside jokes, and treasured memories
            that mean the most to you both. A thoughtful gift that's uniquely
            yours.
          </h3>
          <Link href="/app" className="h-fit mt-6 w-fit">
            <Button className="flex w-max text-md rounded-xl border-t border-[#fff9f9] shadow-lg transition duration-200 bg-gradient-to-r from-[#ff5858] to-[#f09819] hover:from-[#fa6969] hover:to-[#fbaa38]">
              Create your Wordamour — it's free
            </Button>
          </Link>
          <div className={`flex mt-16`}>
            <Dialog>
              <DialogTrigger asChild>
                <span className="font-medium text-md text-black/70 underline cursor-pointer underline-offset-4">
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
        <div className="flex w-[48rem]">
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
      <div className="lg:hidden">
        <h1
          className={`${instrumentSerif.className} text-5xl text-black mt-20 leading-[1.05]`}
        >
          Surprise your
          <br />
          special someone
          <br />
          with a Wordamour.
        </h1>
        <h3 className={`flex font-normal text-lg text-black/40 my-6`}>
          Turn your cherished words into a beautiful, printed word search
          puzzle. Choose sweet nicknames, inside jokes, and treasured memories
          that mean the most to you both. A thoughtful gift that's uniquely
          yours.
        </h3>
        <Link href="/app" className="h-fit w-fit">
          <Button className="flex w-full text-md rounded-xl border-t border-[#fff9f9] shadow-lg transition duration-200 bg-gradient-to-r from-[#ff5858] to-[#f09819] hover:from-[#fa6969] hover:to-[#fbaa38]">
            Create your Wordamour — it's free
          </Button>
        </Link>
        <div className="mt-16">
          <Drawer>
            <DrawerTrigger>
              <span className="font-medium text-md text-black/70 underline cursor-pointer underline-offset-4">
                Features
              </span>
            </DrawerTrigger>
            <DrawerContent>
              <ul
                className={`marker:text-gray-500 list-disc marker:font-bold space-y-2 m-10`}
              >
                <li>Easy-to-use word search puzzle maker</li>
                <li>25+ questions to help you with words</li>
                <li>High-quality PDF (A4/A5/Letter) download</li>
                <li>100% secure (no data stored)</li>
                <li>
                  100% free (
                  <Link
                    href="https://www.buymeacoffee.com/anandbaburajan"
                    className="underline"
                  >
                    buy me a coffee
                  </Link>{" "}
                  if you like!)
                </li>
              </ul>
            </DrawerContent>
          </Drawer>
        </div>
        <div className="">
          <Image
            src="/demo.png"
            className="rounded-lg mt-16"
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

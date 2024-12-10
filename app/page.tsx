import GitHubLogoSVG from "@/components/github-logo";
import MeshGradientBackground from "@/components/gradient";
import LogoPlain from "@/components/logo-plain";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Quote } from "lucide-react";
import { DM_Serif_Display, Instrument_Serif } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

const DMSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
  style: ["normal", "italic"],
});

export default function Home() {
  return (
    <div className="w-screen lg:h-screen h-[100dvh] lg:overflow-y-hidden overflow-x-hidden flex flex-col font-[family-name:var(--font-geist-sans)] p-8 lg:p-5">
      <MeshGradientBackground />
      <div className="flex flex-row justify-between items-center w-full h-[2rem] z-50">
        <Link href="/">
          <LogoPlain className="w-[1.3rem]" color="#000" opacity="80%" />
        </Link>
        <div className="flex flex-row items-center">
          <Link
            href="https://github.com/anandbaburajan/wordamour"
            className="hidden lg:block lg:mr-8"
          >
            <GitHubLogoSVG className="h-[1rem] w-[1rem]" />
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
      </div>
      <div className="hidden lg:flex flex-row justify-center items-center h-[calc(100vh-5rem)]">
        <div className="flex flex-col w-[50rem] ml-[11rem] mr-[5rem]">
          <h1
            className={`${instrumentSerif.className} text-6xl text-black leading-[1.05]`}
          >
            Surprise your <br />
            special someone
            <br />
            with a{" "}
            <span
              className={`${DMSerifDisplay.className} italic text-black/60`}
            >
              Wordamour
            </span>
          </h1>
          <h3
            className={`flex font-normal text-xl text-black/40 mt-6 w-[36rem]`}
          >
            Turn your cherished words into a beautiful, printed word search
            puzzle. Choose sweet nicknames, inside jokes, and treasured memories
            that mean the most to you both. A thoughtful gift that&apos;s
            uniquely yours.
          </h3>
          <div className={`flex mt-8 items-center space-x-8`}>
            <div>
              <Link href="/app" className="h-fit w-fit">
                <Button className="text-base font-medium relative border border-[transparent] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-neutral-900 hover:opacity-90 transition-all duration-150 ease-in-out flex w-72 items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-[#ff5858] to-[#f09819] px-4 py-2 text-white shadow-inner before:pointer-events-none before:absolute before:inset-0 before:rounded-xl before:shadow-[0px_2px_0.4px_0px_rgba(255,_255,_255,_0.16)_inset] hover:shadow-none">
                  Create your Wordamour — it&apos;s free
                </Button>
              </Link>
            </div>
            <div>
              <Dialog>
                <DialogTrigger asChild>
                  <span className="font-medium text-base text-black/70 underline cursor-pointer underline-offset-4">
                    Features
                  </span>
                </DialogTrigger>
                <DialogContent className="p-12 w-auto font-[family-name:var(--font-geist-sans)]">
                  <ul
                    className={`marker:text-gray-500 list-disc marker:font-bold space-y-2`}
                  >
                    <li>Easy-to-use word search puzzle maker</li>
                    <li>25+ questions to help you come up with words</li>
                    <li>Beautiful, high-quality PDF (A4/A5/Letter) download</li>
                    <li>No sign-up required and your data is never stored</li>
                    <li>
                      Free (you can{" "}
                      <Link
                        href="https://www.buymeacoffee.com/anandbaburajan"
                        className="underline underline-offset-4"
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
          <div className="flex flex-row mt-20 w-[25rem] space-x-3">
            <div>
              <Quote
                className="h-5 w-5 rotate-180 text-black/40"
                strokeWidth={1.5}
              />
            </div>
            <div>
              <Link
                href="https://buymeacoffee.com/anandbaburajan/c/11872378"
                target="_blank"
                className="italic font-normal text-base text-black/40 hover:underline underline-offset-4"
              >
                Just celebrated 20 years of meeting my soulmate and it was a
                blast hunting down all our words. Awesome idea. Thanks!
              </Link>
            </div>
          </div>
        </div>
        <div className="flex w-[48rem]">
          <Image
            src="/demo.png"
            className="origin-top-left rotate-12 rounded-lg shadow-xl"
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
          className={`${instrumentSerif.className} text-[2.6rem] text-black mt-20 leading-[1.05]`}
        >
          Surprise your
          <br />
          special someone
          <br />
          with a{" "}
          <span className={`${DMSerifDisplay.className} italic text-black/60`}>
            Wordamour
          </span>
        </h1>
        <h3 className={`flex font-normal text-lg text-black/40 my-6 leading-6`}>
          Turn your cherished words into a beautiful, printed word search
          puzzle. Choose sweet nicknames, inside jokes, and treasured memories
          that mean the most to you both. A thoughtful gift that&apos;s uniquely
          yours.
        </h3>
        <div className={`flex mt-8 items-center space-x-8`}>
          <div>
            <Link href="/app" className="h-fit w-fit">
              <Button className="text-base font-medium relative border border-[transparent] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-neutral-900 hover:opacity-90 transition-all duration-150 ease-in-out flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-[#ff5858] to-[#f09819] px-4 py-2 text-white shadow-inner before:pointer-events-none before:absolute before:inset-0 before:rounded-xl before:shadow-[0px_2px_0.4px_0px_rgba(255,_255,_255,_0.16)_inset] hover:shadow-none">
                Go to app — it&apos;s free
              </Button>
            </Link>
          </div>
          <div>
            <Drawer>
              <DrawerTrigger>
                <span className="font-medium text-base text-black/70 underline cursor-pointer underline-offset-4">
                  Features
                </span>
              </DrawerTrigger>
              <DrawerContent>
                <ul
                  className={`marker:text-gray-500 list-disc marker:font-bold space-y-2 m-10`}
                >
                  <li>Easy-to-use word search puzzle maker</li>
                  <li>25+ questions to help you with words</li>
                  <li>Beautiful, high-quality PDF download</li>
                  <li>No sign-up and your data is never stored</li>
                  <li>
                    Free (
                    <Link
                      href="https://www.buymeacoffee.com/anandbaburajan"
                      className="underline underline-offset-4"
                    >
                      buy me a coffee
                    </Link>{" "}
                    if you like!)
                  </li>
                </ul>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
        <div className="flex flex-row space-x-3 w-full mt-24 mb-16">
          <div>
            <Quote
              className="h-5 w-5 rotate-180 text-black/40"
              strokeWidth={1.5}
            />
          </div>
          <div>
            <Link
              href="https://buymeacoffee.com/anandbaburajan/c/11872378"
              target="_blank"
              className="italic font-normal text-base text-black/40 hover:underline underline-offset-4"
            >
              Just celebrated 20 years of meeting my soulmate and it was a blast
              hunting down all our words. Awesome idea. Thanks!
            </Link>
          </div>
        </div>
        <div>
          <Image
            src="/demo.png"
            className="rounded-lg origin-top-left ml-8 rotate-12"
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

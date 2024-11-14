import MeshGradientBackground from "@/components/gradient";
import { Playfair_Display } from "next/font/google";
import Image from "next/image";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
});

export default function Home() {
  return (
    <div className="w-screen h-screen flex font-[family-name:var(--font-geist-sans)] p-5">
      <h5
        className={`${playfair.className} font-semibold text-lg text-black/80`}
      >
        Wordamour
      </h5>
      <MeshGradientBackground />
      <div className="flex flex-row mt-[14rem]">
        <div className="flex flex-col w-1/2">
          <h1
            className={`${playfair.className} flex font-semibold text-5xl text-black/70 backdrop-blur-4xl`}
          >
            Create a personalised, printable word search puzzle for your
            partner.
          </h1>
          <h3 className={`flex font-medium text-xl text-black/40 mt-6`}>
            Custom Wedding Small Word Search Puzzle, Sip & Search, 5x7 Puzzle
            Template, Wedding Games, Fully Editable Game, Personalized Puzzle |
            WG105
          </h3>
        </div>
        <div className="flex w-1/2 relative h-full">
          <Image
            src="/demo.png"
            className="rounded-lg"
            layout="fill"
            objectFit="cover"
            alt="Demo"
          ></Image>
        </div>
      </div>
    </div>
  );
}

"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";

const Testimonial = () => (
  <Carousel
    plugins={[
      Autoplay({
        delay: 5000,
      }),
      Fade(),
    ]}
  >
    <CarouselContent>
      <CarouselItem className="italic font-normal text-base text-black/40">
        Just celebrated 20 years of meeting my soulmate and it was a blast
        hunting down all our words. Awesome idea. Thanks!
      </CarouselItem>
      <CarouselItem className="italic font-normal text-base text-black/40">
        My wife loved Wordamour, thank you!
      </CarouselItem>
      <CarouselItem className="italic font-normal text-base text-black/40">
        Such a fun trip down memory lane. My partner loved it!
      </CarouselItem>
      <CarouselItem className="italic font-normal text-base text-black/40">
        Thanks for saving my valentines!
      </CarouselItem>
    </CarouselContent>
  </Carousel>
);

export default Testimonial;

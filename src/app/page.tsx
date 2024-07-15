import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between text-center">
      <p className="font-extrabold text-[5rem] py-10 tracking-widest text-center">
        Project PAGSACA
      </p>

      <Carousel className="w-[80%] text-center">
        <CarouselContent>
          <CarouselItem>
            <Card className="min-h-[50vh] text-center">
              <CardHeader>
                <CardTitle>ABSTRACT</CardTitle>
                <CardDescription>What is Project PAGSACA?</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center items-center">
                <p className="text-xl text-justify">
                  Project PAGSACA stands for PMFC And orGanic Solar cells for
                  Accumulating Charge through Agriculture. The title PAGSACA
                  comes from the Filipino and Waray word ”pagsaka”; in Filipino,
                  it means to farm, and in Waray-waray, a language spoken in the
                  provinces of Samar, Leyte, and Biliran, it means to rise or go
                  upwards. This title encapsulates the project's main goal of
                  innovating the idea of vertical farming with the combined use
                  of different technologies such as Plant Microbial Fuel Cells
                  (PMFCs), Electroculture, Organic Solar/Photovoltaic Cells, and
                  Internet of Things (IoT) Systems pioneering a new field of
                  sustainable, smart, and modular vertical farming. To narrow
                  the study's scope, the project was configured around the plant
                  Oryza sativa or rice due to its significant importance not
                  just to the Filipino people but also to the wider
                  international community. Project PAGSACA serves as a basis for
                  innovation in the agricultural sector by providing a viable
                  solution to vertical farming's major challenges while
                  providing additional unique benefits of its own.
                </p>
              </CardContent>
              <CardFooter className="flex items-center justify-center">
                <p className="text-center">
                  Project PAGSACA is a finalist in the 7th IMake WeMake: Create,
                  Innovate, Collaborate competition by DOST-SEI
                  <br />
                  By: Charles Joshua Uy, Christopher Allen ABit, and Sebastian
                  Andre Mercado.
                  <br />
                  Coached By: Sir. Ramene Lim and Sir. Vinci Gabumpa
                  <br />
                  From the Philippine Science High School - Eastern Visyas
                  Campus Center for Research in Science and Technology (CReST)
                </p>
              </CardFooter>
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card className="min-h-[50vh]">
              <CardHeader>
                <CardTitle>POSTER</CardTitle>
                <CardDescription>WHAT is Project PAGSACA?</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center">
                <p>HELLO</p>
              </CardContent>
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card className="min-h-[50vh]">
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card Description</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card Content</p>
              </CardContent>
              <CardFooter>
                <p>Card Footer</p>
              </CardFooter>
            </Card>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </main>
  );
}

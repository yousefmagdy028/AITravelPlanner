import { Button } from "@/components/ui/button";
import Image from "next/image";
import Hero from "./_components/Hero";
import Offers from "./_components/Offers";
import Destination from "./_components/Destination";

export default function Home() {
  return (
    <div>
    <Hero/>
    <Offers/>
    <Destination/>
    </div>
  );
}

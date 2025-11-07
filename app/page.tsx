import { Metadata } from "next";
import HomeClient from "./home-client";

export const metadata: Metadata = {
  title: "Synctom - Digital Solutions That Drive Innovation",
  description: "Transform your business with Synctom's expert web development, mobile apps, UI/UX design, and digital solutions. We build scalable products that help businesses grow.",
  keywords: "web development, mobile app development, UI/UX design, digital solutions, software development, Synctom",
  openGraph: {
    title: "Synctom - Digital Solutions That Drive Innovation",
    description: "Transform your business with Synctom's expert web development, mobile apps, UI/UX design, and digital solutions.",
    type: "website",
    url: "https://www.synctom.com",
  },
};

export default function Home() {
  return <HomeClient />;
}

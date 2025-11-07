import { Metadata } from "next";
import ContactClient from "./contact-client";

export const metadata: Metadata = {
  title: "Contact Us | Synctom - Let's Build Something Great Together",
  description:
    "Get in touch with Synctom for your next digital project. We're ready to help with web development, mobile apps, UI/UX design, and digital solutions.",
  keywords:
    "contact synctom, web development inquiry, mobile app development, UI/UX design services, digital solutions consultation",
  openGraph: {
    title: "Contact Us | Synctom - Let's Build Something Great Together",
    description:
      "Get in touch with Synctom for your next digital project. We're ready to help with your digital transformation.",
    type: "website",
  },
};


export default function Contact() {
  return (
    <div className="min-h-screen">
      <ContactClient />
    </div>
  );
}

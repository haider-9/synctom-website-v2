"use client";

import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Hide header and footer
    const header = document.querySelector("header");
    const footer = document.querySelector("footer");
    const main = document.querySelector("main");

    if (header) header.style.display = "none";
    if (footer) footer.style.display = "none";
    if (main) main.style.paddingTop = "0";

    // Cleanup on unmount
    return () => {
      if (header) header.style.display = "";
      if (footer) footer.style.display = "";
      if (main) main.style.paddingTop = "";
    };
  }, []);

  return <>{children}</>;
}

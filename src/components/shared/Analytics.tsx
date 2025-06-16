"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gtag: (...args: never[]) => void;
  }
}

export default function Analytics() {
  useEffect(() => {
    const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

    if (GA_ID) {
      // Load Google Analytics
      const script = document.createElement("script");
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
      script.async = true;
      document.head.appendChild(script);

      window.gtag = function () {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        // eslint-disable-next-line prefer-rest-params
        (window as never).dataLayer.push(arguments);
      };

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      window.gtag("js", new Date());
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      window.gtag("config", GA_ID);
    }
  }, []);

  return null;
}

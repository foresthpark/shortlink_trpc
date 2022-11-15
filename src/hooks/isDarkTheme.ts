import { useEffect, useState } from "react";
import React from "react";

const useThemeDetector = () => {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>();

  const mqListerner = (e: any) => {
    setIsDarkTheme(e.matches);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
  }, []);

  //   useEffect(() => {
  //     const mq = getMatchMedia();
  //     if (mq) {
  //       mq.addListener(mqListerner);
  //       return () => mq.removeListener(mqListerner);
  //     }
  //   });

  return isDarkTheme;
};

export default useThemeDetector;

"use client";

import { checkPWA } from "@/utils";
import { useEffect, useState } from "react";

export const useIsPWA = () => {
  const [isPWA, setIsPWA] = useState<undefined | boolean>(undefined);

  const handlePWA = () => {
    const isStandalone = checkPWA();
    setIsPWA(isStandalone);
  };

  useEffect(() => {
    handlePWA();

    const media = window.matchMedia("(display-mode: standlone)");

    media.addEventListener("change", checkPWA);
    return () => {
      media.removeEventListener("change", checkPWA);
    };
  }, []);

  return isPWA;
};

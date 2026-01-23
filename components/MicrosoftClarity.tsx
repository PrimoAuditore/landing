"use client";

import { useEffect } from "react";
import Clarity from "@microsoft/clarity";

export const MicrosoftClarity = () => {
  useEffect(() => {
    Clarity.init("v62v8ibsbs");
  }, []);

  return null;
};

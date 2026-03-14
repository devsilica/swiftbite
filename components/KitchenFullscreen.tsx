"use client";

import { useEffect } from "react";

export default function KitchenFullscreen() {

  useEffect(() => {
    const el = document.documentElement;

    if (el.requestFullscreen) {
      el.requestFullscreen().catch(() => {});
    }
  }, []);

  return null;
}
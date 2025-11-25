// main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/global.css";
import App from "./App";
import { useThemeStore } from "@/store/useThemeStore";

const stored = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

type ThemeType = "dark" | "light";
const initialTheme: ThemeType =
  stored === "dark" || stored === "light"
    ? stored
    : prefersDark
    ? "dark"
    : "light";

document.documentElement.classList.toggle("dark", initialTheme === "dark");

useThemeStore.setState({ theme: initialTheme });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

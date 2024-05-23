import { useStore } from "@nanostores/react";
import type { ReactNode } from "react";
import { isDarkMode } from "../scripts/atom";


export const Layout = ({ children }: { children: ReactNode }) => {
  const $isDarkMode = useStore(isDarkMode);

  return (
    <main className={`${$isDarkMode ? 'dark' : 'light'}`}>
      {children}
    </main>
  )
}
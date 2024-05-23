import { isDarkMode } from "../scripts/atom";
import { Icon } from "./Icon";
import { useStore } from "@nanostores/react";

export const DarkModeButton = () => {
  const $isDarkMode = useStore(isDarkMode);

  return (
    <button onClick={() => isDarkMode.set(!$isDarkMode)}>
      {$isDarkMode
        ? <Icon name="sun" className="w-5 h-5"/>
        : <Icon name="moon" className="w-5 h-5"/>
      }
    </button>
  )
}
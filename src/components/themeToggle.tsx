import {h} from "preact";
import {useTheme} from "./themeProvider.tsx";

export function ThemeToggle() {


    const {theme, toggleTheme} = useTheme()
    console.log(`Theme in toggle: ${theme}`);

    return (
        <a className={"typo_header"} onClick={toggleTheme}>{theme === 'light' ? 'dark' : 'light'}</a>
    )
}
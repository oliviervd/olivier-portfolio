import {useTheme} from "./themeProvider.tsx";

export function ThemeToggle() {
    const {theme, toggleTheme} = useTheme()

    return (
        <a className={"typo_header"} onClick={toggleTheme}>{theme === 'light' ? 'dark' : 'light'}</a>
    )
}
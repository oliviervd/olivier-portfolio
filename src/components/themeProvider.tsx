import {createContext, h} from "preact";
import {useContext, useState, useEffect} from "preact/hooks"

const ThemeContext = createContext()

export function ThemeProvider({children}) {
    const [theme, setTheme] = useState("light")
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    useEffect(() => {

        // Dynamically set CSS variables in :root
        if (theme === "light") {
            document.documentElement.style.setProperty("--bg-color", "#ffffff");
            document.documentElement.style.setProperty("--text-color", "#000000");
        } else {
            document.documentElement.style.setProperty("--bg-color", "#000000");
            document.documentElement.style.setProperty("--text-color", "#ffffff");
        }

        // Apply the theme class to the <body> element
        document.body.classList.remove("light", "dark");
        document.body.classList.add(theme);
    }, [theme]);
    
    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            <div className={`app ${theme}`}>
                {children}
            </div>
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    return useContext(ThemeContext)
}


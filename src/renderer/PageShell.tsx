import React from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ThemeProvider} from "../components/themeProvider";

const queryClient = new QueryClient();

export const PageShell = ({children}): {children: React.ReactNode} => {
    return(
        <ThemeProvider>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </ThemeProvider>
    )
}



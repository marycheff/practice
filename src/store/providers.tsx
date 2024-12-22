"use client"

import { PaletteMode } from "@mui/material"
import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider as MUIThemeProvider } from "@mui/material/styles"
import { ReactNode, useMemo, useState } from "react"
import { Provider } from "react-redux"
import { ColorModeContext, themeSettings } from "../theme"
import { store } from "./store"

export function Providers({ children }: { children: ReactNode }) {
    const [mode, setMode] = useState<PaletteMode>("dark")

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => setMode(prev => (prev === "light" ? "dark" : "light")),
        }),
        []
    )

    const theme = useMemo(() => themeSettings(mode), [mode])

    return (
        <Provider store={store}>
            <ColorModeContext.Provider value={colorMode}>
                <MUIThemeProvider theme={theme}>
                    <CssBaseline />
                    {children}
                </MUIThemeProvider>
            </ColorModeContext.Provider>
        </Provider>
    )
}

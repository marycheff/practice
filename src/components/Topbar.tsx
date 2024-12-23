"use client"
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined"
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined"
import { Box, IconButton } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import { useContext } from "react"
import { ColorModeContext } from "../theme"

const Topbar = () => {
    const theme = useTheme()
    const colorMode = useContext(ColorModeContext)
    return (
        <Box display="flex" justifyContent="flex-end" mt={1} mr={1}>
            <IconButton onClick={colorMode?.toggleColorMode}>
                {theme.palette.mode === "dark" ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
            </IconButton>
        </Box>
    )
}

export default Topbar

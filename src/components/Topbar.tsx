"use client"
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined"
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined"
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined"
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined"
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined"
import { Box, IconButton } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import { useContext } from "react"
import { ColorModeContext, tokens } from "../theme"

const Topbar = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const colorMode = useContext(ColorModeContext)
    return (
        <Box
            display="flex"
            sx={{
                backgroundColor: colors.primary[400],
            }}>
            <IconButton onClick={colorMode?.toggleColorMode}>
                {theme.palette.mode === "dark" ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
            </IconButton>
            <IconButton>
                <NotificationsOutlinedIcon />
            </IconButton>
            <IconButton>
                <SettingsOutlinedIcon />
            </IconButton>
            <IconButton>
                <PersonOutlinedIcon />
            </IconButton>
        </Box>
    )
}

export default Topbar

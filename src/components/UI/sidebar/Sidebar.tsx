"use client"

import { ItemProps } from "@/components/UI/sidebar/Sidebar.props"
import { tokens } from "@/theme"
import HistoryIcon from "@mui/icons-material/History"
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined"
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined"
import ReplyIcon from "@mui/icons-material/Reply"
import { Box, IconButton, Typography, useTheme } from "@mui/material"
import Link from "next/link"
import { useState } from "react"
import { Menu, MenuItem, ProSidebar } from "react-pro-sidebar"
import "react-pro-sidebar/dist/css/styles.css"

const Item = ({ title, to, icon, selected, setSelected }: ItemProps) => {
    // Настройка темы
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    
    const isActive = selected === title

    return (
        <MenuItem
            onClick={() => setSelected(title)}
            icon={icon}
            style={{
                color: isActive ? colors.blueAccent[400] : colors.grey[100],
            }}>
            <Link
                href={to}
                style={{ textDecoration: "none", color: isActive ? colors.blueAccent[400] : colors.grey[100] }}>
                <Typography component="span">{title}</Typography>
            </Link>
        </MenuItem>
    )
}

const Sidebar = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [selected, setSelected] = useState("Dashboard")

    return (
        <Box
            sx={{
                "& .pro-sidebar-inner": {
                    background: `${colors.primary[400]} !important`,
                    height: "100%",
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important",
                },
                "& .pro-inner-item": {
                    padding: "5px 35px 5px 20px !important",
                },
                "& .pro-inner-item:hover": {
                    color: "#868dfb !important",
                },
                "& .pro-menu-item.active": {
                    color: "#6870fa !important",
                },
            }}>
            <ProSidebar collapsed={isCollapsed}>
                <Menu iconShape="square">
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                        style={{
                            margin: "10px 0 20px 0",
                            color: colors.grey[100],
                        }}>
                        {!isCollapsed && (
                            <Box display="flex" justifyContent="space-between" alignItems="center" ml="15px">
                                <Typography variant="h4" color={colors.grey[100]}>
                                    Админ
                                </Typography>
                                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                    <MenuOutlinedIcon />
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>

                    <Box>
                        <Item
                            title="Выйти"
                            to="/"
                            icon={<KeyboardBackspaceIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Админ"
                            to="/admin"
                            icon={<HomeOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="История чатов"
                            to="/admin/chat-history"
                            icon={<HistoryIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Ответить"
                            to="/admin/reply"
                            icon={<ReplyIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                    </Box>
                </Menu>
            </ProSidebar>
        </Box>
    )
}

export default Sidebar

"use client"
import { Box, IconButton, Typography, useTheme } from "@mui/material"
import { useState } from "react"
import { Menu, MenuItem, ProSidebar } from "react-pro-sidebar"
import "react-pro-sidebar/dist/css/styles.css"

import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined"
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined"
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined"
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined"
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined"
import MapOutlinedIcon from "@mui/icons-material/MapOutlined"
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined"
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined"
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined"
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined"
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined"
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined"
import Link from "next/link"
import { tokens } from "../theme"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Item = ({ title, to, icon, selected, setSelected }: any) => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    return (
        <MenuItem
            active={selected === title}
            style={{
                color: colors.grey[100],
            }}
            onClick={() => setSelected(title)}
            icon={icon}>
            <Link href={to} passHref>
                <Typography component="a" style={{ textDecoration: "none", color: "inherit" }}>
                    {title}
                </Typography>
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
                    {/* LOGO AND MENU ICON */}
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                        style={{
                            margin: "10px 0 20px 0",
                            color: colors.grey[100],
                        }}>
                        {!isCollapsed && (
                            <Box display="flex" justifyContent="space-between" alignItems="center" ml="15px">
                                <Typography variant="h3" color={colors.grey[100]}>
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
                            title="Дашборд"
                            to="/"
                            icon={<HomeOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        {!isCollapsed && (
                            <Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>
                                Данные
                            </Typography>
                        )}

                        <Item
                            title="Команда"
                            to="/team"
                            icon={<PeopleOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Контактные данные"
                            to="/contacts"
                            icon={<ContactsOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Invoices Balances"
                            to="/invoices"
                            icon={<ReceiptOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        {!isCollapsed && (
                            <Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>
                                Страницы
                            </Typography>
                        )}
                        <Item
                            title="Форма профиля"
                            to="/form"
                            icon={<PersonOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Календарь"
                            to="/calendar"
                            icon={<CalendarTodayOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="FAQ"
                            to="/faq"
                            icon={<HelpOutlineOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        {!isCollapsed && (
                            <Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>
                                Диаграммы
                            </Typography>
                        )}
                        <Item
                            title="Столбчатая диаграмма"
                            to="/bar"
                            icon={<BarChartOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Круговая диаграмма"
                            to="/pie"
                            icon={<PieChartOutlineOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Линейная диаграмма"
                            to="/line"
                            icon={<TimelineOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Географическая карта"
                            to="/geography"
                            icon={<MapOutlinedIcon />}
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

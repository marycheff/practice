import { tokens } from "@/theme"
import CloseIcon from "@mui/icons-material/Close"
import { Box, Button, IconButton, Modal, TextField, Typography, useTheme } from "@mui/material"
import { useRouter } from "next/navigation"
import { useState } from "react"

const LoginModal = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    const [open, setOpen] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const router = useRouter()

    const handleOpen = () => setOpen(true)
    const handleClose = () => {
        setOpen(false)
        setError("")
    }
    const handleSubmit = async () => {
        try {
            const response = await fetch("/api/auth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            })
            const data = await response.json()
            if (data.success) {
                router.push("/admin")
                handleClose()
            } else {
                setError(data.message)
            }
        } catch {
            setError("Неизвестная ошибка")
        }
    }

    return (
        <>
            <Button variant="contained" onClick={handleOpen} sx={{ mt: 2, mb: 4, bgcolor: colors.greenAccent[600] }}>
                Модальное окно
            </Button>
            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        bgcolor: colors.primary[400],
                        color: colors.grey[100],
                        borderRadius: 2,
                        p: 4,
                    }}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 2,
                        }}>
                        <Typography id="modal-title" variant="h6">
                            Вход
                        </Typography>
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Box
                        component="form"
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                        }}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            type="email"
                            fullWidth
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            sx={{
                                "& .MuiInputLabel-root.Mui-focused": {
                                    color: colors.greenAccent[600],
                                },
                            }}
                        />
                        <TextField
                            label="Пароль"
                            type="password"
                            variant="outlined"
                            fullWidth
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            sx={{
                                "& .MuiInputLabel-root.Mui-focused": {
                                    color: colors.greenAccent[600],
                                },
                            }}
                        />
                        {error && <Typography sx={{ color: colors.redAccent[500] }}>{error}</Typography>}
                        <Button
                            variant="contained"
                            sx={{ backgroundColor: colors.greenAccent[500] }}
                            onClick={handleSubmit}>
                            Войти
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    )
}

export default LoginModal

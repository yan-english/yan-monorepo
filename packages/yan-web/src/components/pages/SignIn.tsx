import {Button, Container, Paper, TextField, Typography} from "@mui/material";
import {useAuth} from "../../hooks/useAuth";
import {useState} from "react";

export default function SignIn() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const {signIn} = useAuth()
    const onSubmitForm = async () => {
        // TODO: Implement form submission logic
        await signIn(formData.email, formData.password)
    }

    return (
            <Container component="main" maxWidth="xs">
                <Paper elevation={3} className={"p-8 !bg-black/[.4] !rounded-2xl"}>
                    <Typography variant="h5" className={"text-white"}>
                        Sign In
                    </Typography>
                    <form onSubmit={onSubmitForm}>
                        <div className={"pt-8"}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value })}
                                autoComplete="email"
                                autoFocus
                                sx={{
                                    "& label.Mui-focused": {
                                        color: "white"
                                    },
                                    "& .MuiInput-underline:after": {
                                        borderBottomColor: "black"
                                    },
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": {
                                            borderColor: "rgb(255, 255, 255, 0.4)"
                                        },
                                        "&:hover fieldset": {
                                            borderColor: "white"
                                        },
                                        "&.Mui-focused fieldset": {
                                            borderColor: "white"
                                        }
                                    }
                                }}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                value={formData.password}
                                onChange={(e) => setFormData({...formData, password: e.target.value })}
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                sx={{
                                    "& label.Mui-focused": {
                                        color: "white"
                                    },
                                    "& .MuiInput-underline:after": {
                                        borderBottomColor: "black"
                                    },
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": {
                                            borderColor: "rgb(255, 255, 255, 0.4)"
                                        },
                                        "&:hover fieldset": {
                                            borderColor: "white"
                                        },
                                        "&.Mui-focused fieldset": {
                                            borderColor: "white"
                                        }
                                    }
                                }}
                            />
                        </div>
                        <div className={"pt-2 pb-8"}>
                            <Typography variant="body2" color="textSecondary" className={"!text-white"}>
                                Forgot password?
                            </Typography>
                            <Typography variant="body2" color="textSecondary" className={"!text-white"}>
                                {"Don't have an account? "}
                                <a href={"/register"} className={"text-white font-bold"}>Register</a>
                            </Typography>
                        </div>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={"!bg-white/[.4]"}
                            type="submit"
                            disabled={!formData.email ||!formData.password}
                            sx={{
                                "&:hover": {
                                    backgroundColor: "rgb(255, 255, 255, 0.6) !important"
                                }
                            }}
                        >
                            Sign In
                        </Button>
                    </form>
                </Paper>
            </Container>
        );
}
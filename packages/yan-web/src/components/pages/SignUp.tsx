import {Button, Container, Paper, TextField, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

export default function SignUp() {
    const navigate = useNavigate()
    const onSubmitForm = () => {
        // TODO: Implement form submission logic
        navigate("/")
    }
    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} className={"p-8 !bg-black/[.4] !rounded-2xl"}>
                <Typography variant="h5" className={"text-white"}>
                    Sign Up
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
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="confirm-password"
                            label="Confirm Password"
                            type="confirm-password"
                            id="confirm-password"
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
                            {"Already have an account? "}
                            <a href={"/"} className={"text-white font-bold"}>Login here</a>
                        </Typography>
                    </div>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={"!bg-white/[.4]"}
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
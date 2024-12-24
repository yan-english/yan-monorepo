import {Theme} from "@mui/material";

export const navbarStyles = {
    appBar: {
        zIndex: (theme: Theme) => theme.zIndex.drawer + 1,
    },
    menuButton: {
        marginRight: 2,
    },
    avatar: {
        width: 32,
        height: 32,
    },
};
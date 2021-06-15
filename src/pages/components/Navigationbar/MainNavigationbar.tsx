import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import SecondNavigationbar from "./SecondNavigationbar";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        zIndex: {
            zIndex: 1,
        },
        grow: {
            flexGrow: 1,
        },
        noneShadow: {
            boxShadow: "none !important",
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            display: "none",
            [theme.breakpoints.up("sm")]: {
                display: "block",
            },
        },
        sectionDesktop: {
            display: "none",
            [theme.breakpoints.up("md")]: {
                display: "flex",
            },
        },
        sectionMobile: {
            display: "flex",
            [theme.breakpoints.up("md")]: {
                display: "none",
            },
        },
    })
);

interface Props {
    children: React.ReactChild;
}

const MainNavigationbar = ({ children }: Props) => {
    const classes = useStyles();

    return (
        <>
            <div
                className={`${classes.zIndex} ${classes.grow} ${classes.noneShadow}`}
            >
                <AppBar position="static" color="primary">
                    <Toolbar>
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="open drawer"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            className={classes.title}
                            variant="h6"
                            noWrap
                        >
                            Material-UI
                        </Typography>
                        <div className={classes.grow} />
                    </Toolbar>
                </AppBar>
            </div>
            <SecondNavigationbar />
            {children}
        </>
    );
};

export default MainNavigationbar;

import React, { useContext, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import { Box, Button } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import MenuIcon from "@material-ui/icons/Menu";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import PersonIcon from "@material-ui/icons/Person";
import NoteIcon from "@material-ui/icons/Note";
import PaymentIcon from "@material-ui/icons/Payment";
import HistoryIcon from "@material-ui/icons/History";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {
    makeStyles,
    useTheme,
    Theme,
    createStyles,
    ThemeProvider,
} from "@material-ui/core/styles";
import ActiveLink from "../../../helpers/ActiveLink";
import { themeListLink } from "../../../../styles/style";
import { useRouter } from "next/router";
import { AuthContext } from "../../../context/authContextProvider";
import { useMutation } from "@apollo/client";
import { Message } from "react-hook-form";
import { SIGN_OUT } from "../../../lib/mutations";
import Loading from "../Loading";
import { pages } from "../../../helpers/pages";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
        },
        drawer: {
            [theme.breakpoints.up("md")]: {
                width: drawerWidth,
                flexShrink: 0,
            },
        },
        appBar: {
            [theme.breakpoints.up("md")]: {
                width: `calc(100% - ${drawerWidth}px)`,
                marginLeft: drawerWidth,
            },
        },
        menuButton: {
            marginRight: theme.spacing(2),
            [theme.breakpoints.up("md")]: {
                display: "none",
            },
        },
        // necessary for content to be below app bar
        toolbar: theme.mixins.toolbar,
        drawerPaper: {
            width: drawerWidth,
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
    })
);

interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
    children: React.ReactChild;
}

const Navigationbar = (props: Props) => {
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const router = useRouter();
    const { setAuthUser, isLogin } = useContext(AuthContext);

    const [signout, { loading }] =
        useMutation<{ signout: Message }, Message>(SIGN_OUT);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const onclickHandler = async () => {
        const response = await signout();
        if (response.data.signout) {
            setAuthUser(null);
            window.localStorage.setItem("signout", Date.now().toString());
            router.push("/signin");
        }
    };

    const drawer = (
        <div>
            {loading ? <Loading loading={loading} /> : null}
            <div className={classes.toolbar} />
            <ThemeProvider theme={themeListLink}>
                <Divider />
                {pages.map((page, index) =>
                    page.role.map((res) => isLogin.role === res) ? (
                        <ActiveLink
                            key={index}
                            href={page.path}
                            as={page.as}
                            underline="none"
                        >
                            <List>
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    paddingX={2}
                                >
                                    

                                    <div>&nbsp;{page.name}</div>
                                </Box>
                            </List>
                        </ActiveLink>
                    ) : null
                )}

                <Divider />
                <Button disableTouchRipple onClick={onclickHandler}>
                    <List>
                        <Box display="flex" alignItems="center" paddingX={2}>
                            <ExitToAppIcon titleAccess="ออกจากระบบ" />
                            <div>&nbsp;ออกจากระบบ</div>
                        </Box>
                    </List>
                </Button>
                <Divider />
            </ThemeProvider>
        </div>
    );

    const container =
        props.window !== undefined
            ? () => props.window().document.body
            : undefined;

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Responsive drawer
                    </Typography>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden mdUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === "rtl" ? "right" : "left"}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden smDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {props.children}
            </main>
        </div>
    );
};

export default Navigationbar;

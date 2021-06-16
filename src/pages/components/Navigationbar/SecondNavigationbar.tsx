import {
    AppBar,
    Box,
    createStyles,
    makeStyles,
    Theme,
    Toolbar,
    Button,
} from "@material-ui/core";
import React from "react";
import ActiveLink from "../../../helpers/ActiveLink";
import HomeIcon from "@material-ui/icons/Home";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonIcon from "@material-ui/icons/Person";
import PaymentIcon from "@material-ui/icons/Payment";
import HistoryIcon from "@material-ui/icons/History";
import { useMutation } from "@apollo/client";
import { SIGN_OUT } from "../../../lib/mutations";
import { useRouter } from "next/router";
import { useContext } from "react";
import { AuthContext } from "../../../context/authContextProvider";
import Loading from "../Loading";
import { pages } from "../../../helpers/pages";

const useStyled = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            justifyContent: "space-between",
            minHeight: 40,
            width: "100%",
        },
        shadow: {
            boxShadow: "0 2px 5px 0 #dadada !important",
        },
        sectionDesktop: {
            display: "none",
            [theme.breakpoints.up("sm")]: {
                display: "flex",
            },
        },
        sectionMobile: {
            fontSize: "1.5rem",
            [theme.breakpoints.down("sm")]: {
                fontSize: "1.7rem",
            },
        },
        layoutDesktopAndMobile: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            [theme.breakpoints.between("sm", "md")]: {
                flexDirection: "column",
            },
        },
        btnLink: {
            "&:hover": {
                backgroundColor: "transparent",
            },
            "&:active": {
                backgroundColor: "transparent",
            },
        },
    })
);

interface Message {
    message: string;
}

const SecondNavigationbar = () => {
    const classes = useStyled();
    const router = useRouter();
    const { setAuthUser, isLogin } = useContext(AuthContext);

    const [signout, { loading }] =
        useMutation<{ signout: Message }, Message>(SIGN_OUT);

    const onclickHandler = async () => {
        const response = await signout();
        if (response.data.signout) {
            setAuthUser(null);
            window.localStorage.setItem("signout", Date.now().toString());
            router.push("/signin");
        }
    };

    const link = pages.map((page, index) => {
        
    });

    return (
        <>
            {loading ? <Loading loading={loading} /> : null}
            <AppBar
                position="static"
                color="secondary"
                className={classes.shadow}
            >
                <Box display="flex" justifyContent="center">
                    <Toolbar className={classes.root}>
                        {link}
                        <Button
                            className={classes.btnLink}
                            disableTouchRipple
                            onClick={onclickHandler}
                        >
                            <div className={classes.layoutDesktopAndMobile}>
                                <ExitToAppIcon
                                    className={classes.sectionMobile}
                                    titleAccess="ออกจากระบบ"
                                />
                                <div className={classes.sectionDesktop}>
                                    &nbsp;ออกจากระบบ
                                </div>
                            </div>
                        </Button>
                    </Toolbar>
                </Box>
            </AppBar>
        </>
    );
};

export default SecondNavigationbar;

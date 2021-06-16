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
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import PersonIcon from "@material-ui/icons/Person";
import NoteIcon from "@material-ui/icons/Note";
import PaymentIcon from "@material-ui/icons/Payment";
import HistoryIcon from "@material-ui/icons/History";
import { useMutation } from "@apollo/client";
import { SIGN_OUT } from "../../../lib/mutations";
import { useRouter } from "next/router";
import { useEffect } from "react";
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

    const link = pages.map((page, index) =>
        page.role.find((res) => isLogin.role === res) ? (
            <ActiveLink
                key={index}
                href={page.path}
                as={page.as}
                underline="none"
            >
                <div className={classes.layoutDesktopAndMobile}>
                    {page.name === "หน้าหลัก" ? (
                        <HomeIcon
                            className={classes.sectionMobile}
                            titleAccess={page.name}
                        />
                    ) : page.name === "ประวัติการซื้อ" ? (
                        <HistoryIcon
                            className={classes.sectionMobile}
                            titleAccess={page.name}
                        />
                    ) : page.name === "บัญชีการเงิน" ? (
                        <PaymentIcon
                            className={classes.sectionMobile}
                            titleAccess={page.name}
                        />
                    ) : page.name === "ข้อมูลผู้ใช้" ? (
                        <PersonIcon
                            className={classes.sectionMobile}
                            titleAccess={page.name}
                        />
                    ) : null}

                    <div className={classes.sectionDesktop}>
                        &nbsp;{page.name}
                    </div>
                </div>
            </ActiveLink>
        ) : null
    );

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

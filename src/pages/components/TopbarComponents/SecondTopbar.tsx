import {
    AppBar,
    Box,
    createStyles,
    makeStyles,
    Theme,
    Toolbar,
    Button,
    ThemeProvider,
} from "@material-ui/core";
import React from "react";
import ActiveLink from "../../../helpers/ActiveLink";
import HomeIcon from "@material-ui/icons/Home";
import HistoryIcon from "@material-ui/icons/History";
import PaymentIcon from "@material-ui/icons/Payment";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useMutation, useQuery } from "@apollo/client";
import { SIGN_OUT } from "../../../lib/mutations";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { User } from "../../../models/User";
import { ME } from "../../../lib/query";

interface Props {}

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

const SecondTopbar = (props: Props) => {
    const classes = useStyled();
    const router = useRouter();

    useQuery<{ me: User }, User>(ME, {
        onError: ({ message }) => {
            if (message) router.push("/signin");
        },
    });

    const [signout] = useMutation<{ signout: Message }, Message>(SIGN_OUT, {
        onCompleted: ({ signout }) => {
            if (signout.message) router.push("/signin");
        },
    });

    const onclickHandler = async () => {
        await signout();
    };

    return (
        <AppBar position="static" color="secondary" className={classes.shadow}>
            <Box display="flex" justifyContent="center">
                <Toolbar className={classes.root}>
                    <ActiveLink href="/" as="/" underline="none">
                        <div className={classes.layoutDesktopAndMobile}>
                            <HomeIcon
                                className={classes.sectionMobile}
                                titleAccess="หน้าหลัก"
                            />
                            <div className={classes.sectionDesktop}>
                                &nbsp;หน้าหลัก
                            </div>
                        </div>
                    </ActiveLink>
                    <ActiveLink
                        href="/buyhistory"
                        as="/buyhistory"
                        underline="none"
                    >
                        <div className={classes.layoutDesktopAndMobile}>
                            <HistoryIcon
                                className={classes.sectionMobile}
                                titleAccess="ประวัติการซื้อ"
                            />
                            <div className={classes.sectionDesktop}>
                                &nbsp;ประวัติการซื้อ
                            </div>
                        </div>
                    </ActiveLink>
                    <ActiveLink
                        href="/balances"
                        as="/balances"
                        underline="none"
                    >
                        <div className={classes.layoutDesktopAndMobile}>
                            <PaymentIcon
                                className={classes.sectionMobile}
                                titleAccess="บัญชีการเงิน"
                            />
                            <div className={classes.sectionDesktop}>
                                &nbsp;บัญชีการเงิน
                            </div>
                        </div>
                    </ActiveLink>
                    <ActiveLink href="/account" as="/account" underline="none">
                        <div className={classes.layoutDesktopAndMobile}>
                            <PersonIcon
                                className={classes.sectionMobile}
                                titleAccess="ข้อมูลผู้ใช้"
                            />
                            <div className={classes.sectionDesktop}>
                                &nbsp;ข้อมูลผู้ใช้
                            </div>
                        </div>
                    </ActiveLink>

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
    );
};

export default SecondTopbar;

import {
    AppBar,
    Box,
    createStyles,
    makeStyles,
    Theme,
    Toolbar,
} from "@material-ui/core";
import React from "react";
import ActiveLink from "../../../helpers/ActiveLink";
import HomeIcon from "@material-ui/icons/Home";
import HistoryIcon from "@material-ui/icons/History";
import PaymentIcon from "@material-ui/icons/Payment";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

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
    })
);

const SecondTopbar = (props: Props) => {
    const classes = useStyled();
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
                    <ActiveLink href="/signin" as="/signin" underline="none">
                        <div className={classes.layoutDesktopAndMobile}>
                            <ExitToAppIcon
                                className={classes.sectionMobile}
                                titleAccess="ออกจากระบบ"
                            />
                            <div className={classes.sectionDesktop}>
                                &nbsp;ออกจากระบบ
                            </div>
                        </div>
                    </ActiveLink>
                </Toolbar>
            </Box>
        </AppBar>
    );
};

export default SecondTopbar;
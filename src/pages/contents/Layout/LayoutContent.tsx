import { Box, createStyles, makeStyles, Theme } from "@material-ui/core";
import React, { ReactChild } from "react";
import { useContext } from "react";
import { AuthContext } from "../../../context/authContextProvider";
import { isAuthorization } from "../../../helpers/Authrization";
import Navigationbar from "../../components/Navigationbar/Navigationbar";
import MainNavigationbar from "../../components/Navigationbar/MainNavigationbar";

const useStyled = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
        },
    })
);

interface Props {
    children: ReactChild;
}

const LayoutContent = ({ children }: Props) => {
    const classes = useStyled();
    const { isLogin } = useContext(AuthContext);

    const authentication = isAuthorization(isLogin, [
        "SUPER_ADMIN",
        "ADMIN",
    ]) ? (
        <Navigationbar>
            <Box className={classes.root} textAlign="center" padding={3}>
                {children}
            </Box>
        </Navigationbar>
    ) : isAuthorization(isLogin, ["AGENT", "EMPLOYEE"]) ? (
        <MainNavigationbar>
            <Box className={classes.root} textAlign="center" padding={3}>
                {children}
            </Box>
        </MainNavigationbar>
    ) : null;
    return <>{authentication}</>;
};

export default LayoutContent;

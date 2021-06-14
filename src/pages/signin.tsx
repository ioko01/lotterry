import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { AuthContext } from "../context/authContextProvider";
import { ME } from "../lib/query";
import { User } from "../models/User";
import { loginState, logoutState } from "../redux/actions/signinAction";
import { SigninMap } from "../redux/models/signin";
import SigninComponent from "./components/SigninComponents/SigninComponent";

interface Props extends PropsFromRedux {}

const signin = ({ isLoggedin, loginState, logoutState }: Props) => {
    const { isLogin, errors, status } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        if (status === "SUCCESS") router.push("/");
    }, [status]);

    return status === "LOADING" ? <>LOADING</> : <SigninComponent />;
};

const mapStateProps = ({ isLoggedin }: SigninMap) => ({
    isLoggedin: isLoggedin.isLoggedin,
});

const mapDispatchProps = {
    loginState,
    logoutState,
};

const connector = connect(mapStateProps, mapDispatchProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(signin);

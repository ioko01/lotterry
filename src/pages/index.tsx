import { useQuery } from "@apollo/client";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { AuthContext } from "../context/authContextProvider";
import { client } from "../lib/client";
import { ME } from "../lib/query";
import { User } from "../models/User";
import { loginState, logoutState } from "../redux/actions/signinAction";
import { SigninMap } from "../redux/models/signin";
import SecondTopbar from "./components/TopbarComponents/SecondTopbar";
import Topbar from "./components/TopbarComponents/Topbar";
import Home from "./contents/Home";
import LayoutContent from "./contents/Layout/LayoutContent";

interface Props extends PropsFromRedux {}

const index = ({ user }) => {
    const { status, errors } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        if (errors) {
            if (status !== "NETWORK_ERROR" && status !== "SUCCESS")
                router.push("/signin");
        }
    }, [status]);

    return (
        <>
            {status === "LOADING" ? (
                <>LOADING</>
            ) : status === "SUCCESS" ? (
                <>
                    <Topbar />
                    <SecondTopbar />
                    <LayoutContent>
                        <Home />
                    </LayoutContent>
                </>
            ) : null}
        </>
    );
};
const mapStateProps = ({ isLoggedin }: SigninMap) => ({
    isLoggedin: isLoggedin.isLoggedin,
});

const mapDispatchProps = {
    logoutState,
};

const connector = connect(mapStateProps, mapDispatchProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(index);

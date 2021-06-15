import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { AuthContext } from "../context/authContextProvider";
import { logoutState } from "../redux/actions/signinAction";
import { SigninMap } from "../redux/models/signin";
import SecondTopbar from "./components/TopbarComponents/SecondTopbar";
import Topbar from "./components/TopbarComponents/Topbar";
import Home from "./contents/Home";
import LayoutContent from "./contents/Layout/LayoutContent";
import Loading from "./components/Loading";

const index = () => {
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
            <Loading />
            <Topbar />
            <SecondTopbar />
            <LayoutContent>
                <Home />
            </LayoutContent>
        </>
    );
};

export default index;

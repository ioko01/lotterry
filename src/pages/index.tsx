import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/authContextProvider";
import SecondTopbar from "./components/TopbarComponents/SecondTopbar";
import Topbar from "./components/TopbarComponents/Topbar";
import Home from "./contents/Home";
import LayoutContent from "./contents/Layout/LayoutContent";
import Loading from "./components/Loading";
import { isAuthorization } from "../helpers/Authrization";
import LeftbarComponents from "./components/LeftbarComponents/LeftbarComponents";

const index = () => {
    const { status, errors, isLogin } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        if (errors) {
            if (status !== "NETWORK_ERROR" && status !== "SUCCESS")
                router.push("/signin");
        }
    }, [status]);

    const authorize = isAuthorization(isLogin, [
        "ADMIN",
        "AGENT",
        "EMPLOYEE",
    ]) ? (
        <SecondTopbar />
    ) : isAuthorization(isLogin, ["SUPER_ADMIN"]) ? (
        <LeftbarComponents />
    ) : null;

    return (
        <>
            <Loading />
            <Topbar />
            {authorize}
            <LayoutContent>
                <Home />
            </LayoutContent>
        </>
    );
};

export default index;

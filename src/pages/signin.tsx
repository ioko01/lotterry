import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/authContextProvider";
import SigninComponent from "./components/SigninComponents/SigninComponent";
import Loading from "./components/Loading";

const signin = () => {
    const { status } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        if (status === "SUCCESS") router.push("/");
    }, [status]);

    return (
        <>
            <Loading />
            <SigninComponent />
        </>
    );
};

export default signin;

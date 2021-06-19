import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/authContextProvider";
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

    const render =
        status === "NETWORK_ERROR" ? (
            "Error Connection Failed"
        ) : (
            <>
                <Loading />
                <LayoutContent>
                    <Home />
                </LayoutContent>
            </>
        );

    return render;
};

export default index;

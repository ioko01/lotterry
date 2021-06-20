import React, { useContext, useEffect } from "react";
import LayoutContent from "./contents/Layout/LayoutContent";
import AddUserPage from "./contents/AddUserPage";
import { AuthContext } from "../context/authContextProvider";
import { useRouter } from "next/router";
import Loading from "./components/Loading";

const adduser = () => {
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
            <LayoutContent>
                <AddUserPage />
            </LayoutContent>
        </>
    );
};

export default adduser;

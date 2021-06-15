import { useQuery } from "@apollo/client";
import React, { createContext, useState, useEffect } from "react";
import Router from "next/router";
import { User } from "../models/User";
import { ME } from "../lib/query";

interface ErrorMessage {
    name?: string;
    message?: string;
}

type LOGIN_STATE = "LOADING" | "NULL" | "ERROR" | "SUCCESS" | "NETWORK_ERROR";

interface AuthContextValues {
    status: LOGIN_STATE | ErrorMessage;
    isLogin: User | null;
    setAuthUser: (data: User | null) => void;
    errors: boolean;
}

const initialState: AuthContextValues = {
    status: "LOADING",
    isLogin: null,
    setAuthUser: () => {},
    errors: false,
};

export const AuthContext = createContext<AuthContextValues>(initialState);

interface Props {
    children: React.ReactChild;
}

const authContextProvider = ({ children }: Props) => {
    const [isLogin, setIsLogin] = useState<User | null>(null);
    const [status, setStatus] = useState<LOGIN_STATE | ErrorMessage>("LOADING");
    const [isError, setError] = useState<boolean>(false);

    useQuery<{ me: User }>(ME, {
        onCompleted: (res) => {
            setError(false);
            setStatus("SUCCESS");
            setAuthUser(res.me);
        },
        onError: (error) => {
            setError(true);
            if (error.networkError) setStatus("NETWORK_ERROR");
            else setStatus(error.message as ErrorMessage);
        },
    });

    useEffect(() => {
        const syncSignout = (e: StorageEvent) => {
            if (e.key === "signout") {
                // Log user out
                setIsLogin(null);
                setStatus("LOADING");

                // Push user to home page
                Router.replace("/signin");
            }
        };

        window.addEventListener("storage", syncSignout);

        return () => window.removeEventListener("storage", syncSignout);
    }, []);

    const setAuthUser = (data: User | null) => {
        setIsLogin(data);
        if (data) setStatus("SUCCESS");
        else setStatus("NULL");
    };
    const errors = isError;
    return (
        <AuthContext.Provider
            value={{
                status,
                isLogin,
                setAuthUser,
                errors,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default authContextProvider;

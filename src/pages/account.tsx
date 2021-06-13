import React from "react";
import SecondTopbar from "./components/TopbarComponents/SecondTopbar";
import Topbar from "./components/TopbarComponents/Topbar";
import LayoutContent from "./contents/Layout/LayoutContent";

interface Props {}

const account = (props: Props) => {
    return (
        <>
            <Topbar />
            <SecondTopbar />
            <LayoutContent>account</LayoutContent>
        </>
    );
};

export default account;

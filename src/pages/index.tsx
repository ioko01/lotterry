import React from "react";
import SecondTopbar from "./components/TopbarComponents/SecondTopbar";
import Topbar from "./components/TopbarComponents/Topbar";
import Home from "./contents/Home";
import LayoutContent from "./contents/Layout/LayoutContent";

interface Props {}

const index = (props: Props) => {
    return (
        <>
            <Topbar />
            <SecondTopbar />
            <LayoutContent>
                <Home />
            </LayoutContent>
        </>
    );
};

export default index;

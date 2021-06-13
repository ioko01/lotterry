import React from "react";
import SecondTopbar from "./components/TopbarComponents/SecondTopbar";
import Topbar from "./components/TopbarComponents/Topbar";
import LayoutContent from "./contents/Layout/LayoutContent";
import RewardPage from "./contents/RewardContents/RewardPage";

interface Props {}

const reward = (props: Props) => {
    return (
        <>
            <Topbar />
            <SecondTopbar />
            <LayoutContent>
                <RewardPage />
            </LayoutContent>
        </>
    );
};

export default reward;

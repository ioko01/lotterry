import React from "react";
import SecondTopbar from "./components/TopbarComponents/SecondTopbar";
import Topbar from "./components/TopbarComponents/Topbar";
import BuyHistoryPage from "./contents/BuyHistoryContents/BuyHistoryPage";
import LayoutContent from "./contents/Layout/LayoutContent";

interface Props {}

const buyhistory = (props: Props) => {
    return (
        <>
            <Topbar />
            <SecondTopbar />
            <LayoutContent>
                <BuyHistoryPage />
            </LayoutContent>
        </>
    );
};

export default buyhistory;

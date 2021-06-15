import React from "react";
import BuyHistoryPage from "./contents/BuyHistoryContents/BuyHistoryPage";
import LayoutContent from "./contents/Layout/LayoutContent";

interface Props {}

const buyhistory = (props: Props) => {
    return (
        <>
            <LayoutContent>
                <BuyHistoryPage />
            </LayoutContent>
        </>
    );
};

export default buyhistory;

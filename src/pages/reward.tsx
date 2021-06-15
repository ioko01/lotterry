import React from "react";
import LayoutContent from "./contents/Layout/LayoutContent";
import RewardPage from "./contents/RewardContents/RewardPage";

interface Props {}

const reward = (props: Props) => {
    return (
        <>
            <LayoutContent>
                <RewardPage />
            </LayoutContent>
        </>
    );
};

export default reward;

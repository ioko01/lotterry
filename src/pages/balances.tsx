import React from "react";
import Topbar from "./components/TopbarComponents/Topbar";
import LayoutContent from "./contents/Layout/LayoutContent";
import SecondTopbar from "./components/TopbarComponents/SecondTopbar";
import BalancesPage from "./contents/BalanceContents/BalancesPage";

interface Props {}

const balances = (props: Props) => {
    return (
        <>
            <Topbar />
            <SecondTopbar />
            <LayoutContent>
                <BalancesPage />
            </LayoutContent>
        </>
    );
};

export default balances;

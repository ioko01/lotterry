import React from "react";
import LayoutContent from "./contents/Layout/LayoutContent";
import BalancesPage from "./contents/BalancesPage";

interface Props {}

const balances = (props: Props) => {
    return (
        <>
            <LayoutContent>
                <BalancesPage />
            </LayoutContent>
        </>
    );
};

export default balances;

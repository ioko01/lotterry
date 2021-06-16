import React from "react";
import LayoutContent from "./contents/Layout/LayoutContent";
import AddUserPage from "./contents/AddUserContents/AddUserPage";

interface Props {}

const adduser = (props: Props) => {
    return (
        <>
            <LayoutContent>
                <AddUserPage />
            </LayoutContent>
        </>
    );
};

export default adduser;

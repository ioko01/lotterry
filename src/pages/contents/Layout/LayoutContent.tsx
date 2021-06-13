import { Box, createStyles, makeStyles, Theme } from "@material-ui/core";
import { GetStaticProps } from "next";
import React, { ChildContextProvider, ReactChild } from "react";

const useStyled = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
        },
    })
);

interface Props {
    children: ReactChild;
}

const LayoutContent = ({ children }: Props) => {
    const classes = useStyled();
    return (
        <Box className={classes.root} textAlign="center" padding={3}>
            {children}
        </Box>
    );
};

export default LayoutContent;

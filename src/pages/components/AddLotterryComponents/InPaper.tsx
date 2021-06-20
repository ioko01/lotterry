import { Paper, Theme, createStyles } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import CropperLotterry from "./CropperLotterry";

const useStyled = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            "& > *": {
                margin: theme.spacing(1),
            },
        },
        paper: {
            height: "auto",
        },
    })
);

const InPaper = () => {
    const classes = useStyled();
    return (
        <Paper className={classes.paper}>
            <CropperLotterry />
        </Paper>
    );
};

export default InPaper;

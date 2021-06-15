import { createStyles, Grid, Theme } from "@material-ui/core";
import { Modal, Paper, Zoom, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/authContextProvider";

const useStyled = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            display: "flex",
            padding: theme.spacing(2),
            justifyContent: "center",
            alignItems: "center",
        },
        gridRoot: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
        },
    })
);

interface Props {
    loading?: boolean;
}

const Loading = ({ loading = false }: Props) => {
    const { status } = useContext(AuthContext);
    const classes = useStyled();

    return (
        <Modal open={status === "LOADING" || loading}>
            <Zoom in={status === "LOADING" || loading}>
                <Grid container className={classes.gridRoot}>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>
                            <CircularProgress color="primary" />
                            &emsp;LOADING
                        </Paper>
                    </Grid>
                </Grid>
            </Zoom>
        </Modal>
    );
};

export default Loading;

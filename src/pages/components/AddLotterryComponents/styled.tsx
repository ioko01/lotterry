import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStyled = makeStyles((theme: Theme) =>
    createStyles({
        app: {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
        },
        cropContainer: {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: "80px",
        },
        controls: {
            position: "absolute",
            bottom: 0,
            left: "50%",
            width: "50%",
            transform: "translateX(-50%)",
            height: "80px",
            display: "flex",
            alignItems: "center",
        },
        slider: {
            padding: "22px 0px",
        },
        cropGridItem: {
            width: "auto",
            minHeight: "250px",
            height: "auto",
            position: "relative",
        },
        card: {
            display: "flex",
            flexDirection: "column",
        },
        detail: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            minWidth: "100%",
        },
        input: {
            display: "none",
        },
        canvas: {
            position: "absolute",
            top: 2,
            right: 2,
            filter: "saturate(300%)",
            msFilter: "saturate(300%)",
            WebkitFilter: "saturate(300%)",
        },
        gridContainer: {
            padding: theme.spacing(2),
            justifyContent: "space-evenly",
        },
        gridUploadimage: {
            borderStyle: "dashed",
            borderWidth: "3px",
            borderColor: theme.palette.primary.main,
            borderRadius: ".3rem",
            minHeight: "250px",
        },
        btnUploadimage: {
            height: "100%",
        },
        iconUploadimage: {
            fontSize: "50px",
        },
        iconLockedimage: {
            fontSize: "50px",
        },
        locked: {
            position: "absolute",
            backgroundColor: "#689f38de",
            width: "100%",
            height: "100%",
            top: 0,
            zIndex: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "50px",
            color: "#fff",
        },
    })
);

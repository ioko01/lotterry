import {
    Backdrop,
    Box,
    Button,
    createStyles,
    Fade,
    Grid,
    makeStyles,
    Modal,
    Paper,
    Slide,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Theme,
    ThemeProvider,
    Typography,
} from "@material-ui/core";
import { common } from "@material-ui/core/colors";
import React, { useState } from "react";
import {
    themeButtonClose,
    themeButtonText,
    themeDanger,
} from "../../../styles/style";
import LottoRadioButton from "../components/BuyHistoryComponents/LottoRadioButton";
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";
import Link from "../../helpers/Link";

interface Props {}

const useStyled = makeStyles((theme: Theme) =>
    createStyles({
        searchBox: {
            marginBlock: theme.spacing(3),
            padding: theme.spacing(2),
        },
        modal: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        table: {
            minWidth: 650,
        },
        tableHead: {
            backgroundColor: "#e1e1e1",
        },
        marginBlock: {
            marginBlock: theme.spacing(2),
        },
        paper: {
            display: "flex",
            flexDirection: "row",
            minWidth: "90%",
            height: "90%",
            overflow: "hidden",
            justifyContent: "space-evenly",
            border: "none",
        },
        btn: {
            display: "inline-block",
            width: "100%",
        },
        btnDelItem: {
            "&:hover": {
                color: theme.palette.error.main,
            },
        },
    })
);

const BalancesPage = (props: Props) => {
    const classes = useStyled();

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Typography component="h1" variant="h1">
                บัญชีการเงิน
            </Typography>
            <Paper className={classes.marginBlock}>
                <TableContainer>
                    <Table className={classes.table}>
                        <TableHead className={classes.tableHead}>
                            <TableRow>
                                <TableCell>งวดที่</TableCell>
                                <TableCell>ยอดแทง</TableCell>
                                <TableCell>ถูกรางวัล</TableCell>
                                <TableCell>#</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>16-04-2021</TableCell>
                                <TableCell>100,000</TableCell>
                                <TableCell>6000,000</TableCell>
                                <TableCell align="center">
                                    <Link href="/reward" as="/reward">
                                        รายละเอียด
                                    </Link>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </>
    );
};

export default BalancesPage;

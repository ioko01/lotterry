import {
    Backdrop,
    Box,
    Button,
    createStyles,
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
import React, { useState } from "react";
import {
    themeButtonClose,
    themeButtonText,
    themeDanger,
} from "../../../../styles/style";
import RewardRadioButton from "../../components/RewardComponents/RewardRadioButton";
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";

interface Props {}

const useStyled = makeStyles((theme: Theme) =>
    createStyles({
        balanceBtn: {
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
            marginInline: theme.spacing(1),
        },
    })
);

const Reward = (props: Props) => {
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
                รายละเอียด
            </Typography>
            <Paper className={classes.marginBlock}>
                <Box className={classes.balanceBtn} textAlign="left">
                    <Button
                        className={classes.btn}
                        variant="outlined"
                        color="primary"
                    >
                        งบดุล
                    </Button>
                    <Button
                        className={classes.btn}
                        variant="outlined"
                        color="primary"
                    >
                        รายงานสรุป
                    </Button>
                </Box>
                <TableContainer>
                    <Table className={classes.table}>
                        <TableHead className={classes.tableHead}>
                            <TableRow>
                                <TableCell>ลำดับ</TableCell>
                                <TableCell width="15%">งวดที่</TableCell>
                                <TableCell width="15%">เวลาแทง</TableCell>
                                <TableCell width="5%" align="center">
                                    รายการแทง
                                </TableCell>
                                <TableCell width="10%" align="center">
                                    ยอดรวม [บาท]
                                </TableCell>
                                <TableCell width="15%">หมายเหตุ</TableCell>
                                <TableCell width="10%" align="center">
                                    สถานะ
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>1</TableCell>
                                <TableCell>16-04-2021</TableCell>
                                <TableCell>16/04/2021, 00:10:45</TableCell>
                                <TableCell align="center">4</TableCell>
                                <TableCell align="center">400</TableCell>
                                <TableCell>พี่นากามะ</TableCell>
                                <TableCell align="center">รอผล</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={`${classes.modal}`}
                open={open}
                BackdropComponent={Backdrop}
                onClose={handleClose}
                closeAfterTransition
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Slide in={open} direction="up">
                    <Paper className={classes.paper}>
                        <Grid container justify="center" alignItems="center">
                            <Grid item xs={12} md={8}>
                                <Box
                                    display="block"
                                    textAlign="right"
                                    marginBottom={2}
                                >
                                    <ThemeProvider theme={themeButtonClose}>
                                        <Button
                                            color="primary"
                                            variant="outlined"
                                        >
                                            <CloseIcon />
                                        </Button>
                                    </ThemeProvider>
                                </Box>
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    paddingBottom={5}
                                >
                                    <Typography variant="h2" component="h2">
                                        รายการสั่งซื้อ
                                    </Typography>
                                    <Typography variant="h2" component="h2">
                                        ราคาใบละ 100 บาท
                                    </Typography>
                                </Box>

                                <Box>
                                    <TableContainer>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>
                                                        ลำดับที่
                                                    </TableCell>
                                                    <TableCell>
                                                        หมายเลข
                                                    </TableCell>
                                                    <TableCell>
                                                        งวดที่
                                                    </TableCell>
                                                    <TableCell>จำนวน</TableCell>
                                                    <TableCell>ราคา</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell>1</TableCell>
                                                    <TableCell>
                                                        1234545
                                                    </TableCell>
                                                    <TableCell>1</TableCell>
                                                    <TableCell>12</TableCell>
                                                    <TableCell>100</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>
                </Slide>
            </Modal>
        </>
    );
};

export default Reward;

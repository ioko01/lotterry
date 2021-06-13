import {
    Box,
    Button,
    Collapse,
    createStyles,
    Grid,
    makeStyles,
    Slide,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Theme,
    ThemeProvider,
    Typography,
} from "@material-ui/core";
import { common } from "@material-ui/core/colors";
import { connect, ConnectedProps } from "react-redux";
import { themeButtonClose, themeDanger } from "../../../../styles/style";
import { clearCart, deletetCart } from "../../../redux/actions/cartActions";
import { closeModal } from "../../../redux/actions/openModalActions";
import { CartMap } from "../../../redux/models/cart";
import DeleteIcon from "@material-ui/icons/Delete";
import { nextSlide } from "../../../redux/actions/slideAction";
import { SlideMap } from "../../../redux/models/slide";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import CloseIcon from "@material-ui/icons/Close";

const useStyled = makeStyles((theme: Theme) =>
    createStyles({
        btnDelItem: {
            "&:hover": {
                color: theme.palette.error.main,
            },
        },
        note: {
            backgroundColor: common["white"],
            padding: 10,
            fontSize: 12,
        },
        slide: {
            position: "absolute",
            top: 0,
            minWidth: "100%",
            width: "100%",
            height: "100%",
            padding: 30,
            overflow: "auto",
        },
    })
);

interface Props extends PropsFromRedux {}

const slideCheck = ({
    carts,
    slides,
    closeModal,
    clearCart,
    deletetCart,
    nextSlide,
}: Props) => {
    const classes = useStyled();
    return (
        <Slide in={slides.slides["1"]} direction={slides.direction["1"]}>
            <form
                onSubmit={(e) => e.preventDefault()}
                className={classes.slide}
            >
                <Grid container justify="center" alignItems="center">
                    <Grid item xs={12} md={8}>
                        <Box display="block" textAlign="right" marginBottom={2}>
                            <ThemeProvider theme={themeButtonClose}>
                                <Button
                                    color="primary"
                                    variant="outlined"
                                    onClick={closeModal}
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
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>#</TableCell>
                                        <TableCell>หมายเลข</TableCell>
                                        <TableCell>งวด</TableCell>
                                        <TableCell>จำนวน</TableCell>
                                        <TableCell>ราคา</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {carts.map((lot, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>
                                                {lot.number.sixDigit}
                                            </TableCell>
                                            <TableCell>{lot.time}</TableCell>
                                            <TableCell>{lot.amount}</TableCell>
                                            <TableCell>{lot.price}</TableCell>
                                            <TableCell>
                                                <ThemeProvider
                                                    theme={themeDanger}
                                                >
                                                    <Button
                                                        id={(
                                                            index + 1
                                                        ).toString()}
                                                        className={
                                                            classes.btnDelItem
                                                        }
                                                        onClick={(e) =>
                                                            deletetCart(index)
                                                        }
                                                    >
                                                        <DeleteIcon />
                                                    </Button>
                                                </ThemeProvider>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <Box textAlign="right">รวม 400 บาท</Box>

                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            marginTop={2}
                        >
                            <Typography
                                style={{ paddingInline: 15 }}
                                variant="h2"
                                component="h2"
                            >
                                หมายเหตุ&nbsp;
                            </Typography>
                            <TextField
                                variant="outlined"
                                color="primary"
                                inputProps={{
                                    className: classes.note,
                                }}
                                style={{
                                    flexGrow: 1,
                                    paddingInline: 15,
                                }}
                            />
                        </Box>

                        <Box
                            display="flex"
                            alignItems="flex-end"
                            justifyContent="space-evenly"
                            marginTop={10}
                            marginBottom={3}
                        >
                            <ThemeProvider theme={themeDanger}>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    onClick={clearCart}
                                >
                                    <DeleteIcon />
                                    ล้างตะกร้า
                                </Button>
                            </ThemeProvider>
                            <Button
                                color="primary"
                                variant="contained"
                                type="submit"
                                onClick={nextSlide}
                            >
                                ดำเนินการต่อ
                                <NavigateNextIcon />
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </Slide>
    );
};

const mapStateProps = ({ carts, slides }: CartMap & SlideMap) => ({
    carts: carts.carts,
    slides: slides,
});

const mapDispatchProps = {
    closeModal,
    deletetCart,
    clearCart,
    nextSlide,
};

const connector = connect(mapStateProps, mapDispatchProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(slideCheck);

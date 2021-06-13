import {
    Box,
    Button,
    Card,
    CardMedia,
    createStyles,
    Grid,
    makeStyles,
    Slide,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Theme,
    ThemeProvider,
    Typography,
} from "@material-ui/core";
import { connect, ConnectedProps } from "react-redux";
import { themeButtonClose, themeSecond } from "../../../../styles/style";
import { clearCart, deletetCart } from "../../../redux/actions/cartActions";
import { closeModal, openModal } from "../../../redux/actions/openModalActions";
import { CartMap } from "../../../redux/models/cart";
import { ModalMap } from "../../../redux/models/modal";
import {
    nextSlide,
    openSlide,
    prevSlide,
} from "../../../redux/actions/slideAction";
import { SlideMap } from "../../../redux/models/slide";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import CloseIcon from "@material-ui/icons/Close";

const useStyled = makeStyles((theme: Theme) =>
    createStyles({
        slide: {
            position: "absolute",
            top: 0,
            minWidth: "100%",
            width: "100%",
            padding: 30,
            overflow: "auto",
            height: "100%",
        },
        card: {
            width: "100%",
            borderRadius: 0,
        },
        media: {
            height: "auto",
        },
    })
);

interface Props extends PropsFromRedux {}

const slideCheck = ({ slides, prevSlide, closeModal }: Props) => {
    const classes = useStyled();
    return (
        <Slide in={slides.slides["2"]} direction={slides.direction["2"]}>
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

                        <Table>
                            <TableHead></TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        <Card className={classes.card}>
                                            <CardMedia
                                                className={classes.media}
                                                id="1"
                                                image="/img.jpg"
                                                title="img"
                                                component="img"
                                            />
                                        </Card>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        <Box
                            display="flex"
                            alignItems="flex-end"
                            justifyContent="space-evenly"
                            marginTop={10}
                            marginBottom={3}
                        >
                            <ThemeProvider theme={themeSecond}>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    onClick={prevSlide}
                                >
                                    <NavigateBeforeIcon />
                                    ย้อนกลับ
                                </Button>
                            </ThemeProvider>
                            <Button
                                color="primary"
                                variant="contained"
                                type="submit"
                                onClick={nextSlide}
                            >
                                ยืนยันบิล
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </Slide>
    );
};

const mapStateProps = ({
    modal,
    carts,
    slides,
}: ModalMap & CartMap & SlideMap) => ({
    carts: carts.carts,
    modal: modal.modal,
    slides: slides,
});

const mapDispatchProps = {
    openModal,
    closeModal,
    deletetCart,
    clearCart,
    prevSlide,
    openSlide,
};

const connector = connect(mapStateProps, mapDispatchProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(slideCheck);

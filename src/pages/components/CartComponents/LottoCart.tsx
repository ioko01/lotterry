import {
    Box,
    createStyles,
    makeStyles,
    Modal,
    Paper,
    Slide,
    Theme,
} from "@material-ui/core";
import { common } from "@material-ui/core/colors";
import { connect, ConnectedProps } from "react-redux";
import { openModal, closeModal } from "../../../redux/actions/openModalActions";
import { ModalMap } from "../../../redux/models/modal";
import LottoButtonCart from "./LottoButtonCart";
import SlideComponent from "../SlideComponents/SlideComponent";
import { useEffect } from "react";
import { CartMap } from "../../../redux/models/cart";

const useStyled = makeStyles((theme: Theme) =>
    createStyles({
        modal: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        slide: {
            position: "relative",
            minWidth: "100%",
            width: "auto",
            overflow: "hidden",
            display: "inline-flex",
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
    })
);

interface Props extends PropsFromRedux {}

const LottoCart = ({ modal, carts, closeModal }: Props) => {
    const classes = useStyled();

    useEffect(() => {
        if (carts.length === 0) closeModal();
    }, [carts]);

    return (
        <>
            <LottoButtonCart />
            <div>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={`${classes.modal}`}
                    open={modal}
                    onClose={closeModal}
                    closeAfterTransition
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Slide in={modal} direction="up">
                        <Paper className={`${classes.paper}`}>
                            <Box className={`${classes.slide}`}>
                                <SlideComponent />
                            </Box>
                        </Paper>
                    </Slide>
                </Modal>
            </div>
        </>
    );
};

const mapStateProps = ({ modal, carts }: ModalMap & CartMap) => ({
    modal: modal.modal,
    carts: carts.carts,
});

const mapDispatchProps = {
    openModal,
    closeModal,
};

const connector = connect(mapStateProps, mapDispatchProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(LottoCart);

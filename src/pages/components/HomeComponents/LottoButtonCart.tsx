import {
    Button,
    createStyles,
    makeStyles,
    Theme,
    Typography,
    Zoom,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { openModal } from "../../../redux/actions/openModalActions";
import { openSlide } from "../../../redux/actions/slideAction";
import { CartMap } from "../../../redux/models/cart";
import { ModalMap } from "../../../redux/models/modal";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";

const useStyled = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            position: "fixed",
            borderRadius: "50%",
            width: "60px",
            height: "60px",
            bottom: "20px",
            right: "20px",
            padding: 0,
        },
        cartNotify: {
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "60px",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50%",
        },
    })
);

interface Props extends PropsFromRedux {}

const LottoButtonCart = ({ carts, openModal, openSlide }: Props) => {
    const classes = useStyled();
    const [grow, setGrow] = useState<boolean>(false);
    useEffect(() => {
        if (carts.length > 0) setGrow(true);
        else setGrow(false);
    }, [carts]);

    return (
        <Zoom in={grow}>
            <Button
                onClick={(e) => {
                    openModal();
                    openSlide();
                }}
                className={`${classes.root}`}
                color="primary"
                variant="contained"
            >
                <Typography className={classes.cartNotify} component="h6">
                    {carts.length}
                    <ShoppingBasketIcon />
                </Typography>
            </Button>
        </Zoom>
    );
};

const mapStateProps = ({ modal, carts }: ModalMap & CartMap) => ({
    carts: carts.carts,
    modal: modal.modal,
});

const mapDispatchProps = {
    openModal,
    openSlide,
};

const connector = connect(mapStateProps, mapDispatchProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(LottoButtonCart);

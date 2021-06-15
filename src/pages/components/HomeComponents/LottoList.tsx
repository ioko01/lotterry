import {
    Button,
    Card,
    CardMedia,
    createStyles,
    Grid,
    makeStyles,
    Paper,
    Theme,
} from "@material-ui/core";
import React from "react";
import { LottoryDigit } from "../../../types/lottoryDigit";
import LottoCart from "./LottoCart";
import { addCart } from "../../../redux/actions/cartActions";
import { connect, ConnectedProps } from "react-redux";
import { CartMap } from "../../../redux/models/cart";
import { lottory } from "../../../models/FakeModelLotterry";

const useStyled = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            marginBlock: 15,
        },
        btnAddCart: {
            display: "block",
            width: "100%",
            borderRadius: "0",
            borderBottomLeftRadius: ".5rem",
            borderBottomRightRadius: ".5rem",
        },
        media: {
            height: "auto",
        },
        card: {
            width: "100%",
            borderRadius: 0,
        },
        gridSpace: {
            padding: 15,
        },
    })
);

interface Props extends PropsFromRedux {
    digit: LottoryDigit;
    number?: string;
}

const LottoList = ({ digit, number, addCart }: Props) => {
    const classes = useStyled();

    const changeHandle = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        lottory.filter((lot) => {
            if (lot.id === parseInt(e.currentTarget.id)) {
                addCart(lot);
            }
        });
    };

    let i = 0;
    const CardObject = lottory.map((lot) => {
        if (String(lot.number[digit]) === number || !number) {
            i++;
            return (
                <Grid
                    key={lot.id}
                    item
                    xs={6}
                    sm={4}
                    md={4}
                    xl={2}
                    className={`${classes.gridSpace}`}
                >
                    <Card className={classes.card}>
                        <CardMedia
                            className={classes.media}
                            id={lot.id.toString()}
                            image={`${lot.path}${lot.imageName}.${lot.extension}`}
                            title={lot.title}
                            component="img"
                        />
                    </Card>
                    <Button
                        className={classes.btnAddCart}
                        color="primary"
                        variant="contained"
                        id={lot.id.toString()}
                        onClick={changeHandle}
                    >
                        เพิ่มลงตะกร้า
                    </Button>
                </Grid>
            );
        }
    });

    const cartEmpty = (
        <Grid item xs={12} className={`${classes.gridSpace}`}>
            สินค้านี้ขายหมดแล้ว
        </Grid>
    );

    return (
        <>
            <Paper className={classes.root}>
                <Grid container id="rootGrid">
                    {i > 0 ? CardObject : cartEmpty}
                </Grid>
            </Paper>
            <LottoCart />
        </>
    );
};

const mapStateProps = ({ carts }: CartMap) => ({
    carts: carts.carts,
});

const mapDispatchProps = {
    addCart,
};

const connector = connect(mapStateProps, mapDispatchProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(LottoList);

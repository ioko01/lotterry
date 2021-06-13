import {
    Box,
    Button,
    createStyles,
    FormControl,
    makeStyles,
    TextField,
    Theme,
    Typography,
} from "@material-ui/core";
import { GetServerSideProps } from "next";
import React, { ChangeEvent, useEffect, useState } from "react";
import { LottoryDigit } from "../../types/lottoryDigit";
import LottoList from "../components/CartComponents/LottoList";
import LayoutContent from "./Layout/LayoutContent";

interface Props {}

const useStyled = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
        },
        textCenter: {
            textAlign: "center",
        },
        textField: {
            margin: 6,
        },
        btnNumber: {
            display: "flex",
            justifyContent: "center",
        },
        btn1: {
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
        },
        btn2: {
            borderRadius: 0,
        },
        btn3: {
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
        },
        btnSearch: {
            marginInline: "auto",
            margin: 15,
            width: 150,
        },
    })
);

let num: string[] = new Array(6).fill("");
const Home = (props: Props) => {
    const classes = useStyled();
    const [value, setValue] = useState<string[]>(num);
    const [toggle, setToggle] = useState<string>(null);
    const [textDisabled, setTextDisabled] = useState<number[]>([]);
    const [digit, setDigit] = useState<LottoryDigit>("sixDigit");
    const [number, setNumber] = useState<string>();

    useEffect(() => {
        document.getElementById("0").focus();
    }, []);

    const handleToggle = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        try {
            if (event.currentTarget.id === "first") {
                setTextDisabled([4, 5, 6]);
            } else if (event.currentTarget.id === "second") {
                setTextDisabled([1, 2, 3]);
            } else if (event.currentTarget.id === "third") {
                setTextDisabled([1, 2, 3, 4]);
            }

            if ((toggle && toggle !== event.currentTarget.id) || !toggle) {
                setToggle(event.currentTarget.id);
            } else {
                setTextDisabled([]);
                setToggle(null);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        index: number
    ) => {
        try {
            const pattern = /^[0-9]$/;

            if (
                event.target.value.match(pattern) ||
                event.target.value.match(/^[\b]*$/)
            ) {
                num[index] = event.target.value;
                setValue([...num]);
                if (index >= 0 && index < num.length) {
                    if (!event.target.value.match(/^[\b]*$/)) {
                        if (index != num.length - 1) {
                            document.getElementById(`${index + 1}`).focus();
                        }
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const onClickHandler = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        try {
            const id =
                document.querySelector<HTMLButtonElement>("button.selected").id;
            const values = document.querySelectorAll<HTMLInputElement>(
                "input:not(.Mui-disabled)"
            );

            let val: string = "";
            values.forEach((item, index) => {
                setNumber((val += values[index].value));
            });

            if (id === "first") {
                setDigit("frontThreeDigit");
            } else if (id === "second") {
                setDigit("behindThreeDigit");
            } else if (id === "third") {
                setDigit("behindTwoDigit");
            }
        } catch (error) {
            const values = document.querySelectorAll<HTMLInputElement>(
                "input:not(.Mui-disabled)"
            );
            let val: string = "";
            values.forEach((_, index) => {
                setNumber((val += values[index].value));
            });
            setDigit("sixDigit");
        }
    };

    return (
        <>
            <form id="lottorySearchBox" onSubmit={(e) => e.preventDefault()}>
                <Typography variant="h1" component="h1">
                    กรอกเลขล็อตเตอรี่ที่ต้องการค้นหา
                </Typography>
                <Box
                    id="lottorySearchField"
                    display="flex"
                    justifyContent="center"
                >
                    {num.map((_, index) => (
                        <TextField
                            autoComplete="off"
                            disabled={
                                textDisabled.find((item) => item === index + 1)
                                    ? true
                                    : false
                            }
                            InputProps={{
                                inputMode: "numeric",
                                inputProps: {
                                    tabIndex: index + 1,
                                    className: classes.textCenter,
                                },
                                className: classes.textField,
                            }}
                            key={index}
                            id={index.toString()}
                            placeholder={(index + 1).toString()}
                            margin="normal"
                            value={value[index]}
                            onChange={(event) => handleChange(event, index)}
                            variant="outlined"
                            type="number"
                        />
                    ))}
                </Box>
                <Box className={classes.btnNumber}>
                    <Button
                        type="button"
                        id="first"
                        variant={toggle === "first" ? "contained" : "outlined"}
                        color="primary"
                        className={
                            toggle === "first"
                                ? `${classes.btn1} selected`
                                : `${classes.btn1}`
                        }
                        onClick={handleToggle}
                    >
                        เลขหน้า 3 ตัว
                    </Button>
                    <Button
                        type="button"
                        id="second"
                        variant={toggle === "second" ? "contained" : "outlined"}
                        color="primary"
                        className={
                            toggle === "second"
                                ? `${classes.btn2} selected`
                                : `${classes.btn2}`
                        }
                        onClick={handleToggle}
                    >
                        เลขท้าย 3 ตัว
                    </Button>
                    <Button
                        type="button"
                        id="third"
                        variant={toggle === "third" ? "contained" : "outlined"}
                        color="primary"
                        className={
                            toggle === "third"
                                ? `${classes.btn3} selected`
                                : `${classes.btn3}`
                        }
                        onClick={handleToggle}
                    >
                        เลขท้าย 2 ตัว
                    </Button>
                </Box>
                <Button
                    type="submit"
                    className={classes.btnSearch}
                    color="primary"
                    variant="contained"
                    onClick={onClickHandler}
                >
                    ค้นหา
                </Button>
            </form>

            <LottoList digit={digit} number={number} />
        </>
    );
};

export default Home;

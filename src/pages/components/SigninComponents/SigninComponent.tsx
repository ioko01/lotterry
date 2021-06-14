import { useMutation } from "@apollo/client";
import {
    Box,
    Button,
    createStyles,
    FormControl,
    Grid,
    makeStyles,
    Paper,
    TextField,
    Theme,
    Typography,
} from "@material-ui/core";
import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { connect, ConnectedProps } from "react-redux";
import { AuthContext } from "../../../context/authContextProvider";
import { SIGN_IN } from "../../../lib/mutations";
import { User } from "../../../models/User";
import { loginState } from "../../../redux/actions/signinAction";
import { SigninMap } from "../../../redux/models/signin";

const useStyled = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100%",
            height: "100vh",
        },
        marginXauto: {
            marginInline: "auto",
        },
        textCenter: {
            textAlign: "center",
        },
        formStyle: {
            padding: theme.spacing(2),
        },
        signinHeader: {
            padding: theme.spacing(2),
        },
        textFieldStyle: {
            paddingBottom: theme.spacing(2),
        },
    })
);

interface Props extends PropsFromRedux {}

interface Signin {
    username: string;
    password: string;
}

const SigninComponent = ({ isLoggedin, loginState }: Props) => {
    const classes = useStyled();
    const [message, setMessage] = useState<string | null>(null);
    const router = useRouter();
    const { setAuthUser, status } = useContext(AuthContext);

    const { control, handleSubmit, setError } = useForm<Signin>({
        mode: "onSubmit",
        reValidateMode: "onSubmit",
    });

    const [signin, { loading }] = useMutation<{ signin: User }, Signin>(
        SIGN_IN,
        {
            onError: (res) => {
                if (res.message) setMessage(res.message);
            },
        }
    );

    const onSubmit = async ({ username, password }: Signin) => {
        try {
            if (!username)
                setError("username", {
                    type: "validate",
                    message: "username is invalid",
                });
            if (!password)
                setError("password", {
                    type: "validate",
                    message: "password is invalid",
                });

            const response = await signin({
                variables: {
                    username,
                    password,
                },
            });
            if (response.data.signin) {
                setAuthUser(response.data.signin);
                router.push("/");
            }
        } catch (error) {}
    };

    return (
        <Box className={classes.root}>
            <Grid container>
                <Grid item xs={8} md={6} className={classes.marginXauto}>
                    <Paper className={classes.textCenter}>
                        <form onSubmit={handleSubmit(onSubmit)} noValidate>
                            <FormControl
                                className={classes.formStyle}
                                variant="outlined"
                                fullWidth
                            >
                                <Typography
                                    color="textPrimary"
                                    component="h1"
                                    variant="h1"
                                    className={classes.signinHeader}
                                >
                                    SIGNIN
                                </Typography>

                                <Controller
                                    name="username"
                                    control={control}
                                    defaultValue="superadmin"
                                    render={({
                                        field: { onChange, value },
                                        fieldState: { error },
                                    }) => (
                                        <TextField
                                            className={classes.textFieldStyle}
                                            variant="outlined"
                                            label="USERNAME"
                                            error={!!error}
                                            helperText={
                                                error ? error.message : null
                                            }
                                            onChange={onChange}
                                            value={value}
                                        />
                                    )}
                                />

                                <Controller
                                    name="password"
                                    control={control}
                                    defaultValue="superadmin"
                                    render={({
                                        field: { onChange, value },
                                        fieldState: { error },
                                    }) => (
                                        <TextField
                                            className={classes.textFieldStyle}
                                            variant="outlined"
                                            label="PASSWORD"
                                            error={!!error}
                                            helperText={
                                                error ? error.message : null
                                            }
                                            type="password"
                                            onChange={onChange}
                                            value={value}
                                        />
                                    )}
                                />

                                <Typography color="error">
                                    {loading ? "LOADING" : message}
                                </Typography>
                                <Button
                                    color="primary"
                                    type="submit"
                                    variant="contained"
                                    disabled={loading}
                                >
                                    {loading ? "LOADING" : "SIGNIN"}
                                </Button>
                            </FormControl>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

const mapStateProps = ({ isLoggedin }: SigninMap) => ({
    isLoggedin: isLoggedin.isLoggedin,
});

const mapDispatchProps = {
    loginState,
};

const connector = connect(mapStateProps, mapDispatchProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(SigninComponent);

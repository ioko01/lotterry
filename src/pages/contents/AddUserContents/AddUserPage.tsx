import React, { useState } from "react";
import {
    Typography,
    Paper,
    createStyles,
    Theme,
    makeStyles,
    FormControl,
    Button,
    TextField,
    Select,
    MenuItem,
    InputLabel,
} from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import { Grid } from "@material-ui/core";
import { useMutation } from "@apollo/client";
import { User, UserRoles } from "../../../models/User";
import { CREATE_USER } from "../../../lib/mutations";

const useStyled = makeStyles((theme: Theme) =>
    createStyles({
        marginXauto: {
            marginInline: "auto",
        },
        textCenter: {
            textAlign: "center",
        },
        paper: {
            padding: theme.spacing(2),
        },
        selectOptionForm: {
            marginBlock: theme.spacing(2),
        },
        signinHeader: {
            padding: theme.spacing(2),
        },
        textFieldStyle: {
            width: "100%",
            paddingBottom: theme.spacing(2),
        },
        gridContainer: {
            justifyContent: "space-evenly",
        },
        gridItem: {
            paddingInline: theme.spacing(2),
        },
        gridSelectOption: {
            minWidth: 300,
        },
        selectOptionStyle: {
            width: "100%",
        },
    })
);

interface Props {
    selectedDisabled?: boolean;
}

interface CreateUser
    extends Pick<
        User,
        "username" | "password" | "firstname" | "lastname" | "tagname" | "role"
    > {}

const AddUserPage = ({ selectedDisabled }: Props) => {
    const classes = useStyled();
    const [userRole, setUserRole] = useState<UserRoles>("ADMIN");
    const [message, setMessage] = useState<string | null>(null);
    const { handleSubmit, control, setError } = useForm<CreateUser>({
        mode: "onSubmit",
        reValidateMode: "onSubmit",
    });

    const [createUser, { loading }] = useMutation<{
        createUser: CreateUser;
    }>(CREATE_USER, {
        onError: (res) => {
            setMessage(res.message);
        },
    });

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setUserRole(event.target.value as UserRoles);
    };

    const onSubmit = async ({
        username,
        password,
        firstname,
        lastname,
        tagname,
        role,
    }: CreateUser) => {
        try {
            if (!username)
                setError("username", {
                    type: "validate",
                    message: "username is not empty",
                });
            if (!password)
                setError("password", {
                    type: "validate",
                    message: "password is not empty",
                });

            if (!firstname)
                setError("firstname", {
                    type: "validate",
                    message: "firstname is not empty",
                });

            if (!lastname)
                setError("lastname", {
                    type: "validate",
                    message: "lastname is not empty",
                });

            const response = await createUser({
                variables: {
                    username,
                    password,
                    firstname,
                    lastname,
                    tagname,
                    role,
                },
            });
            if (response.data.createUser) setMessage("Username Created!");
        } catch (error) {}
    };

    return (
        <>
            <Grid container justify="center">
                <Grid item xs={12} md={10}>
                    <Paper className={classes.paper}>
                        <form onSubmit={handleSubmit(onSubmit)} noValidate>
                            <Typography
                                color="textPrimary"
                                component="h1"
                                variant="h1"
                            >
                                เพิ่มลูกทีม
                            </Typography>

                            <Grid container className={classes.gridContainer}>
                                <Grid
                                    item
                                    xs={12}
                                    className={`${classes.gridItem} ${classes.gridSelectOption}`}
                                >
                                    <FormControl
                                        fullWidth
                                        className={classes.selectOptionForm}
                                    >
                                        <InputLabel
                                            variant="outlined"
                                            id="label-role-id"
                                        >
                                            ROLE
                                        </InputLabel>
                                        <Controller
                                            name="role"
                                            control={control}
                                            defaultValue={userRole}
                                            render={({
                                                field: { onChange, value },
                                                fieldState: { error },
                                            }) => (
                                                <Select
                                                    labelId="label-role-id"
                                                    value={value}
                                                    label="ROLE"
                                                    onChange={onChange}
                                                    displayEmpty
                                                    SelectDisplayProps={{
                                                        style: {
                                                            padding: 10,
                                                        },
                                                    }}
                                                    className={
                                                        classes.selectOptionStyle
                                                    }
                                                    variant="outlined"
                                                    disabled={selectedDisabled}
                                                >
                                                    <MenuItem value="ADMIN">
                                                        ADMIN
                                                    </MenuItem>
                                                    <MenuItem value="AGENT">
                                                        AGENT
                                                    </MenuItem>
                                                    <MenuItem value="EMPLOYEE">
                                                        EMPLOYEE
                                                    </MenuItem>
                                                </Select>
                                            )}
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    className={classes.gridItem}
                                >
                                    <FormControl fullWidth>
                                        <Controller
                                            name="username"
                                            control={control}
                                            defaultValue=""
                                            render={({
                                                field: { onChange, value },
                                                fieldState: { error },
                                            }) => (
                                                <TextField
                                                    className={
                                                        classes.textFieldStyle
                                                    }
                                                    variant="outlined"
                                                    label="*USERNAME"
                                                    error={!!error}
                                                    helperText={
                                                        error
                                                            ? error.message
                                                            : null
                                                    }
                                                    onChange={onChange}
                                                    value={value}
                                                />
                                            )}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    className={classes.gridItem}
                                >
                                    <FormControl fullWidth>
                                        <Controller
                                            name="password"
                                            control={control}
                                            defaultValue=""
                                            render={({
                                                field: { onChange, value },
                                                fieldState: { error },
                                            }) => (
                                                <TextField
                                                    className={
                                                        classes.textFieldStyle
                                                    }
                                                    variant="outlined"
                                                    label="*PASSWORD"
                                                    error={!!error}
                                                    helperText={
                                                        error
                                                            ? error.message
                                                            : null
                                                    }
                                                    type="password"
                                                    onChange={onChange}
                                                    value={value}
                                                />
                                            )}
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid
                                    item
                                    xs={12}
                                    sm={4}
                                    className={classes.gridItem}
                                >
                                    <FormControl fullWidth>
                                        <Controller
                                            name="firstname"
                                            control={control}
                                            defaultValue=""
                                            render={({
                                                field: { onChange, value },
                                                fieldState: { error },
                                            }) => (
                                                <TextField
                                                    className={
                                                        classes.textFieldStyle
                                                    }
                                                    variant="outlined"
                                                    label="*FIRSTNAME"
                                                    error={!!error}
                                                    helperText={
                                                        error
                                                            ? error.message
                                                            : null
                                                    }
                                                    onChange={onChange}
                                                    value={value}
                                                />
                                            )}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    sm={4}
                                    className={classes.gridItem}
                                >
                                    <FormControl fullWidth>
                                        <Controller
                                            name="lastname"
                                            control={control}
                                            defaultValue=""
                                            render={({
                                                field: { onChange, value },
                                                fieldState: { error },
                                            }) => (
                                                <TextField
                                                    className={
                                                        classes.textFieldStyle
                                                    }
                                                    variant="outlined"
                                                    label="*LASTNAME"
                                                    error={!!error}
                                                    helperText={
                                                        error
                                                            ? error.message
                                                            : null
                                                    }
                                                    onChange={onChange}
                                                    value={value}
                                                />
                                            )}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    sm={4}
                                    className={classes.gridItem}
                                >
                                    <FormControl fullWidth>
                                        <Controller
                                            name="tagname"
                                            control={control}
                                            defaultValue=""
                                            render={({
                                                field: { onChange, value },
                                                fieldState: { error },
                                            }) => (
                                                <TextField
                                                    className={
                                                        classes.textFieldStyle
                                                    }
                                                    variant="outlined"
                                                    label="TAGNAME"
                                                    error={!!error}
                                                    helperText={
                                                        error
                                                            ? error.message
                                                            : null
                                                    }
                                                    onChange={onChange}
                                                    value={value}
                                                />
                                            )}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>

                            <Button
                                color="primary"
                                type="submit"
                                variant="contained"
                            >
                                ADD
                            </Button>
                            <Typography component="p">
                                {loading ? "LOADING" : message}
                            </Typography>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
};

export default AddUserPage;

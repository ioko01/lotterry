import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            minWidth: 180,
            marginRight: theme.spacing(2),
        },
    })
);

interface Props {
    selectedDisabled?: boolean;
}

const LottoSelectOption = ({ selectedDisabled }: Props) => {
    const classes = useStyles();
    const [age, setAge] = React.useState("01-03-2021");

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setAge(event.target.value as string);
    };

    return (
        <FormControl className={classes.formControl}>
            <Select
                value={age}
                onChange={handleChange}
                displayEmpty
                SelectDisplayProps={{
                    style: { padding: 10 },
                }}
                variant="outlined"
                autoWidth
                disabled={selectedDisabled}
            >
                <MenuItem value="01-03-2021">1 มีนาคม 2021</MenuItem>
                <MenuItem value="16-03-2021">16 มีนาคม 2021</MenuItem>
                <MenuItem value="01-04-2021">1 มิถุนายน 2021</MenuItem>
                <MenuItem value="16-04-2021">16 มิถุนายน 2021</MenuItem>
            </Select>
        </FormControl>
    );
};

export default LottoSelectOption;

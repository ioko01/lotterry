import React, { useState } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { Typography } from "@material-ui/core";
import LottoSelectOption from "./LottoSelectOption";

interface Props {}

const LottoRadioButton = () => {
    const [checked, setChecked] = useState<string>("งวดที่");
    const [selectedDisabled, setSelectedDisabled] = useState<boolean>(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.value);

        if (event.target.value !== "งวดที่") setSelectedDisabled(true);
        else setSelectedDisabled(false);
    };

    return (
        <FormControl component="fieldset">
            <RadioGroup
                row
                aria-label="lottoRadioButton"
                name="lottoRadioButton"
            >
                <FormControlLabel
                    checked={checked === "งวดที่"}
                    value="งวดที่"
                    control={<Radio color="primary" size="small" />}
                    label="งวดที่"
                    onChange={handleChange}
                />
                <LottoSelectOption selectedDisabled={selectedDisabled} />
                <FormControlLabel
                    checked={checked === "ทุกงวด"}
                    value="ทุกงวด"
                    control={<Radio color="primary" size="small" />}
                    label="ทุกงวด"
                    onChange={handleChange}
                />
            </RadioGroup>
        </FormControl>
    );
};

export default LottoRadioButton;

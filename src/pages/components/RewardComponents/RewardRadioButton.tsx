import React, { useState } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { Typography } from "@material-ui/core";
import RewardSelectOption from "./RewardSelectOption";

interface Props {}

const LottoRadioButton = () => {
    const [checked, setChecked] = useState<string>("วันนี้");
    const [selectedDisabled, setSelectedDisabled] = useState<boolean>(false);
    const arrRadio = [
        "วันนี้",
        "เมื่อวาน",
        "สัปดาห์นี้",
        "สัปดาห์ที่แล้ว",
        "เดือนนี้",
    ];

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.value);

        if (event.target.value !== "วันนี้") setSelectedDisabled(true);
        else setSelectedDisabled(false);
    };

    return (
        <FormControl component="fieldset">
            <RadioGroup
                row
                aria-label="rewardRadioButton"
                name="rewardRadioButton"
            >
                {arrRadio.map((item, index) => (
                    <FormControlLabel
                        key={index}
                        checked={checked === item}
                        value={item}
                        control={<Radio color="primary" size="small" />}
                        label={item}
                        onChange={handleChange}
                    />
                ))}
            </RadioGroup>
        </FormControl>
    );
};

export default LottoRadioButton;

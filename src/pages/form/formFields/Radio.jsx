import React, { useMemo, useState } from 'react'
import { FormControl, FormControlLabel, FormHelperText, FormLabel, IconButton, Radio, RadioGroup, Stack, TextField, Typography, capitalize } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear';

const getLabel = (str = "") => str?.split(" ")?.join("_")
export default function CustomRadio({ isNew = false, field, formik, setAnswer }) {
    const [options, setOptions] = useState(field?.value ?? [])
    const [currentOpt, setCurrentOpt] = useState("");

    const onUpdateOptions = () => {
        if (currentOpt) {
            const temp = [...options];
            temp.push(currentOpt)
            setAnswer(temp)
            setOptions(temp)
            setCurrentOpt("");
        }
    }

    const onDelete = (ind) => setOptions(options?.filter((options, index) => index != ind))

    const onChangeOption = (event) => setCurrentOpt(event.target.value)

    const memoizeOption = useMemo(() => options, [options, setOptions])

    const label = getLabel(field?.question)
    return (
        <Stack alignItems="flex-start" gap={1}>
            {!isNew && <Typography variant='subtitle2'>{field?.question}</Typography>}
            <FormControl required={field?.isRequired} sx={{ display: "flex", justifyContent: "flex-start" }}>
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={field?.value || ""}
                    {...formik?.getFieldProps(label)}
                    error={Boolean(formik?.errors[label])}
                >
                    {
                        memoizeOption?.map((opt, index) =>
                        (<Stack flexDirection="row" alignItems="center">

                            <FormControlLabel value={opt} control={<Radio />} label={capitalize(opt)} />
                            {isNew && <IconButton onClick={() => onDelete(index)}>
                                <ClearIcon />
                            </IconButton>}
                        </Stack>
                        )
                        )}
                    {
                        Boolean(formik?.errors[label]) &&
                        <FormHelperText sx={{ color: "red" }}>
                            {formik?.errors[label]}
                        </FormHelperText>
                    }
                    {isNew && <TextField
                        value={currentOpt}
                        placeholder={`(${options.length + 1}) Option`}
                        onChange={onChangeOption}
                        onKeyDown={(event) => event.key === "Enter" && onUpdateOptions(options.length)}
                        onBlur={() => onUpdateOptions(options.length)}
                    />}
                </RadioGroup>
            </FormControl>
        </Stack>
    )
}

import React, { useMemo, useState } from 'react'
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, IconButton, Stack, TextField, Typography } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear';

const getLabel = (str = "") => str?.split(" ")?.join("_")
export default function CustomCheckBox({ isNew = false, field, formik, answer = [], setAnswer }) {
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

    const onCheckAnswer = (data) => {
        let temp = [...answer];
        if (!temp.includes(data)) {
            temp.push(currentOpt)
        } else {
            temp = temp.filter((item) => item != data)
        }
        setCurrentOpt("");
    }

    const onChangeOption = (event) => setCurrentOpt(event.target.value)

    const memoizeOption = useMemo(() => options, [options, setOptions])

    const label = getLabel(field?.question)
    
    return (
        <Stack alignItems="flex-start" gap={1}>
            {!isNew && <Typography variant='subtitle2'>{field?.question}</Typography>}
            <FormControl
                required={field?.isRequired}
                sx={{ display: "flex", justifyContent: "flex-start" }}
                component="fieldset"
                variant="standard"
            >
                <FormGroup
                    value={field?.value || ""}
                    {...(formik ? formik?.getFieldProps(label) : {})}
                    error={Boolean(formik?.touched[label] && formik?.errors[label])}
                >
                    {
                        memoizeOption?.length > 0 && memoizeOption?.map((opt, index) =>
                            <Stack flexDirection="row" alignItems="center" key={index}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            value={opt}
                                            name={field?.question}
                                        />
                                    }
                                    label={opt}
                                />
                                {isNew && <IconButton onClick={() => onDelete(index)}>
                                    <ClearIcon />
                                </IconButton>}
                            </Stack>)
                    }
                </FormGroup>
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
            </FormControl>
        </Stack>
    )
}

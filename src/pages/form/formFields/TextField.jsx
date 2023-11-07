import React from 'react'
import { Stack, TextField, Typography } from '@mui/material'

const getLabel = (str = "") => str?.split(" ")?.join("_")
export default function CustomTextField({ isNew = false, field, answer = null, setAnswer, formik = {} }) {

    const label = getLabel(field?.question)
    return (
        <Stack alignItems="flex-start" gap={1}>
            {!isNew && <Typography variant='subtitle2'>{field?.question}</Typography>}
            <TextField
                fullWidth
                placeholder="Enter your answer"
                {...(formik ? formik?.getFieldProps(label) : {})}
                required={field?.isRequired}
                error={Boolean(formik?.touched[label] && formik?.errors[label])}
                helperText={formik?.touched[label] && formik?.errors[label]}
            />
        </Stack>
    )
}

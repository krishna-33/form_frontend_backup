import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
  capitalize,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAddResponseMutation, useLazyGetFormsQuery } from "../../api/slice";
import { CHECK_BOX, RADIO_BUTTON, TEXTFIELD } from "./formFields/constants";
import FormFields from "./formFields";
import Loader from "../../common/loader";
import useAlerts from "../../hooks/useAlerts";

const getLabel = (str = "") => str?.split(" ")?.join("_");

const dynamicValidationSchema = (questions) => {
  let validation = {};
  questions.forEach((q) => {
    switch (q.answerType) {
      case TEXTFIELD:
        validation[getLabel(q.question)] = q.isRequired
          ? Yup.string().required("This field is required")
          : Yup.mixed();
        break;
      case RADIO_BUTTON:
        validation[getLabel(q.question)] = q.isRequired
          ? Yup.mixed().required("This field is required")
          : Yup.mixed();
        break;
      case CHECK_BOX:
        validation[getLabel(q.question)] = q.isRequired
          ? Yup.mixed().required("Atleast select one")
          : Yup.mixed();
        break;
    }
  });
  return validation;
};

export default function Display() {
  const navigate = useNavigate();
  const { success, error } = useAlerts();
  const [getFormById, { data, isLoading }] = useLazyGetFormsQuery();
  const [addResponse, { isLoading: isSubmiting }] =
    useAddResponseMutation();
  const [formData, setFormData] = useState({});
  const [initialValues, setInitialvalues] = useState({});
  const { id = "" } = useParams();

  const formik = useFormik({
    initialValues: { ...initialValues, name: "" },
    validationSchema: formData?.questions?.length
      ? Yup.object().shape({
        ...dynamicValidationSchema(formData.questions),
        name: Yup.string().required("This field is required"),
      })
      : "",
    onSubmit: async (values) => handleSubmit(values),
  });

  useEffect(() => {
    const initial = formData?.questions?.reduce((acc, curr) => {
      const label = getLabel(curr?.question || "");
      if (!acc[label]) {
        acc[label] = "";
      }
      return acc;
    }, {});
    setInitialvalues(initial);
  }, [formData]);

  useEffect(() => {
    id && getFormById({ endpoint: `form/${id}` });
  }, [id]);

  useEffect(() => {
    data?.data && setFormData(data?.data);
  }, [data]);


  const { getFieldProps, touched, errors } = formik;

  const handleSubmit = async (values) => {
    try {
      const payload = {
        name: values?.name,
        form_id: id,
        response: data?.data?.questions.map((question) => ({
          question: question?.question,
          answer: values[getLabel(question?.question)],
        })),
      };
      await addResponse({ endpoint: "form/response", body: payload });
      success("Response Added Successfully!");
      navigate("/");
    } catch (err) {
      error(err?.message || "Something went wrong!");
    }
  };

  return (
    <>
      <Loader open={isLoading} />
      <Stack
        direction="column"
        sx={{
          width: "900px",
          maxWidth: "100%",
        }}
        className="form-title"
      >
        <Typography
          component="h1"
          variant="h4"
          sx={{ textDecoration: "underline" }}
        >
          {capitalize(formData?.title || "")}
        </Typography>
        <Typography variant="subtitle1">{formData?.description}</Typography>
      </Stack>
      <Stack
        direction={"column"}
        sx={{
          width: "100%",
          maxWidth: "900px",
        }}
        className="form-question"
      >
        <Grid container gap={1}>
          <Grid item md={12}>
            <TextField
              fullWidth
              label="Enetr your name"
              name="name"
              {...getFieldProps("name")}
              error={Boolean(touched?.name && errors?.name)}
              helperText={touched?.name && errors?.name}
              sx={{ my: 2 }}
            />
          </Grid>
          {formData?.questions?.map((field, index) => (
            <Grid item md={12}>
              <FormFields
                index={index}
                type={field?.answerType}
                isRequired={field?.isRequired}
                field={field}
                formik={formik}
              />
              <hr />
            </Grid>
          ))}
        </Grid>
        <Button
          disabled={isLoading}
          onClick={() => {
            formik?.handleSubmit();
          }}
        >
          {isLoading || isSubmiting ? "Loading..." : "Submit"}
        </Button>
      </Stack>
    </>
  );
}

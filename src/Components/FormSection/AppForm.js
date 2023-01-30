import {Field, Form, Formik} from "formik";
import validationSchema from "./validationSchema";
import {TextField} from "@mui/material";
import Preloader from "../Preloader";
import Button from "../UI/Button";
import useAppContext from "../../AppContext";
import {useApi} from "../../hooks/useApi";
import RadioButtons from "./RadioButtons";
import ImageUploader from "./ImageUploader";

const AppForm = () => {
  const {handleSubmit} = useAppContext();

  return (
    <Formik
      initialValues={{name: '', email: '', phone: '', position: '', photo: null}}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => {
        const nameTextHelper = formik.touched.name && formik.errors.name
        const isNameError = Boolean(nameTextHelper)
        const emailTextHelper = formik.touched.email && formik.errors.email
        const isEmailError = Boolean(emailTextHelper)
        const phoneText = formik.touched.phone && formik.errors.phone
        const phoneTextHelper = phoneText || "+38 (XXX) XXX - XX - XX"
        const isPhoneError = Boolean(phoneText)
        const positionError = formik.touched.position && formik.errors.position
        const imageUploaderError = formik.touched.photo && formik.errors.photo

        const handleUploadImage = (event) => {
          const {currentTarget: {files}} = event;
          document.getElementById("file-name").innerHTML = files[0].name;
          document.getElementById("file-name").classList.add("form-section-image-uploader-box__uploaded");
          formik.setFieldValue('photo', files[0])
        }

        return (
          <Form className="form-section-form">
            <div>
              <Field
                as={TextField}
                name="name"
                type="text"
                label="Your name"
                fullWidth
                variant="outlined"
                error={isNameError}
                helperText={nameTextHelper}
              />

              <Field
                as={TextField}
                name="email"
                type="email"
                label="Email"
                fullWidth
                variant="outlined"
                error={isEmailError}
                helperText={emailTextHelper}
              />

              <Field
                FormHelperTextProps={{
                  className: `${formik.touched.phone && formik.errors.phone ? "" : "form-section-phone-helper-text"}`
                }}
                as={TextField}
                name="phone"
                type="text"
                label="Phone"
                fullWidth
                variant="outlined"
                error={isPhoneError}
                helperText={phoneTextHelper}
              />
            </div>

            <RadioButtons onChange={formik.handleChange} error={positionError}/>
            <ImageUploader error={imageUploaderError} onChange={handleUploadImage}/>
            {formik.isSubmitting && <Preloader/>}
            <Button className="form-section-submit-button" type="submit" disabled={formik.isSubmitting}>
              Submit
            </Button>
          </Form>

        )
      }
      }
    </Formik>
  )
}
export default AppForm;

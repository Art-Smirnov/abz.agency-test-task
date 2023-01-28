import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Formik, Form, Field} from 'formik';
import {TextField, RadioGroup, FormControlLabel, Radio, FormControl, FormLabel} from '@mui/material';
import * as Yup from 'yup';
import Button from "../UI/Button";
import successImage from "./images/success-image.svg"
import "./FormSection.sass"

const FormSection = () => {
  const [positions, setPositions] = useState([]);
  const [response, setResponse] = useState();
  const [token, setToken] = useState('');
  const fetchPositions = async () => {
    try {
      const response = await axios.get('https://frontend-test-assignment-api.abz.agency/api/v1/positions');
      setPositions(response.data.positions);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPositions();
  }, []);

  const handleSubmit = async (values, {setSubmitting}) => {
    const formData = new FormData();
    formData.append('position_id', values.position);
    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('phone', values.phone);
    formData.append('photo', values.photo);

    try {
      const tokenResponse = await axios.get('https://frontend-test-assignment-api.abz.agency/api/v1/token');
      await setToken(tokenResponse.data.token);

      const response = await axios.post('https://frontend-test-assignment-api.abz.agency/api/v1/users', formData, {
        headers: {
          'Token': token,
        },
      });
      console.log(response.data)

      setResponse(response.data);

    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }

    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
  }

  const handleUploadImage = (event, formik) => {
    const {currentTarget: {files}} = event;
    document.getElementById("file-name").innerHTML = files[0].name;
    document.getElementById("file-name").classList.add("form-section-image-uploader-box__uploaded");
    formik.setFieldValue('photo', files[0])
  }

  return (
    <div className="form-section container">
      <h1 className="form-section-title">Working with POST request</h1>
      {response && response.success ? (
        <img src={successImage} alt="User successfully registered"/>
      ) : (
        <Formik
          initialValues={{name: '', email: '', phone: '', position: '', photo: null}}
          validationSchema={Yup.object({
            name: Yup.string().min(2, 'Must be at least 2 characters').max(60, 'Must be 60 characters or less').required('Required'),
            email: Yup.string().min(2, 'Must be at least 2 characters').max(100, 'Must be 100 characters or less').email('Invalid email address').required('Required'),
            phone: Yup.string().matches(/^[\+]{0,1}380([0-9]{9})$/, 'Invalid phone number').required('Required'),
            position: Yup.number().min(1, 'Choose position').required('Choose position'),
            photo: Yup.mixed().required('A photo is required').test(
              'fileSize',
              'File too large',
              value => value && value.size <= 5242880
            ).test(
              'fileType',
              'Invalid file type',
              value => value && ['image/jpeg', 'image/jpg'].includes(value.type)
            )
          })}

          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form className="form-section-form">
              <Field
                sx={{
                  marginBottom: 6.25,
                }}
                as={TextField}
                name="name"
                type="text"
                label="Your name"
                fullWidth
                variant="outlined"
                error={Boolean(formik.touched.name && formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />

              <Field
                sx={{
                  marginBottom: 6.25,
                }}
                as={TextField}
                name="email"
                type="email"
                label="Email"
                fullWidth
                variant="outlined"
                error={Boolean(formik.touched.email && formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />

              <Field
                FormHelperTextProps={{
                  className: `${formik.touched.phone && formik.errors.phone ? "" : "form-section-phone-helper-text"}`
                }}
                sx={{
                  marginBottom: 3.125,
                }}
                as={TextField}
                name="phone"
                type="text"
                label="Phone"
                fullWidth
                variant="outlined"
                error={Boolean(formik.touched.phone && formik.errors.phone)}
                helperText={(formik.touched.phone && formik.errors.phone) || "+38 (XXX) XXX - XX - XX"}
              />

              <FormControl className="form-section-radio-buttons" component="fieldset">
                <FormLabel id="form-section-radio-buttons-label">Select your position</FormLabel>
                <RadioGroup
                  aria-labelledby="form-section-radio-buttons-label"
                  name="position"
                  onChange={formik.handleChange}
                >
                  {positions.map(({id, name}) => (
                    <FormControlLabel
                      key={id} value={id} control={<Radio/>} label={name}/>
                  ))}
                </RadioGroup>
                {formik.touched.position && formik.errors.position ? (
                  <span className="form-section-error">{formik.errors.position}</span>
                ) : null}
              </FormControl>

              <div className="form-section-image-uploader">
                <label htmlFor="photo">
                  <span id="file-name" className="form-section-image-uploader-box">Upload your photo</span>
                  <span className="form-section-image-uploader-button">
                  Upload
                  </span>
                </label>
                <input
                  name="photo"
                  type="file"
                  id="photo"
                  className="form-section-image-uploader-input"
                  onChange={(event) => handleUploadImage(event, formik)}
                />
                {formik.touched.photo && formik.errors.photo ? (
                  <span className="form-section-error">{formik.errors.photo}</span>
                ) : null}
              </div>
              <Button className="form-section-submit-button" type="submit" disabled={formik.isSubmitting}>
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default FormSection
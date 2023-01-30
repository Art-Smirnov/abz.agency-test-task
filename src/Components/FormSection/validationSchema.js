import * as Yup from "yup";

const validationSchema = Yup.object({
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
})

export default validationSchema;

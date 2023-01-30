import {memo} from 'react';
import successImage from "./images/success-image.svg"
import useAppContext from "../../AppContext";
import AppForm from "./AppForm";
import "./FormSection.sass"

const FormSection = () => {
  const {response} = useAppContext();

  return (
    <div className="form-section container">
      <h1 className="form-section-title">Working with POST request</h1>
      {response && response.success ? (
        <img src={successImage} alt="User successfully registered"/>
      ) : (
        <AppForm/>
      )}
    </div>
  );
};

export default memo(FormSection)

import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";
import {useApi} from "../../hooks/useApi";

const RadioButtons = ({onChange, error}) => {
  const {positions} = useApi();

  return (
    <FormControl className="form-section-radio-buttons" component="fieldset">
      <FormLabel id="form-section-radio-buttons-label">Select your position</FormLabel>
      <RadioGroup
        aria-labelledby="form-section-radio-buttons-label"
        name="position"
        onChange={onChange}
      >
        {positions.map(({id, name}) => (
          <FormControlLabel
            key={id} value={id} control={<Radio/>} label={name}/>
        ))}
      </RadioGroup>
      {error ? (
        <span className="form-section-error">{error}</span>
      ) : null}
    </FormControl>
  )
}

export default RadioButtons

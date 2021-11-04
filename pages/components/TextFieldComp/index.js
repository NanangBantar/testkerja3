import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import RadioButtonComp from "../RadioButtonComp";
import TextareaComp from "../TextareaComp";

export default function TextFieldComp(statement) {
  return (
    <>
      {statement.map((_, index) =>
        _.type === "textarea" ?
          TextareaComp(_, index)
          :
          _.type === "radio" ?
            RadioButtonComp(_, index)
            :
            (<Box key={index} sx={{ display: 'flex', alignItems: 'flex-end', mb: "20px" }}>
              {_.icon}
              <TextField  defaultValue={_.value} name={_.label} sx={{ width: "100%" }} id="input-with-sx" label={_.label} variant="standard" type={_.type} required />
            </Box>)
      )}
    </>
  );
}
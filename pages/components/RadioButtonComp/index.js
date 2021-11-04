import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function RadioButtonComp(statement, key) {
    return (
        <FormControl key={key} sx={{ width: "100%" }} component="fieldset">
            <FormLabel sx={{ display: "flex", justifyContent: "center" }} component="legend">
                {statement.icon}
                <Typography sx={{ margin: "5px 0" }}>Gender</Typography>
            </FormLabel>
            <RadioGroup
                aria-label="gender"
                defaultValue={statement.value[0]}
                name={statement.label}
            >
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    {statement.value.map((_, index) =>
                        <FormControlLabel key={index} value={_} control={<Radio />} label={statement.category[index]} />
                    )}
                </Box>
            </RadioGroup>
        </FormControl>
    );
}
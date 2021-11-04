import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function TextareaComp(statement, index) {
    return (
        <Box key={index}>
            <Typography sx={{ color: "#616161" }}>
                {statement.label}*
            </Typography>
            <TextField
                placeholder={statement.placeholder}
                multiline
                rows={statement.row}
                sx={{ width: "100%" }}
                name={statement.label}
                defaultValue={statement.value}
                required
                />
        </Box>
    );
}
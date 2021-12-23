import DateRangePicker from "@mui/lab/DateRangePicker";
import DateAdapter from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { Box, TextField } from "@mui/material";

const DatePicker = ({ datePick, setDatePick }) => {
  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <DateRangePicker
        startText="시작일"
        endText="종료일"
        calendars={1}
        value={datePick}
        onChange={(newValue) => {
          setDatePick(newValue);
        }}
        renderInput={(startProps, endProps) => (
          <>
            <TextField autoComplete="off" {...startProps} />
            <Box sx={{ mx: 1 }}> - </Box>
            <TextField autoComplete="off" {...endProps} />
          </>
        )}
      />
    </LocalizationProvider>
  );
};

export default DatePicker;

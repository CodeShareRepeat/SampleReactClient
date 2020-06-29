import React from "react";
import TextField from "@material-ui/core/TextField";

type Props = {
  label: string;
  helperText: string;
  searchString : string;
  onTextChanged: (textValue: string) => void;
};

export default function SearchTextBox(props: Props) {
  function handleChange(event: any) {
    event.preventDefault();
    props.onTextChanged(event.target.value);
  }

  return (
    <div>
      <TextField
        value={props.searchString}
        label={props.label}
        helperText={props.helperText}
        onChange={handleChange}
        fullWidth={true}
      />
    </div>
  );
}

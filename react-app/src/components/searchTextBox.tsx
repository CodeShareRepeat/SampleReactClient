import React from "react";
import TextField from "@material-ui/core/TextField";
import { prependOnceListener } from "cluster";

type Props = {
  label: string;
  helperText: string;
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
        label={props.label}
        helperText={props.helperText}
        onChange={handleChange}
      />
    </div>
  );
}

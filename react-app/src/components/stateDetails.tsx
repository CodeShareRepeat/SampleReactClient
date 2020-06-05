import React from "react";

type Props = {
  stateToDisplay: any;
  display: boolean;
};

export function StateDetails(props: Props) {
  return (
    <React.Fragment>
      <pre>
        {props.display === true
          ? JSON.stringify(props.stateToDisplay, null, 2)
          : ""}
      </pre>
    </React.Fragment>
  );
}

import React, { useState, useEffect } from "react";
import { Container, Paper, Grid, Button } from "@material-ui/core";
import SearchTextBox from "./searchTextBox";
import { StateDetails } from "./stateDetails";

type componentStateType = {
  isSearching: boolean;
  searchPossible: boolean;
  error: boolean;
  searchText: string;
  result: [];
};

export default function MainForm() {
  const [componentState, setComponentState] = useState<componentStateType>({
    error: false,
    searchPossible: false,
    isSearching: false,
    searchText: "",
    result: [],
  });

  useEffect(() => {
    if (componentState.searchText !== "") {
      setComponentState((prevState: componentStateType) => {
        return { ...prevState, searchPossible: true };
      });
    } else {
      setComponentState((prevState: componentStateType) => {
        return { ...prevState, searchPossible: false };
      });
    }
  }, [componentState.searchText]);

  function handleSearchStringChanged(this: any, searchString: string) {
    // store the value in the component state

    setComponentState((prevState: componentStateType) => {
      return {
        ...prevState,
        searchText: searchString,
      };
    });
  }

  return (
    <div>
      <Container maxWidth="lg">
        <Paper variant="outlined">
          <Grid container spacing={1} alignItems="flex-start" direction="row">
            <Grid item xs={12}>
              <SearchTextBox
                helperText="type * or te*xt to search"
                label="searchstring"
                onTextChanged={handleSearchStringChanged}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                disabled={!componentState.searchPossible}
              >
                get it!
              </Button>
            </Grid>
            <Grid item xs={12}>
              <p>Resultlist</p>
            </Grid>
            <Grid item xs={12}>
              <StateDetails display={true} stateToDisplay={componentState} />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
}

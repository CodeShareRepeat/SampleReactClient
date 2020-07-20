import React, { useState, useEffect } from "react";
import { Container, Paper, Grid, Button, Switch } from "@material-ui/core";
import SearchTextBox from "./searchTextBox";
import { StateDetails } from "./stateDetails";
import ResultList from "./resultList";
import { ResultItem } from "./resultItem";
const axios = require("axios").default;

type componentStateType = {
  isSearching: boolean;
  searchPossible: boolean;
  error: boolean;
  searchText: string;
  result: ResultItem[];
  showStateDetails: boolean;
};

export default function MainForm() {
  const [componentState, setComponentState] = useState<componentStateType>({
    error: false,
    searchPossible: false,
    isSearching: false,
    searchText: "",
    result: [],
    showStateDetails: false,
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

  function onSearchButtonClick() {
    // call
    const instance = axios.create({
      baseURL: "http://localhost:4000/",
      timeout: 1000,
    });

    if (
      componentState.searchPossible === true &&
      componentState.isSearching === false &&
      componentState.searchText !== ""
    ) {
      instance
        .get("search?searchstring=" + componentState.searchText)
        .then((response: any) => {
          setComponentState((prevState: componentStateType) => {
            return { ...prevState, result: response.data };
          });
        })
        .catch((error: any) => {
          setComponentState((prevState: componentStateType) => {
            return { ...prevState, result: [] };
          });

          setComponentState((prevState: componentStateType) => {
            return { ...prevState, searchText: "" };
          });

          alert(error);
        });
    }
  }

  function handleSearchStringChanged(this: any, searchString: string) {
    // store the value in the component state

    setComponentState((prevState: componentStateType) => {
      return {
        ...prevState,
        searchText: searchString,
      };
    });
  }

  function showHideStateDetails(event: any) {
    setComponentState({
      ...componentState,
      showStateDetails: event.target.checked,
    });
  }

  return (
    <div>
      <p></p>
      <Container maxWidth="lg">
        <Paper variant="outlined">
          <Grid container spacing={2} justify="center" alignItems="center">
            <Grid item xs={2}>
              <SearchTextBox
                searchString={componentState.searchText}
                helperText="type * or te*xt to search"
                label="searchstring"
                onTextChanged={handleSearchStringChanged}
              />
            </Grid>
            <Grid item xs={2}>
              <Button
                variant="contained"
                color="primary"
                disabled={!componentState.searchPossible}
                onClick={onSearchButtonClick}
              >
                get it!
              </Button>
            </Grid>
            <Grid item xs={2}>
              <Switch
                checked={componentState.showStateDetails}
                onChange={showHideStateDetails}
                inputProps={{ "aria-label": "secondary checkbox" }}
              />
            </Grid>

            <Grid item xs={9}>
              <ResultList tableData={componentState.result} />
            </Grid>
            <Grid item xs={12}>
              <StateDetails
                display={componentState.showStateDetails}
                stateToDisplay={componentState}
              />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
}

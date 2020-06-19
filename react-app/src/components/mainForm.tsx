import React, { useState, useEffect } from "react";
import { Container, Paper, Grid, Button } from "@material-ui/core";
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

  function onSearchButtonClick() {
    // move to external function

    // call
    const instance = axios.create({
      baseURL: "http://localhost:4000/",
      timeout: 1000,
      // headers: { "X-Custom-Header": "foobar" },
    });

    instance
      .get("all")
      .then((response: any) => {
        let y = response.data;
        setComponentState((prevState: componentStateType) => {
          return { ...prevState, result: y };
        });
        debugger;
        // let resultList = JSON.parse(response.data);
        // debugger;

        // //  response.data.map((item: any) => {
        // //    let mappedItem = {item.name}
        // //  });

        // setComponentState((prevState: componentStateType) => {
        //   return { ...prevState, result: resultList };
        // });
      })

      .catch((error: any) => {
        alert(error);
      });
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

  return (
    <div>
      <p></p>
      <Container maxWidth="lg">
        <Paper variant="outlined">
          <Grid container spacing={2} justify="center" alignItems="center">
            <Grid item xs={2}>
              <SearchTextBox
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

            <Grid item xs={9}>
              <ResultList tableData={componentState.result} />
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

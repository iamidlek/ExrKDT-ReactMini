import { Autocomplete, Grid, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { naverKeyword, naverResult } from "../apis/search";
import ResultList from "./Search/ResultList";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const [relative, setRelative] = useState([]);
  const [results, setResults] = useState([]);

  const getResult = async (value = "") => {
    if (value) {
      const data = await naverResult(value);
      setResults(data);
    } else {
      const data = await naverResult(keyword);
      setResults(data);
    }
  };

  useEffect(() => {
    (async () => {
      const data = await naverKeyword(keyword);
      setRelative(data);
    })();
  }, [keyword]);
  return (
    <>
      <Grid container style={{ textAlign: "right", marginBottom: "16px" }}>
        <Grid item xs={10}>
          <Autocomplete
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                getResult();
              }
            }}
            onChange={(event, value) => getResult(value)}
            options={relative}
            renderInput={(params) => (
              <TextField
                {...params}
                label="네이버 상품 검색"
                onChange={(e) => setKeyword(e.target.value)}
                value={keyword}
                variant="outlined"
                style={{ width: "100%" }}
                autoComplete="off"
              />
            )}
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="outlined"
            onClick={() => getResult()}
            style={{ marginRight: "36px", height: "100%" }}
          >
            검색
          </Button>
        </Grid>
      </Grid>
      <ResultList results={results} />
    </>
  );
};

export default Search;

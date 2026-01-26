import React, { memo } from "react";
import { Search } from "@mui/icons-material";
import {
  IconButton,
  TextField,
  InputAdornment,
} from "@mui/material";
import {
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarColumnsButton,
  GridToolbarExport,
} from "@mui/x-data-grid";
import FlexBetween from "./FlexBetween";

const DataGridCustomerToolbar = ({ searchInput, setSearchInput, setSearch }) => {
  return (
    <GridToolbarContainer>
      <FlexBetween width="100%">
        {/* LEFT */}
        <FlexBetween>
          <GridToolbarColumnsButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
        </FlexBetween>

        {/* RIGHT */}
        <TextField
          variant="standard"
          placeholder="Search..."
          sx={{ mb: "0.5rem", width: "15rem" }}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {
                    setSearch(searchInput);
                    setSearchInput("");
                  }}
                >
                  <Search />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </FlexBetween>
    </GridToolbarContainer>
  );
};

/**
 * 🔑 IMPORTANT FOR MUI X v8
 * Memoizing the toolbar ensures it renders correctly via `slots`
 */
export default memo(DataGridCustomerToolbar);

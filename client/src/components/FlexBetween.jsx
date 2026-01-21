const { Box } = require("@mui/material");
const { styled, alignItems } = require("@mui/system");

const FlexBetween = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
});

export default FlexBetween;
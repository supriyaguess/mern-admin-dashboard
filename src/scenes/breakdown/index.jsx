import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import Header from "components/Header";
import { ResponsivePie } from "@nivo/pie";
import { useGetSalesQuery } from "state/api";

const Breakdown = () => {
  const { data, isLoading } = useGetSalesQuery();
  const theme = useTheme();

  console.log('Breakdown data:', data);

  if (!data || isLoading) return "Loading...";

  if (!data.salesByCategory) {
    console.log('No salesByCategory data available');
    return "No sales data available";
  }

  const colors = [
    "#3f51b5",
    "#f50057", 
    "#ff9800",
    "#4caf50",
  ];

  const formattedData = Object.entries(data.salesByCategory).map(
    ([category, sales], i) => ({
      id: category,
      label: category,
      value: sales,
      color: colors[i % colors.length],
    })
  );

  console.log('Formatted breakdown data:', formattedData);

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="BREAKDOWN" subtitle="Breakdown of Sales By Category" />
      <Box mt="40px" height="75vh">
        <ResponsivePie
          data={formattedData}
          theme={{
            axis: {
              domain: {
                line: {
                  stroke: theme.palette.secondary[200],
                },
              },
              legend: {
                text: {
                  fill: theme.palette.secondary[200],
                },
              },
              ticks: {
                line: {
                  stroke: theme.palette.secondary[200],
                  strokeWidth: 1,
                },
                text: {
                  fill: theme.palette.secondary[200],
                },
              },
            },
            legends: {
              text: {
                fill: theme.palette.secondary[200],
              },
            },
            tooltip: {
              container: {
                color: theme.palette.primary.main,
              },
            },
          }}
          colors={colors}
          margin={{ top: 40, right: 80, bottom: 100, left: 50 }}
          sortByValue={true}
          innerRadius={0.45}
          activeOuterRadiusOffset={8}
          borderWidth={1}
          borderColor={{
            from: "color",
            modifiers: [["darker", 0.2]],
          }}
          enableArcLinkLabels={false}
          arcLinkLabelsTextColor={theme.palette.secondary[200]}
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: "color" }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{
            from: "color",
            modifiers: [["darker", 2]],
          }}
          legends={[
            {
              anchor: "bottom",
              direction: "row",
              justify: false,
              translateX: 20,
              translateY: 50,
              itemsSpacing: 0,
              itemWidth: 85,
              itemHeight: 18,
              itemTextColor: "#999",
              itemDirection: "left-to-right",
              itemOpacity: 1,
              symbolSize: 18,
              symbolShape: "circle",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemTextColor: theme.palette.primary[500],
                  },
                },
              ],
            },
          ]}
        />
      </Box>
    </Box>
  );
};

export default Breakdown;
import React from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Box,
} from "@mui/material";

const BmiTable = ({ bmidata }) => {
  return (
    <Box display="flex" justifyContent="center" marginTop={5}>
      <TableContainer component={Paper} sx={{ maxWidth: 400 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>BMI</TableCell>
              <TableCell>Results</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bmidata?.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.bmi}</TableCell>
                <TableCell
                  style={{
                    fontWeight: "bold",
                    color:
                      row.category === "Underweight"
                        ? "blue"
                        : row.category === "Normal weight"
                        ? "green"
                        : row.category === "Overweight"
                        ? "orange"
                        : row.category === "Obesity"
                        ? "#cc5500"
                        : row.category === "Extreme obesity"
                        ? "red"
                        : "inherit",
                  }}
                >
                  {row.category}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default BmiTable;

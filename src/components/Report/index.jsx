import { Box, Text } from "grommet";
import React from "react";

const Report = ({ report, index }) => {
    console.log(report);

    return (
        <Box>
            <Text>
                {`${index + 1}.`} {report.name} {report.createdAt.getFullYear} {report.injuryDate}
            </Text>
        </Box>
    );
};

export default Report;
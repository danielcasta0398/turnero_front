import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import styled from "styled-components";
import BasicTable from "../table/BasicTable";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const [color, setColor] = React.useState("#ef9235");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <TabsStyled
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          color={color}
        >
          <ItemTab
            label="Pendientes"
            color="#ef9235"
            onClick={() => setColor("#ef9235")}
          />
          <ItemTab
            label="Activos"
            color="#34AF44"
            onClick={() => setColor("#34AF44")}
          />
        </TabsStyled>
      </Box>
      <TabPanel value={value} index={0}>
        <BasicTable />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
    </Box>
  );
}

const TabsStyled = styled(Tabs)`
  .css-1aquho2-MuiTabs-indicator {
    background-color: ${(props) => (props.color ? `${props.color}` : "")};
  }
`;

const ItemTab = styled(Tab)`
  color: ${(props) => (props.color ? `${props.color}!important` : "")};
  font-weight: 600 !important;
`;

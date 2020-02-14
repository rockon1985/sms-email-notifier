import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import SmsService from "./smsService";
import EmailServices from "./emailService";
import apiRequest from '../utils/apiRequest'

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  }
});

const services = [
  {
    name: 'SMS',
    handler: SmsService
  },
  {
    name: 'EMAIL',
    handler: EmailServices
  }
]

export default function App() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const ComponentToRender = services[value].handler

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSendMessage = messageData => {
    apiRequest(messageData)
  };

  return (
    <Paper className={classes.root} elevation={0}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="SMS" />
        <Tab label="EMAIL" />
      </Tabs>
      <ComponentToRender send={handleSendMessage} />
    </Paper>
  );
}

import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import styles from "./smsServiceStyles";

export default function SmsService(props) {
  const { send } = props;
  const classes = styles();
  const [contactNumber, setContactNumber] = useState("");
  const [smsMessage, setSmsMessage] = useState("");

  const handleChange = (event, type) => {
    type === "contactNumber"
      ? setContactNumber(event.target.value)
      : setSmsMessage(event.target.value);
  };

  const handleSmsSend = () => {
    const smsData = {
      target: contactNumber,
      message: smsMessage,
      type: "sms"
    };
    send(smsData);
    setContactNumber("");
    setSmsMessage("");
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        id="contact-number"
        label="Contact Number"
        value={contactNumber}
        onChange={event => handleChange(event, "contactNumber")}
        required={true}
      />
      <TextField
        id="sms-message"
        label="Message"
        value={smsMessage}
        onChange={event => handleChange(event, "smsMessage")}
        className={classes.messageTextField}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSmsSend}
        className={classes.button}
      >
        Send
      </Button>
    </form>
  );
}

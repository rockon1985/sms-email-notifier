import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import styles from "./emailServiceStyles";

export default function EmailService(props) {
  const { send } = props;
  const classes = styles();
  const [emailId, setEmailId] = useState();
  const [emailSubject, setEmailSubject] = useState();
  const [emailMessage, setEmailMessage] = useState();

  const handleChange = (event, type) => {
    type === "emailId"
      ? setEmailId(event.target.value)
      : type === "emailSubject"
      ? setEmailSubject(event.target.value)
      : setEmailMessage(event.target.value);
  };

  const handleSmsSend = () => {
    const emailData = {
      target: emailId,
      message: emailMessage,
      subject: emailSubject,
      type: "email"
    };
    send(emailData);
    setEmailId("");
    setEmailSubject("");
    setEmailMessage("");
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        id="filled-secondary"
        label="Email Id"
        value={emailId}
        onChange={event => handleChange(event, "emailId")}
        required={true}
      />
      <TextField
        id="outlined-secondary"
        label="Subject"
        value={emailSubject}
        onChange={event => handleChange(event, "emailSubject")}
      />
      <TextField
        id="outlined-secondary"
        label="Message"
        value={emailMessage}
        onChange={event => handleChange(event, "emailMessage")}
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

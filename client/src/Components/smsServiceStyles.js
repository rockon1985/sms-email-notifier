import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    margin: "auto",
    width: "250px",
    display: "grid",
    marginTop: "20px"
  },
  button: {
    width: "100px",
    margin: "auto"
  },
  messageTextField: {
    marginBottom: "20px"
  }
}));

export default useStyles;

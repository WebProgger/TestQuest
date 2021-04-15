import React, {useState} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const Toast = (props) => {
  const [state, setState] = useState({
    open: true,
    vertical: 'top',
    horizontal: 'right',
  });
  const { vertical, horizontal, open } = state;

  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setState({open: false});
  };

  console.log("Toast");

  switch(props.type) {
    case 1:
        return (
            <Snackbar anchorOrigin={{ vertical, horizontal }} open={open} autoHideDuration={6000} onClose={handleClose} key={vertical + horizontal}>
                <Alert onClose={handleClose} severity="error">
                    {props.text}
                </Alert>
            </Snackbar>
        );
    case 2:
        return (
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="warning">
                    {props.text}
                </Alert>
            </Snackbar>
        );
    case 3:
        return (
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="info">
                    {props.text}
                </Alert>
            </Snackbar>
        );
    case 4:
        return (
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    {props.text}
                </Alert>
            </Snackbar>
        );
    default:
        return (
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="info">
                    {props.text}
                </Alert>
            </Snackbar>
        );
  }

}
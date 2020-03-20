import React from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
//import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function Addtraining(props) {
    const [open, setOpen] = React.useState(false);
    const addTrainingUrl={startline:'http://localhost:3000/customers/'}

    //Uusi treeni
    const[training, setTraining] = React.useState({
        date: ' ', 
        activity: ' ',
        duration: ' ',
        customer: ' ',
    })
      
    //Input-kenttien arvot talteen
    const handleInputChange = (event) => {
        setTraining({...training, customer : `${addTrainingUrl.startline}${props.customerId}`, [event.target.name]: event.target.value})
    }

    //Lisätään treeni tallennettavaksi kantaan ja suljetaan lomake
    const addTraining = () => {
        props.saveTraining(training)
        handleClose() 
    }

    const handleClickOpen = () => {
        
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };


    return(
        <div>           
            <Button variant="outlined" color="primary" size="small" onClick={handleClickOpen}>
                 Add training
            </Button>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">New training</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Date"
                        name="date"
                        value={training.date}
                        onChange={e => handleInputChange(e)}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Activity"
                        name="activity"
                        value={training.activity}
                        onChange={e => handleInputChange(e)}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Duration"
                        name="duration"
                        value={training.duration}
                        onChange={e => handleInputChange(e)}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                         Cancel
                    </Button>
                    <Button onClick={addTraining} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
    </div>
    )
}
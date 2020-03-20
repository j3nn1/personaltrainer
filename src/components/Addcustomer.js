import React from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
//import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function Addcustomer(props) {
    const [open, setOpen] = React.useState(false);

    //Uusi asiakas
    const[customer, setCustomer] = React.useState({
        firstname: ' ', 
        lastname: ' ',
        streetaddress: ' ',
        postcode: ' ', 
        city: ' ',
        email: ' ',
        phone: ' '
    })

    //Painikkeesta "Save" tallennetaan tiedot. Funktio saveCustomer kutsutaan propsien avulla Customerlist komponentista
    const addCustomer = () => {
        props.saveCustomer(customer)
        handleClose()
    }

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    //Input-kenttien arvot talteen
    const handleInputChange = (event) => {
        setCustomer({...customer, [event.target.name]: event.target.value})
    }

    return(
        <div>
            <Button style={{margin:10}} variant="contained" color="primary" onClick={handleClickOpen}>
                 Add customer
            </Button>
            
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">New customer</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="First name"
                        name="firstname"
                        value={customer.firstname}
                        onChange={e => handleInputChange(e)}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Last name"
                        name="lastname"
                        value={customer.lastname}
                        onChange={e => handleInputChange(e)}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Address"
                        name="streetaddress"
                        value={customer.streetaddress}
                        onChange={e => handleInputChange(e)}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Postcode"
                        name="postcode"
                        value={customer.postcode}
                        onChange={e => handleInputChange(e)}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="City"
                        name="city"
                        value={customer.city}
                        onChange={e => handleInputChange(e)}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Email"
                        name="email"
                        value={customer.email}
                        onChange={e => handleInputChange(e)}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Phone"
                        name="phone"
                        value={customer.phone}
                        onChange={e => handleInputChange(e)}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                         Cancel
                    </Button>
                    <Button onClick={addCustomer} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
    </div>
    )
}


        

   
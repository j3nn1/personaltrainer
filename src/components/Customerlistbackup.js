import React, { useState, useEffect } from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import Button from '@material-ui/core/Button';
import Addcustomer from './Addcustomer'
//import Addtraining from './Addtraining'


import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function Customerlist () {
    const [customers, setCustomers] = useState([])
    const [selectedCustomer, setSelectedCustomer] = useState()


    //Customers datan haku, kun sivu ladataan
    useEffect(() => fetchCustomerData(), [])

    //Customers datan haku 
    const fetchCustomerData = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
    }

    //DELETE CUSTOMER Asiakkaan poisto, ID:nä toimii linkki
    //Linkit ovat arrayna, käytetään ensimmäisen indeksin ([0]) href arvoa
    const deleteCustomer = (link) => {
        if(window.confirm('Do you want to delete customer?')) {
            console.log(link[0].href)
            fetch(link[0].href, {method: 'DELETE'})
            .then(res => fetchCustomerData())
            .catch(err => console.error(err))
        }
    }
    
    
    //ADD CUSTOMER Kerättyjen uusien customertietojen tallennus
    const saveCustomer = (customer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
            })
        .then(res => fetchCustomerData())
        .catch(err => console.error(err))
    }


    //react-table sarakkeet
    const columns =[
        {
            Header: 'First name',
            accessor: 'firstname'
        }, 
        {
            Header: 'Last name',
            accessor: 'lastname'
        }, 
        {
            Header: 'Address',
            accessor: 'streetaddress'
        }, 
        {
            Header: 'Postcode',
            accessor: 'postcode'
        }, 
        {
            Header: 'City',
            accessor: 'city'
        }, 
        {
            Header: 'Email',
            accessor: 'email'
        }, 
        {
            Header: 'Phone',
            accessor: 'phone'
        },
        {
            sortable: false,
            filterable: false,
            width:150,
            accessor: 'links',
            //Note to self: Tallennetaan selectedCustomer tietoon valitun asiakkaan ID (linkkien arraysta ensimmäinen href (indeksi 0 ) ja otetaan linkin lopusta id)
        Cell: row => <Button variant="outlined" color="primary" size="small" onClick={() =>  addTrainingToCustomer(row.value[0].href.slice(49))}>New training</Button>
        },
        {
            sortable: false,
            filterable: false,
            width:100,
            accessor: 'links',
            Cell: row => <Button variant="outlined" color="secondary" size="small" onClick={() => deleteCustomer(row.value)}>Delete</Button>
        }
        
    ]

//ADD TRAINING TO CUSTOMER PART *START*
    //uuden treenin lomakkeen tila
    const [open, setOpen] = React.useState(false);
    const addTrainingUrl={startline:'http://localhost:3000/customers/'}

    //(Buttonista) Tallennetaan valitun asiakkaan ID ja avataan lomake
    const addTrainingToCustomer = (link) => { 
        setSelectedCustomer(link)
        console.log(selectedCustomer)
        setOpen(true);
    }

    //Uusi treeni
        const[training, setTraining] = React.useState({
            date: ' ', 
            activity: ' ',
            duration: ' ',
            customer: ' ',
    })
  
    //Input-kenttien arvot talteen
    const handleInputChange = (event) => {
        setTraining({...training, customer : `${addTrainingUrl.startline}${selectedCustomer}`, [event.target.name]: event.target.value})
    }

    //Button Save - tallentaminen
    const saveTraining = () => {
        //Tähän save
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(training)
            })
        console.log('toimii')
        handleClose()
        }
    
    //Button Cancel  - lomakkeen sulkeminen
    const handleClose = () => {
        setOpen(false);
      };

//ADD TRAINING TO CUSTOMER PART *END*

    return(
        <div>
            {console.log(selectedCustomer)}
            
            <Addcustomer saveCustomer={saveCustomer}/>
            
            <div>           
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">New customer</DialogTitle>
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
                        <Button onClick={saveTraining} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>

            <ReactTable filterable={true} data={customers} columns={columns} />

        </div>
    )
}
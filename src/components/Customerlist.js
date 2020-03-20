import React, { useState, useEffect } from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import Button from '@material-ui/core/Button';
import Addcustomer from './Addcustomer'
import Addtraining from './Addtraining'
import Editcustomer from './Editcustomer'


export default function Customerlist () {
    const [customers, setCustomers] = useState([])
    

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
    
    
    //ADD CUSTOMER Uuden asiakkaan tallennus kantaan tallennus
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

    //ADD TRAINING Uuden treenin tallentaminen asiakkaalle kantaan
        const saveTraining = (training) => {
            fetch('https://customerrest.herokuapp.com/api/trainings', {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(training)
                })
            console.log('toimii')

    }

    //EDIT CUSTOMER
    const updateCustomer = (customer, link) => {
        fetch(link[0].href, {
            method:'PUT',
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
            //Laitetaan soluun Addtraining komponentti. 
            //Välitetään valitetun asiakkaan ID (linkkien arraysta ensimmäinen href (indeksi 0 ) ja otetaan linkin lopusta id)
            //Välitetään saveTraining funktio
            Cell: row => <Addtraining customerId={(row.value[0].href.slice(49))} saveTraining={saveTraining}/>
        },
        {
            sortable: false,
            filterable: false,
            width:100,
            accessor: 'links',
            Cell: row => <Editcustomer updateCustomer={updateCustomer}  customerdata={row.original}/>
        },
        {
            sortable: false,
            filterable: false,
            width:100,
            accessor: 'links',
            Cell: row => <Button variant="outlined" color="secondary" size="small" onClick={() => deleteCustomer(row.value)}>Delete</Button>
        }
        
    ]

    return(
        <div>
           
            <Addcustomer saveCustomer={saveCustomer}/>
            
            <ReactTable filterable={true} data={customers} columns={columns} />

        </div>
    )
}
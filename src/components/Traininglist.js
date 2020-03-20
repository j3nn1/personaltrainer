import React, { useState, useEffect } from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import moment from "moment";
import Button from '@material-ui/core/Button';



export default function Traininglist () {
    const [trainings, setTrainings] = useState([])


    //hakee datan, kun sivu ladataan
    useEffect(() => fetchTrainingData(), [])

    //Training datan haku 
    const fetchTrainingData = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(response => response.json())
        .then(data => setTrainings(data.content))
    }

    //Poistetaan treeni, ID:nä toimii linkki
    //Linkit ovat arrayna, käytetään ensimmäisen indeksin ([0]) href arvoa
    const deleteTraining = (link) => {
        if(window.confirm('Do you want to delete this training?')) {
            console.log(link[0].href)
            fetch(link[0].href, {method: 'DELETE'})
            .then(res => fetchTrainingData())
            .catch(err => console.error(err))
        }
    }


    //react-table columns
    const columns =[
        {
            Header: 'Date',
            accessor: 'date',
            Cell: row => moment(row.value).format('LLL')
        }, 
        {
            Header: 'Duration',
            accessor: 'duration'
        }, 
        {
            Header: 'Activity',
            accessor: 'activity'
        },
        {
            sortable: false,
            filterable: false,
            width:100,
            accessor: 'links',
            Cell: row => <Button variant="outlined" color="secondary" size="small" onClick={() => deleteTraining(row.value)}>Delete</Button>
        } 
    ]

    return(
        <div>
            <ReactTable filterable={true} data={trainings} columns={columns} />
        </div>
    )
}
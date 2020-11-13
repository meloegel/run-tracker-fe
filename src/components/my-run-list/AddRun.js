import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import UserContext from '../../contexts/UserContext';
import RunTrackerContext from '../../contexts/RunTrackerContext';
import TextField from '@material-ui/core/TextField';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import { Checkbox } from '@material-ui/core';
import Button from '@material-ui/core/Button';

const initalDetails = {
    userId: '',
    runTime: '',
    distance: '',
    pace: '',
    description: '',
    publish: true,
};

const AddRun = () => {
    const { push } = useHistory();
    const [details, setDetails] = useState(initalDetails)
    const { runList, setRunList } = useContext(RunTrackerContext);
    const [publish, setPublish] = useState(true)
    const { userId } = useContext(UserContext);

    const handleChange = evt => {
        setDetails({
            ...details,
            [evt.target.name]: evt.target.value
        });

    };

    const handleCheckbox = evt => {
        setPublish(!publish)
        setDetails({
            ...details,
            publish: publish
        })
        console.log(details)
    }

    const handleSubmit = evt => {
        setDetails({
            ...details,
            userId: userId.userId
        })
        evt.preventDefault();
        axiosWithAuth()
            .post('/api/auth/run-tracker', details)
            .then(res => {
                console.log(res);
                setRunList([...runList, details]);
                push('/my-run-list').reset()
            })
            .catch(error => console.log(error))
    }

    return (
        <div >
            <h2>Add A Run</h2>
            <form onSubmit={handleSubmit} className='addRunForm'>
                <TextField
                    type="text"
                    variant="filled"
                    name="runTime"
                    onChange={handleChange}
                    label="Run Time"
                    value={details.runTime}
                />
                <div />
                <TextField
                    type="text"
                    variant="filled"
                    name="distance"
                    onChange={handleChange}
                    label="Distance"
                    value={details.distance}
                />
                <div />
                <TextField
                    type="text"
                    variant="filled"
                    name="pace"
                    onChange={handleChange}
                    label="Pace"
                    value={details.pace}
                />
                <div />
                <TextField
                    type="text"
                    variant="filled"
                    style={{ width: '25.3ch' }}
                    multiline
                    rowsMax={6}
                    name="description"
                    onChange={handleChange}
                    label="Description"
                    value={details.description}
                />
                <div />
                <div />
                <Checkbox
                    icon={<FavoriteBorder />}
                    type="checkbox"
                    name="publish"
                    label='Publish'
                    onChange={handleCheckbox}
                    id="publish"
                    value={details.publish}
                />
                <label for='publish'>Publish</label>
                <div />
                <div />
                <TextField
                    id='idInput'
                    variant="filled"
                    type="text"
                    name="userId"
                    onChange={handleChange}
                    value={userId.userId}
                />
                <div />
                <br />
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    className="add-button"
                >Add New Run</Button>
            </form>
        </div>
    )
}

export default AddRun;
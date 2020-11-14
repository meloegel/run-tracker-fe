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
            <form onSubmit={handleSubmit} className='addRunForm'>
                <div className='runForm'>
                    <h2>Add A Run</h2>
                    <div className='addRunFormInputs'>
                        <div>
                            <TextField
                                type="text"
                                variant="filled"
                                style={{ padding: '.5rem', width: '30ch' }}
                                name="runTime"
                                onChange={handleChange}
                                label="Run Time"
                                value={details.runTime}
                            />
                            <TextField
                                type="text"
                                variant="filled"
                                style={{ padding: '.5rem', width: '30ch' }}
                                name="distance"
                                onChange={handleChange}
                                label="Distance"
                                value={details.distance}
                            />
                        </div>
                        <div>
                            <TextField
                                type="text"
                                variant="filled"
                                style={{ padding: '.5rem', width: '30ch' }}
                                name="pace"
                                onChange={handleChange}
                                label="Pace"
                                value={details.pace}
                            />
                            <TextField
                                type="text"
                                variant="filled"
                                style={{ width: '30ch', padding: '.5rem' }}
                                multiline
                                rowsMax={6}
                                name="description"
                                onChange={handleChange}
                                label="Description"
                                value={details.description}
                            />
                        </div>
                    </div>
                    <div className='addRunPublish'>
                        <div>
                            <Checkbox
                                icon={<FavoriteBorder />}
                                checkedIcon={<Favorite />}
                                type="checkbox"
                                name="publish"
                                label='Publish'
                                onChange={handleCheckbox}
                                id="publish"
                                value={details.publish}
                            />
                            <label id='labelPublish' for='publish'>Publish</label>
                        </div>
                        <div>
                            <TextField
                                id='idInput'
                                variant="filled"
                                type="text"
                                name="userId"
                                onChange={handleChange}
                                value={userId.userId}
                            />
                            <Button
                                variant="contained"
                                onClick={handleSubmit}
                                className="add-button"
                            >Add Run</Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddRun;
import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import UserContext from '../../contexts/UserContext';
import RunContext from '../../contexts/RunContext';
import TextField from '@material-ui/core/TextField';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import { Checkbox } from '@material-ui/core';
import Button from '@material-ui/core/Button';

const initalDetails = {
    runTime: '',
    distance: '',
    pace: '',
    description: '',
    publish: true,
};

const EditRun = () => {
    const { push } = useHistory();
    const [details, setDetails] = useState(initalDetails)
    const [publish, setPublish] = useState(true)
    const { userId } = useContext(UserContext);
    const { runInfo } = useContext(RunContext);

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
        console.log(details)
        evt.preventDefault();
        axiosWithAuth()
            .put(`/api/auth/run-tracker/${runInfo.runInfo}`, details)
            .then(res => {
                console.log(res);
                push('/my-run-list').reset()
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        axiosWithAuth()
            .get(`/api/auth/run-tracker/run/${runInfo.runInfo}`)
            .then(res => {
                console.log(res);
                setDetails(res.data);
            })
            .catch(err => console.log(err));
    }, [runInfo.runInfo]);

    return (
        <div >
            <h2>Edit Run</h2>
            <form onSubmit={handleSubmit} className='editRunForm'>
                <div className='topForm'>
                    <div>
                        <TextField
                            type="text"
                            variant="filled"
                            style={{ margin: '0 0 2rem 0' }}
                            name="runTime"
                            onChange={handleChange}
                            label="Run Time"
                            value={details.runTime}
                        />
                        <TextField
                            type="text"
                            variant="filled"
                            name="distance"
                            onChange={handleChange}
                            label="Distance"
                            value={details.distance}
                        />
                    </div>
                    <div>
                        <TextField
                            type="text"
                            style={{ margin: '0 0 2rem 0' }}
                            name="pace"
                            variant="filled"
                            onChange={handleChange}
                            label="Pace"
                            value={details.pace}
                        />
                        <TextField
                            type="text"
                            variant="filled"
                            name="description"
                            onChange={handleChange}
                            style={{ width: '25.3ch' }}
                            multiline
                            rowsMax={6}
                            label="Description"
                            value={details.description}
                        />
                    </div>
                </div>
                <Checkbox
                    icon={<FavoriteBorder />}
                    type="checkbox"
                    name="publish"
                    checkedIcon={<Favorite />}
                    label='Publish'
                    onChange={handleCheckbox}
                    checked={details.publish}
                    id="publish"
                    style={{ margin: '2rem 0 2rem 0' }}
                    value={details.publish}
                />
                <label for='publish'>Publish</label>
                <div />
                <input
                    id='idInput'
                    type="text"
                    name="userId"
                    onChange={handleChange}
                    value={details.userId}
                    placeholder={userId.userId}
                />
                <div />
                <br />
                <Button
                    variant="contained"
                    className="add-button"
                >Edit Run</Button>
            </form>
        </div>
    )
}

export default EditRun;
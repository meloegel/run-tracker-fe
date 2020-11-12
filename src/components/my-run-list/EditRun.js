import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import UserContext from '../../contexts/UserContext';
import RunContext from '../../contexts/RunContext';
import TextField from '@material-ui/core/TextField';

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
                    name="pace"
                    variant="filled"
                    onChange={handleChange}
                    label="Pace"
                    value={details.pace}
                />
                <div />
                <TextField
                    type="text"
                    variant="filled"
                    name="description"
                    onChange={handleChange}
                    fullWidth
                    label="Description"
                    value={details.description}
                />
                <div />
                <div />
                <input
                    type="checkbox"
                    name="publish"
                    onChange={handleCheckbox}
                    checked={details.publish}
                    id="publish"
                    value={details.publish}
                />
                <label for='publish'>Publish</label>
                <div />
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
                <button className="add-button">Edit Run</button>
            </form>
        </div>
    )
}

export default EditRun;
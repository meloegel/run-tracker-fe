import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import UserContext from '../contexts/UserContext';
import RunTrackerContext from '../contexts/RunTrackerContext';

const initalDetails = {
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
        console.log(details)
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
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="runTime"
                    onChange={handleChange}
                    placeholder="Run Time"
                    value={details.runTime}
                />
                <div />
                <input
                    type="text"
                    name="distance"
                    onChange={handleChange}
                    placeholder="Distance"
                    value={details.distance}
                />
                <div />
                <input
                    type="text"
                    name="pace"
                    onChange={handleChange}
                    placeholder="Pace"
                    value={details.pace}
                />
                <div />
                <input
                    type="text"
                    name="description"
                    onChange={handleChange}
                    placeholder="Description"
                    value={details.description}
                />
                <div />
                <div />
                <input
                    type="checkbox"
                    name="publish"
                    onChange={handleCheckbox}
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
                <button className="add-button">Add New Run</button>
            </form>
        </div>
    )
}

export default AddRun;
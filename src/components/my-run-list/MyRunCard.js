import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import PersonalInfo from './Personal-Info';
import RunContext from '../../contexts/RunContext';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import FormatDateTime from '../common/FormatDateTime';

const MyRunCard = ({ run }) => {
    const { push } = useHistory();
    const { setRunInfo } = useContext(RunContext)

    const handleDelete = () => {
        axiosWithAuth()
            .delete(`/api/auth/run-tracker/${run.runTimeID}`)
            .then(res => {
                window.location.reload()
            })
            .catch(error => console.log(error))
    }
    const handleConfirm = () => {
        const r = window.confirm('Are you sure you want to delete run?')
        if (r === true) {
            handleDelete()
        }
    }
    const formatPublish = (publish) => {
        if (publish === true) {
            return 'Yes'
        } else {
            return 'No'
        }
    }

    const handleEdit = () => {
        setRunInfo({
            runInfo: run.runTimeID.toString()
        })
        push(`/edit-run/${run.runTimeID}`)
    }

    return (
        <Card className='runCard'>
            <CardContent className='myCardContent' >
                <div className='personalInfoDiv'>
                    <PersonalInfo />
                </div>
                <div>
                    <Typography id='cardContentTitle'><span className='cardContentTitle'>Run Time:</span> {run.runTime}</Typography>
                    <Typography id='cardContentTitle'><span className='cardContentTitle'>Distance:</span> {run.distance}</Typography>
                    <Typography id='cardContentTitle'><span className='cardContentTitle'>Pace:</span> {run.pace}</Typography>
                    <Typography id='cardContentTitle'><span className='cardContentTitle'>Description:</span> {run.description}</Typography>
                    <Typography id='cardContentTitle'><span className='cardContentTitle'>Published:</span> {formatPublish(run.publish)}</Typography>
                    <Typography id='cardContentTitle'><span className='cardContentTitle'>Posted:</span> {!run.timePosted ? run.TimePosted : FormatDateTime(run.timePosted)}</Typography>
                    <Button
                        style={{ margin: "0 1rem 0 0" }}
                        variant="contained"
                        className='editDeleteBtn'
                        onClick={handleConfirm}
                    >Delete Run</Button>
                    <Button
                        className='editDeleteBtn'
                        variant="contained"
                        onClick={handleEdit}
                    >Edit Run</Button>
                </div>
            </CardContent>
        </Card >
    )
}

export default MyRunCard;
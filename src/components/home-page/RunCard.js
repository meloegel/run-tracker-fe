import React from 'react';
import { useHistory } from 'react-router-dom';
import UserInfo from '../home-page/UserInfo';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import FormatDateTime from '../common/FormatDateTime';

const RunCard = ({ run }) => {
    const { push } = useHistory();

    console.log(run)

    return (
        <Card className='runCard'>
            <CardContent className='cardContent'>
                <div>
                    <UserInfo userId={run.userId} />
                </div>
                <div>
                    <Typography id='runTime'><span className='cardContentTitle'>Run Time:</span> {run.runTime}</Typography>
                    <Typography ><span className='cardContentTitle'>Distance:</span> {run.distance}</Typography>
                    <Typography ><span className='cardContentTitle'>Pace:</span> {run.pace}</Typography>
                    <Typography ><span className='cardContentTitle'>Description:</span> {run.description}</Typography>
                    <Typography ><span className='cardContentTitle'>Posted:</span> {FormatDateTime(run.timePosted)}</Typography>
                </div>
            </CardContent>
        </Card>
    )
}

export default RunCard;
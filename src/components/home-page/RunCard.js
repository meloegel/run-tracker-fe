import React from 'react';
import { useHistory } from 'react-router-dom';
import UserInfo from '../home-page/UserInfo';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';

const RunCard = ({ run }) => {
    const { push } = useHistory();

    return (
        <Card className='runCard'>
            <CardContent className='cardContent'>
                <div>
                    <UserInfo userId={run.userId} />
                </div>
                <div>
                    <Typography className='runTime'>Run Time: {run.runTime}</Typography>
                    <Typography className='distance'>Distance: {run.distance}</Typography>
                    <Typography className='pace'>Pace: {run.pace}</Typography>
                    <Typography className='posted'>Posted: {run.timePosted}</Typography>
                    <Typography className='description'>Description: {run.description}</Typography>
                    <Typography className='user'>User: {run.userId}</Typography>
                </div>
            </CardContent>
        </Card>
    )
}

export default RunCard;
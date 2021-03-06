import React from 'react';
import UserInfo from '../home-page/UserInfo';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import FormatDateTime from '../common/FormatDateTime';

const RunCard = ({ run }) => {
    return (
        <Card className='runCard'>
            <CardContent className='cardContent'>
                <div className='userInfoDiv'>
                    <UserInfo userId={run.userId} />
                </div>
                <div className='cardContentDiv'>
                    <Typography id='cardContentTitle'><span className='cardContentTitle'>Run Time: </span>{run.runTime}</Typography>
                    <Typography id='cardContentTitle'><span className='cardContentTitle'>Distance:</span> {run.distance}</Typography>
                    <Typography id='cardContentTitle'><span className='cardContentTitle'>Pace:</span> {run.pace}</Typography>
                    <Typography id='cardContentTitle'><span className='cardContentTitle'>Description:</span> {run.description}</Typography>
                    <Typography id='cardContentTitle'><span className='cardContentTitle'>Posted:</span> {FormatDateTime(run.timePosted)}</Typography>
                </div>
            </CardContent>
        </Card>
    )
}

export default RunCard;
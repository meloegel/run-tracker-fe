import React, { useContext } from 'react';
import RunTrackerContext from '../../contexts/RunTrackerContext';
import MyRunCard from './MyRunCard';

const PersonalRunList = () => {
    const { runList } = useContext(RunTrackerContext);

    return (
        <div>
            {runList.map(run => (
                <MyRunCard
                    key={run.id}
                    run={run}
                    className='run'
                />
            ))}
        </div>
    )
}

export default PersonalRunList;
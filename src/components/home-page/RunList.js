import React, { useContext } from 'react';
import RunTrackerContext from '../../contexts/RunTrackerContext';
import RunCard from './RunCard';

const RunList = () => {
    const { runList } = useContext(RunTrackerContext);

    return (
        <div>
            {runList.slice(0).reverse().map(run => (
                <RunCard
                    key={run.id}
                    run={run}
                    className='run'
                />
            ))}
        </div>
    )
}

export default RunList;
import React, { useContext } from 'react'
import { useParams } from 'react-router-dom';
import { DataContext } from '../../Commons/Context/DataContext';
import { MINING_MACHINES } from '../../Helpers/helper';

function MineroDetails() {

    
    const { id } = useParams();
    const [minero, setMinero] = React.useState(null);
    const { sidebarStatus, setSidebarStatus } = useContext(DataContext)


    React.useEffect(() => {

        const token = localStorage.getItem('token');

        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'token': token
            }
        }

        const idmin = Number(id)

        const getMinerData = async () => {
            const response = await fetch(MINING_MACHINES + idmin, options)
            const data = await response.json();
            setMinero(data);
        }
        getMinerData()


    }, []);


    console.log(minero);


    return (
        <div className={sidebarStatus === 'open' ? 'main-content' : 'main-content extend'} >
            {
                minero && (
                    Object.keys(minero)?.map((key, index) => {
                        return (minero[key] !== null) ? <p key={index}>{key}: {minero[key]}</p> : null
                    })
                )
            }
        </div>
    )
}

export default MineroDetails
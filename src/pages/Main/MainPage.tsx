import './styles.css';
import LayoutPage from '../../layoutPage/layoutPage';
import Tooltip from '../../components/common/Tooltip';
import React, { useEffect } from 'react';

const MainPage = () => {

    const [ tooltip, setError ] = React.useState<{ type: 'success' | 'error'; message: string } | null>(null)
    

    return (
        <LayoutPage>
            {tooltip && (
                <Tooltip type={tooltip.type} typeText={tooltip.message} close={() => setError(null)}/>
            )} 
            <div className="main-page">
                <p>Головна сторінка</p>
            </div>
        </LayoutPage>
    )
}

export default MainPage

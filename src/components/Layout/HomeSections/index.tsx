import React from 'react';
import './style.css'


type Section = {
    icon: React.ReactNode;
    valueTop: string;
    valueBottom: string;
};

type HomeSectionsProps = {
    sections: Section[];
};


const HomeSections = ({ sections } : HomeSectionsProps) => {
    const getPositionClass = (number: number) => {
        const positions = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
        return positions[number] || '';
    };

    return (
        <div className="sleep-tracker-container">
            {sections.map((section, number) => (
                <div className={`sleep-tracker-card ${getPositionClass(number)}`} key={number}>
                    <div className="icon-wrapper">{section.icon}</div>
                    <div className="data-wrapper">
                        <p>{section.valueTop}</p>
                        <p>{section.valueBottom}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default HomeSections

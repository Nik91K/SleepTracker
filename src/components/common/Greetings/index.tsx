import React from 'react';
import './style.css';

const Greetings = () => {
    const name = localStorage.getItem('UserName') || 'Користувач'
    const [greetingsText, setGreetingsText] = React.useState('')

    React.useEffect(() => {
        const randomGreetings = Math.random()
        const hours = new Date().getHours()

        if (randomGreetings < 0.4) {
            setGreetingsText('Вітаємо')
        } else if (hours >= 5 && hours < 12) {
            setGreetingsText('Доброго ранку')
        } else if (hours >= 12 && hours < 18) {
            setGreetingsText('Доброго дня')
        } else if (hours >= 18 && hours < 21) {
            setGreetingsText('Доброго вечора')
        } else {
            setGreetingsText('Доброї ночі')
        }
    }, [])



    return (
        <div className="greetings">
            <p className='greetings-username'>{name}</p>
            <p className="greetings-text">{greetingsText}!</p>
        </div>
    )
}

export default Greetings

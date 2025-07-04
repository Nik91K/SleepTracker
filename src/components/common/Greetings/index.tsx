import React from 'react';
import './style.css';
import { useAppSelector } from '../../../api/hooks';

const Greetings = () => {
    const [greetingsText, setGreetingsText] = React.useState('')
    const { user } = useAppSelector((state) => state.auth)

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
            <p className='greetings-username'>{user?.name || 'Користувач'}</p>
            <p className="greetings-text">{greetingsText}!</p>
        </div>
    )
}

export default Greetings

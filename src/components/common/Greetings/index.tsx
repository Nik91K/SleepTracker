import './style.css';

const Greetings = () => {
    const name = localStorage.getItem('UserName') || 'Користувач'
    const randomGreetings = Math.random()
    const hours = new Date().getHours()
    let text = ''

    if (randomGreetings < 0.4) {
        text = 'Вітаємо'
    } else if (hours >= 5 && hours < 12) {
        text = 'Доброго ранку'
    } else if (hours >= 12 && hours < 18) {
        text = 'Доброго дня'
    } else if (hours >= 18 && hours < 21) {
        return 'Доброго вечора'
    } else {
        text = 'Доброї ночі'
    }
    return (
        <div className="greetings">
            <p className='greetings-username'>{name}</p>
            <p className="greetings-text">{text}!</p>
        </div>
    )
}

export default Greetings

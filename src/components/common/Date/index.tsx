const CurrentDate = () => {
    const Mouths = [
        "січня", "лютого", "березня", "квітня", "травня", "червня",
        "липня", "серпня", "вересня", "жовтня", "листопада", "грудня"
    ]
    const today = new Date()
    const day = today.getDate()
    const monthName = Mouths[today.getMonth()]
    return (
        <>
            {day} {monthName}
        </>
    )
}

export default CurrentDate

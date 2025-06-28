import './style.css'

const CustomButton = ({ buttonText, onClick } : { buttonText:string, onClick?: React.MouseEventHandler<HTMLButtonElement> }) => {

    return (
        <button className='button-text' onClick={onClick}>{buttonText}</button>
    )
}

export default CustomButton

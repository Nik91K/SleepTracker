import './style.css'

const SubmitButton = ({type, onClick, text}: {type: 'button' | 'submit' | 'reset', onClick?: React.MouseEventHandler<HTMLButtonElement>, text:string}) => {
    return (
        <button className="button" type={type} onClick={onClick}>{text}</button>
    )
}

export default SubmitButton

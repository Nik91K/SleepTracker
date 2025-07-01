import './style.css'

const SubmitButton = ({type, onClick, text, disabled}: {type: 'button' | 'submit' | 'reset', onClick?: React.MouseEventHandler<HTMLButtonElement>, text:string, disabled?:boolean}) => {
    return (
        <button className="button" type={type} onClick={onClick} disabled={disabled}>{text}</button>
    )
}

export default SubmitButton

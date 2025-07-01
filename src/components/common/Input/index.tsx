import './style.css'

const Input = ({type, name, minLength, maxLength, id, title, value, pattern, onChange, disabled} : {type:string, name?:string, minLength?:number, maxLength?:number, id?: string, title: string, value?: string, pattern?: string, onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void, disabled?:boolean}) => {
    return (
      <div className="input-container">
        <input 
          type={type}
          name={name}
          minLength={minLength}
          maxLength={maxLength}
          className="input"
          id={id}
          value={value}
          placeholder=""
          pattern={pattern}
          onChange={onChange}
          disabled={disabled}
        />
        <span className="highlight"></span>
        <span className="bar"></span>
        <label>{title}</label>
      </div>
    )
}

export default Input

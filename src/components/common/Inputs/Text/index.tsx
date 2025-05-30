import './style.css'

const Input = ({type, name, minLength, maxLength, id, title, value} : {type:string, name?:string, minLength?:number, maxLength?:number, id?: string, title: string, value?: string,}) => {
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
        />
        <span className="highlight"></span>
        <span className="bar"></span>
        <label>{title}</label>
      </div>
    )
}

export default Input

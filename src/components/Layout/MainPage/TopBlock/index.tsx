import './style.css'

const TopBlock = ({title, subtitle, description } : {title:string, subtitle:string, description:string}) => {
    return (
        <div className='top-block'>
            <h1 className='top-block-name'>{title}</h1>
            <h2 className='top-block-text'>{subtitle}</h2>
            <p className='paragraph-header'>{description}</p>
        </div>
    )
}

export default TopBlock

import type { ReactNode } from 'react'
import './style.css'

type DataItem = {
  label: string
  value?: ReactNode
  icon?: ReactNode
}

type DataInformationProps = {
  title: string
  items: DataItem[]
}

const DataInformation = ({ title, items }: DataInformationProps) => {
  return (
    <div className='settings-blocks'>
        <div className='settings-blocks-title'>
            <p>{title}</p>
        </div>
        {items.map((item, index) => (
            <div className='settings-blocks-item' key={index}>
                {item.icon && <div className="item-text">{item.icon}{item.label}</div>}
                {item.value && <div className="item-value">{item.value}</div>}
            </div>
        ))}
    </div>
  )
}

export default DataInformation

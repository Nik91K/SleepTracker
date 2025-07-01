import Switch from '@mui/material/Switch';
import './style.css'

const ToggleSwitch = ({ checked, onChange }: { checked: boolean; onChange: (checked: boolean) => void }) => {
  return (
    <div className='toggle-container'>
        <p className='toggle-text'>Увімкнути нагадування</p>
        <Switch
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            className='toggle-switch'
        />
    </div>
  )
}

export default ToggleSwitch

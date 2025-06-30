import './style.css'

const ToggleSwitch = ({ checked, onChange } : { checked:boolean, onChange: (checked: boolean) => void }) => {
    return (
        <div>
            <input type="checkbox" id="checkboxInput" checked={checked} onChange={(e) => onChange(e.target.checked)}/>
            <label htmlFor="checkboxInput" className="toggleSwitch">
            </label>
        </div>
    )
}

export default ToggleSwitch

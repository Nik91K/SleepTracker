import React from 'react'
import { getFormInputValueByName } from '../../../../utils/getInput'
import { createSleepRecord } from '../../../../api/slices/SleepRecord'
import { useAppDispatch, useAppSelector } from '../../../../api/hooks'
import SubmitButton from '../../Buttons/SubmitButton'
import Input from '../../Input'
import './style.css'
import Tooltip from '../../Tooltip'

const SleepRecordForm = () => {
    const dispatch = useAppDispatch()
    const { loading, error } = useAppSelector(state => state.sleepRecord)
    const [ date, setDate ] = React.useState('')
    const [fellAsleepAt, setFellAsleepAt] = React.useState('')
    const [wokeUpAt, setWokeUpAt] = React.useState('')
    const [ tooltip, setError ] = React.useState<{ type: 'success' | 'error'; message: string } | null>(null)
    

    React.useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem('sleepData') || '{}');
        if (savedData.date) setDate(savedData.date);
        if (savedData.fellAsleepAt) setFellAsleepAt(savedData.fellAsleepAt)
        if (savedData.wokeUpAt) setWokeUpAt(savedData.wokeUpAt)
    }, []);
    
    
    const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const date = getFormInputValueByName(event.currentTarget, 'date-track')
        const fellAsleepAt = getFormInputValueByName(event.currentTarget, 'fellAsleepAt')
        const wokeUpAt = getFormInputValueByName(event.currentTarget, 'wokeUpAt')

        if (!date || !fellAsleepAt || !wokeUpAt) {
            setError({type:'error', message:'Будь ласка, заповніть поля.'})
            return
        }

        dispatch(createSleepRecord({ date, fellAsleepAt, wokeUpAt }))
        .unwrap()
        .then(() => {
            setError({type: 'success', message: 'Дані додано'})
            localStorage.setItem('sleepData', JSON.stringify({ date, fellAsleepAt, wokeUpAt }))
        }) .catch((error) => {
            setError({ type: 'error', message: error })
        })
        event.currentTarget.reset()
    }

    return (
        <>
            {tooltip && (
                <Tooltip type={tooltip.type} typeText={tooltip.message} close={() => setError(null)}/>
            )} 
            <form className="modal-form" onSubmit={handleSubmit}>
                <h2>Заповніть дані</h2>
                {loading && <p>Завантаження</p>}
                <Input type="date" name="date-track" title='Дата' value={date} onChange={(e) => setDate(e.target.value)} />
                <Input
                    type="text"
                    title='Коли ви лягли спаси'
                    name="fellAsleepAt"
                    pattern="^([01]\d|2[0-3]):([0-5]\d)$"
                    value={fellAsleepAt}
                    onChange={(e) => setFellAsleepAt(e.target.value)}
                />
                <Input
                    type="text"
                    title='Коли ви прокинулись'
                    name="wokeUpAt"
                    pattern="^([01]\d|2[0-3]):([0-5]\d)$"
                    value={wokeUpAt}
                    onChange={(e) => setWokeUpAt(e.target.value)}
                />
                23:59
                <SubmitButton type='submit' text='Надіслати' />
            </form>
        </>
    )
}

export default SleepRecordForm

import { getFormInputValueByName } from '../../../../utils/getInput'
import { useAppDispatch, useAppSelector } from '../../../../api/hooks'
import Input from '../../Input'
import Tooltip from '../../Tooltip'
import SubmitButton from '../../Buttons/SubmitButton'
import React from 'react'
import { updateNotificationSettings } from '../../../../api/slices/notificationSettings'
import ToggleSwitch from '../../Buttons/ToggleSwitch/index'

const ReminderForm = () => {
    const [tolltip, setError] = React.useState<{ type: 'success' | 'error'; message: string } | null>(null)
    const dispatch = useAppDispatch()
    const [enabled, setEnabled] = React.useState<boolean>(false)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        let time = getFormInputValueByName(event.currentTarget, 'time')
        let method: 'email' = 'email'

        if(!time) {
            setError({ type: 'error', message: 'Незаповнені поля' })
            return
        }

        dispatch(updateNotificationSettings({ enabled, time, method }))
        .unwrap()
        .then(() => {
            setError({type: 'success', message: 'Дані додано'})
        }) .catch((error) => {
            setError({ type: 'error', message: error })
        })
        event.currentTarget.reset()
    }

    return (
        <>
        {tolltip && (
            <Tooltip type={tolltip.type} typeText={tolltip.message} close={() => setError(null)}/>
        )}
        <form action="" onSubmit={handleSubmit}>
            <ToggleSwitch checked={enabled} onChange={setEnabled}/>
            <Input type='text' title='Укажіть час нагадування' name='time' disabled={!enabled}/>
            <SubmitButton type='submit' text='Надіслати' disabled={!enabled}/>
        </form>
        </>
    )
}

export default ReminderForm

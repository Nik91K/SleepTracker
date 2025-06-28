import { getFormInputValueByName } from '../../../../utils/getInput'
import { useAppDispatch, useAppSelector } from '../../../../api/hooks'
import Input from '../../Input'
import Tooltip from '../../Tooltip'
import SubmitButton from '../../Buttons/SubmitButton'
import React from 'react'

const ReminderForm = () => {
    const [tolltip, setError] = React.useState<{ type: 'success' | 'error'; message: string } | null>(null)
    const dispatch = useAppDispatch()
    // const { loading, error } = useAppSelector(state => state.reminder)
    return (
        <>
        {tolltip && (
            <Tooltip type={tolltip.type} typeText={tolltip.message} close={() => setError(null)}/>
        )}
        <form action="">
            <Input type='text' title='Укажіть час нагадування'/>
            <Input type='text' title='Текст для нагадування'/>
        </form>
        </>
    )
}

export default ReminderForm

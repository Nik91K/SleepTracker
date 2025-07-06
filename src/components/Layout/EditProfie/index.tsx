import './style.css'
import Input from '../../common/Input'
import SubmitButton from '../../common/Buttons/SubmitButton'
import Tooltip from '../../common/Tooltip'
import React, { type ReactHTMLElement } from 'react'
import { useAppDispatch, useAppSelector } from '../../../api/hooks'
import { updateUserAvatar } from '../../../api/slices/userSlice'
import { getFormInputValueByName } from '../../../utils/getInput'

const EditProfileModal = () => {
    const [ tooltip, setError ] = React.useState<{ type: 'success' | 'error'; message: string } | null>(null)
    const dispatch = useAppDispatch()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        const avatarFile = formData.get('avatar') as File | null

        if (!avatarFile) {
            console.log('Немає аватарки')
            return
        }

        try {
            await dispatch(updateUserAvatar(avatarFile)).unwrap();
            setError({ type: 'success', message: 'Аватарку оновлено' });
        } catch (error) {
            setError({ type: 'error', message: 'Помилка збереження аватарки' });
        }
    }

    return (
        <form className="edit-profile-form" onSubmit={handleSubmit}>
                <Input type='file' title='Аватар' name='avatar'/>
                <SubmitButton type='submit' text='Зберегти'/>
        </form>
    )
}

export default EditProfileModal

import './LoginPage.css'
import LayoutPage from '../../../layoutPage/layoutPage'
import Input from '../../../components/common/Input'
import Tooltip from '../../../components/common/Tooltip'
import { getFormInputValueByName } from '../../../utils/getInput'
import { useNavigate } from 'react-router'
import React from 'react'
import SubmitButton from '../../../components/common/Buttons/SubmitButton'
import { useAppDispatch } from '../../../api/hooks'
import { loginUser } from '../../../api/slices/authSlice'

const LoginPage = () => {
    const [tooltip, setError] = React.useState<{ type: 'success' | 'error'; message: string } | null>(null)
    const send = useNavigate()

    const dispatch = useAppDispatch()
    const handleSubmit = async (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        let password = getFormInputValueByName(event.currentTarget, 'password')
        let email = getFormInputValueByName(event.currentTarget, 'email')
        const checkEmail = /^[^@]+@[^@]+\.[^@]+$/

        if (!email || !password) {
            setError({type:"error", message: "Заповність всі поля!"})
            return
        }

        if (!email.includes('@') || !email.includes('.')) {
            setError({type:"error", message:'Емаіл повинен містити @ та .'})
            return
        }

        if (!checkEmail.test(email)) {
            setError({type:"error", message:'Емаіл має неправильний формат'})
            return
        }

        if (/\s/.test(email)) {
            setError({type:"error", message:'Емаіл не може мати пробілів'})
            return
        }

        if (password.length < 8) {
            setError({type:"error", message:'Пароль має мати 8 символів'})
            return
        }

        if (!/[a-z]/.test(password)) {
            setError({type:"error", message:'Пароль має мати маленьку літери'})
            return
        }

        if (!/[0-9]/.test(password)) {
            setError({type:"error", message:'Пароль має мати мінімум одну цифру'})
            return
        }

        if (/\s/.test(password)) {
            setError({type:"error", message:'Пароль не може мати пробілів'})
            return
        }

        try {
            await dispatch(loginUser({ email, password })).unwrap()
            send('/sleeptracker')
        } catch(error) {
            setError({ type: "error", message: 'Помилка логіну' })
        }
    }

    return (
        <LayoutPage title='Login'>
            <form className='form' onSubmit={handleSubmit}>
                <Input type='email' name='email' title='Email Address'/>
                <Input type='password' name='password' title='Password' />
                <p>Немає облікового запису? <a href="/register" className='link'>Зареєструйтесь!</a></p>
                <SubmitButton type='submit' text='Надіслати' />
            </form>            
            {tooltip && (
              <Tooltip type={tooltip.type} typeText={tooltip.message} close={() => setError(null)}/>
            )}
        </LayoutPage>
    )
}

export default LoginPage

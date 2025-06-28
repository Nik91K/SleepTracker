import './RegisterPage.css'
import LayoutPage from '../../../layoutPage/layoutPage'
import Input from '../../../components/common/Input'
import Tooltip from '../../../components/common/Tooltip'
import { getFormInputValueByName } from '../../../utils/getInput'
import { useNavigate } from 'react-router'
import React from 'react'
import SubmitButton from '../../../components/common/Buttons/SubmitButton'
import { registerUser } from '../../../api/slices/authSlice'
import { useAppDispatch } from '../../../api/hooks';

const RegisterPage = () => {
    const [tooltip, setError] = React.useState<{ type: 'success' | 'error'; message: string } | null>(null)
    const send = useNavigate()
    const dispatch = useAppDispatch();

    const handleSubmit = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        let name = getFormInputValueByName(event.currentTarget, "name")
        let email = getFormInputValueByName(event.currentTarget, "email")
        let password = getFormInputValueByName(event.currentTarget, "password")
        let theme = localStorage.getItem('theme') || 'Dark'
        const checkEmail = /^[^@]+@[^@]+\.[^@]+$/

        if (!email || !password || !name) {
            setError({type:"error", message: "Заповність всі поля!"})
            return
        }

        if (name.length < 2) {
            setError({type:"error", message:'Ім`я повинно бути більше 2 симовлів'})
            return
        }
        
        if (name.length > 30) {
            setError({type:"error", message:'Ім`я повинно бути менше 30 симовлів'})
            return
        }

        if (!/^[a-zA-Z0-9.]+$/.test(name)) {
            setError({type:"error", message:'Ім`я може мати тільки літери цифри та крапки'})
            return
        }

        if (/^[._]/.test(name)) {
            setError({type:"error", message:'Ім`я не може починатися з . та _'})
            return
        }

        if (/[._]$/.test(name)) {
            setError({type:"error", message:'Ім`я не може закінчуватися . та _'})
            return
        }

        if (email.length < 5) {
            setError({type:"error", message:'Емаіл повинен бути більше 5 символів'})
        } else if (email.length > 30) {
            setError({type:"error", message:'Емаіл повинен бути менше 30 символів'})
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

        dispatch(registerUser({ email, password, name, theme}))
            .unwrap()
        .then(() => {
            localStorage.setItem('UserName',  name);
            localStorage.setItem('UserEmail', email);
            send('/sleeptracker')
        })
        .catch((error) => {
          setError({type:"error", message:"Помилка реєстації"})
        })
    }
    return (
        <LayoutPage title='Register'>
            <form className='form' onSubmit={handleSubmit}>
                <Input type='text' name='name' title='Ім`я'/>
                <Input type='email' name='email' title='Емаіл'/>
                <Input type='password' name='password' title='Пароль'/>
                <SubmitButton type='submit' text='Зареєструватися'/>
                <input type="checkbox" />
            </form>
            {tooltip && (
              <Tooltip type={tooltip.type} typeText={tooltip.message} close={() => setError(null)}/>
            )}
        </LayoutPage>
    )
}

export default RegisterPage

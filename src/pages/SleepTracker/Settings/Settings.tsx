import LayoutPage from '../../../layoutPage/layoutPage'
import ReminderForm from '../../../components/common/Forms/Reminder'
import DataInformation from '../../../components/Layout/SettingsBlocks/SettingsBlocks'
import ModalButton from '../../../components/common/Modal/Open modal'
import { FaUser, FaBell } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { IoMdSettings } from "react-icons/io";
import EditProfileModal from '../../../components/Layout/EditProfie'
import './style.css'

const Settings = () => {
    const name = localStorage.getItem('name') || 'Користувач'
    const email = localStorage.getItem('email') || 'email@example.com'

    const personalInfo = [
        { label: name, icon: <FaUser /> },
        { label: email, icon: <MdEmail /> },
        { label: 'Редагувати профіль', value: <ModalButton buttonName=''><EditProfileModal /></ModalButton>, icon: <IoMdSettings /> }
    ]

    const customization = [
        { label: 'Тема', icon: <IoMdSettings /> },
        { label: 'Сповіщення', value: <ModalButton buttonName='Більше'><ReminderForm /></ModalButton>, icon: <FaBell /> }
    ]

    return (
        <LayoutPage title='Налаштування'>
            <div className="sleep-tracker-header">
                <p>Налаштування</p>
            </div>
            <div className="settings-page">
                <DataInformation title='Персональна інформація' items={personalInfo} />
                <DataInformation title='Кастомізація' items={customization} />
                
            </div>
        </LayoutPage>

    )
}

export default Settings

import LayoutPage from '../../../layoutPage/layoutPage'
import ReminderForm from '../../../components/common/Forms/Reminder'
import DataInformation from '../../../components/Layout/SettingsBlocks/SettingsBlocks'
import ModalButton from '../../../components/common/Modal/Open modal'
import { FaUser, FaBell } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { IoMdSettings } from "react-icons/io";
import EditProfileModal from '../../../components/Layout/EditProfie'
import LogoutButton from '../../../components/common/Buttons/Logout'
import { IoIosLogOut } from "react-icons/io"
import { useAppSelector } from '../../../api/hooks';
import './style.css'

const Settings = () => {
    const name = localStorage.getItem('name') || 'Користувач'
    const email = localStorage.getItem('email') || 'email@example.com'
    const { user } = useAppSelector((state) => state.auth)

    const personalInfo = [
        { label: user?.name || 'Користувач', icon: <FaUser /> },
        { label: user?.email || 'email@example.com', icon: <MdEmail /> },
        { label: 'Редагувати профіль', value: <ModalButton buttonName=''><EditProfileModal /></ModalButton>, icon: <IoMdSettings /> },
        { value: <LogoutButton />}
    ]

    const customization = [
        { label: 'Тема', icon: <IoMdSettings /> },
        { label: 'Сповіщення', value: <ModalButton buttonName='Більше'><ReminderForm /></ModalButton>, icon: <FaBell /> }
    ]

    return (
        <LayoutPage title='Налаштування'>
            <div className="settings-page">
                <DataInformation title='Персональна інформація' items={personalInfo} />
                <DataInformation title='Кастомізація' items={customization} />
                
            </div>
        </LayoutPage>

    )
}

export default Settings

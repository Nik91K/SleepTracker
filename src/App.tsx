import LayoutPage from './layoutPage/layoutPage'
import TopBlock from './components/Layout/MainPage/TopBlock/index'
import MainImage from './assets/main-page-images/original-56917166d4465051909320a17201bec.webp'
import './App.css'

function App() {

  return (
    <LayoutPage title="Головна сторінка">
      <div className="main-page-top-block">
        <img src={MainImage} alt="" className='main-page-img'/>
        <TopBlock title='Sleep Tracker App' subtitle='Wake up fresh' description='Сучасний трекер сну, створений, щоб допомогти вам краще спати'/>
      </div>
    </LayoutPage>
  )
}

export default App

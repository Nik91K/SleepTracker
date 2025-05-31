import './style.css'
import { useEffect } from 'react'
import { RxHamburgerMenu } from "react-icons/rx";

const Sitebar = () => {
    useEffect(() => {
        const hamMenu = document.querySelector(".ham-menu");
        const offScreenMenu = document.querySelector(".off-screen-menu");

        if (hamMenu && offScreenMenu) {
            const toggleMenu = () => {
                hamMenu.classList.toggle("active");
                offScreenMenu.classList.toggle("active");
            };

            hamMenu.addEventListener("click", toggleMenu);

            return () => {
                hamMenu.removeEventListener("click", toggleMenu);
            };
        }
    }, []);



    return (
        <>
            <div className="off-screen-menu">
                <ul>
                    <li><a href="#">home</a></li>
                    <li><a href="#">about</a></li>
                    <li><a href="#">contact</a></li>
                </ul>
            </div>

            <nav>
                <div className="ham-menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </nav>
        </>
    )
}

export default Sitebar

import React from 'react';
import { Link } from 'react-router-dom';
import './SideMenu.css';

class SideMenu extends React.PureComponent {
    render() {
        return (
            <nav class="side-menu">
                <Link to='/feed'>Новости</Link>
                <Link to='/users'>Пользователи</Link>
                <Link to='/'>Сообщения</Link>
                <Link to='/'>Фотографии</Link>
                <Link to='/'>Музыка</Link>
                <Link to='/'>Видео</Link>
                <Link to='/'>Настройки</Link>
            </nav>
        );
    }
}

export default SideMenu;
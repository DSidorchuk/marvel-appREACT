import { useRef } from 'react';
import './appHeader.scss';

const AppHeader = (props) => {

    const linkRefs = useRef([]);

    const onSelectPage = (page, id) => {
        linkRefs.current.forEach(el => {
            el.classList.remove('active')
        })
        linkRefs.current[id].classList.add('active');
        props.selectPage(page);
    }

    return (
        <header className="app__header">
            <h1 className="app__title">
                <a href="#">
                    <span>Marvel</span> information portal
                </a>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li>
                        <a  ref={el => linkRefs.current[0] = el}
                            onClick={() => onSelectPage('Characters', 0)}
                            href="#">Characters</a>
                    </li>
                    /
                    <li>
                        <a  ref={el => linkRefs.current[1] = el}
                            onClick={() => onSelectPage('Comics', 1)}
                            href="#">Comics</a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;
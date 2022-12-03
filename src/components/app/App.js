import {useState} from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import AppBanner from "../appBanner/AppBanner";
import ComicsList from "../comicsList/ComicsList";

import decoration from '../../resources/img/vision.png';

const App = () => {

    const [selectedChar, setChar] = useState(null);
    const [selectedPage, setSelectedPage] = useState('Characters')

    const onCharSelected = (id) => {
        setChar(id);
    }

    const content = () => {
        if (selectedPage === 'Characters') {
            return characters();
        }
        if (selectedPage === 'Comics') {
            return comics();
        }
        
        function characters() {
            return (
                <main>
                    <ErrorBoundary>
                        <RandomChar/>
                    </ErrorBoundary>
                    <div className="char__content">
                        <ErrorBoundary>
                            <CharList onCharSelected={onCharSelected}/>
                        </ErrorBoundary>

                        <ErrorBoundary>
                            <CharInfo charId={selectedChar}/>
                        </ErrorBoundary>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            )
        };
        function comics() {
            return (
                <main>
                    <AppBanner/>
                    <ComicsList/>
                </main>
            )
        }

    }

    return (
        <div className="app">
            <AppHeader selectPage={setSelectedPage}/>
            {content()}
            {/* <main>
                <ErrorBoundary>
                    <RandomChar/>
                </ErrorBoundary>
                <div className="char__content">
                    <ErrorBoundary>
                        <CharList onCharSelected={onCharSelected}/>
                    </ErrorBoundary>

                    <ErrorBoundary>
                        <CharInfo charId={selectedChar}/>
                    </ErrorBoundary>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/>
            </main> */}
        </div>
    )
    

}

export default App;


/*
создать вторую страницу
выводить 8 комиксов
подгружать новые при нажатии кнопки

1. При нажатии на кнопку меняем состояние Арр
2. 
*/

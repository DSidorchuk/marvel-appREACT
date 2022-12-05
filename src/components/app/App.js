import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";
import {ComicsPage, MainPage} from "../pages";


const App = () => {

    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Switch>
                        <Route exact path="/">
                            <MainPage/>
                        </Route>
                        <Route exact path="/comics">
                            <ComicsPage/>
                        </Route>
                    </Switch>
                </main>
            </div>
        </Router>
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

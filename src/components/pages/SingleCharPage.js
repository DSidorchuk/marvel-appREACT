import useMarvelService from "../../services/MarvelService";
import { useState, useEffect } from "react";
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import "./singleCharPage.scss";

const SingleCharPage = ({charName}) => {

    const [char, setChar] = useState(null)
    const {loading, error, getCharacterByName, clearError} = useMarvelService();

    useEffect(() => {
        getCharacterByName(charName)
        .then(char => setChar(char));
    }, [])

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char}/> : null;

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const View = ({char}) => {
    const {name, thumbnail, description} = char;

    return (
        <div className="single-char">
            <img src={thumbnail} alt={name} className="single-char__img"/>
            <div className="single-char__info">
                <h2 className="single-char__title">{name}</h2>
                <div className="single-char__descr">{description}</div>
            </div>
        </div>
    )
}

export default SingleCharPage;
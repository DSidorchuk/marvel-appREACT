import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import { Field, ErrorMessage, Form, Formik, useFormikContext} from 'formik';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import './charSearch.scss';

const CharSearch = () => {

    const [value, setValue] = useState(null);
    const [input, setInput] = useState(null);
    const [char, setChar] = useState(null);
    const {getCharacterByName} = useMarvelService();

    useEffect(() => {
        getCharacterByName(value)
        .then(res => setChar(res));
    }, [value])

    useEffect(() => {
        setValue(null);
    }, [input])

    const result = value ? (char ? <Result charName={char.name}/> : <WrongResult/>) : null;

    return (
        <Formik 
            initialValues={{character: ""}}
            validationSchema={yup.object(
                {character: yup.string()
                                .min(2, "At least two letters")
                                .required("This field is required")})}
            onSubmit={value => setValue(value.character)}>

            <Form className='char__search' 
                  onChange={e => setInput(e.target.value)}>
                <h2 className='char__search-title'>Or find a character by name:</h2>
                <div className='char__search-form'>
                    <Field 
                        className="char__search-input"
                        name="character"
                        type="text"
                        placeholder="Enter name"/>
                    <button className='button button__main'
                            type='submit'>
                        <div className='inner'>find</div>
                    </button>
                </div>
                <ErrorMessage className='char__search-error' 
                                  name="character" 
                                  component="div"/>
                {result}
            </Form>
        </Formik>
    )
}

const Result = ({charName}) => {
    return (
        <div className='char__search-result'>
            <div>{`There is! Visit ${charName} page?`}</div>
            <Link to={`/char/${charName}`}>
                <a href='#' className='button button__secondary'>
                    <div className='inner'>to page</div>
                </a>
            </Link>
        </div>
    )
}

const WrongResult = () => {
    return (
        <h2 className='char__search-error'>The character was not found. Check the name and try again</h2>
    )
}

export default CharSearch;
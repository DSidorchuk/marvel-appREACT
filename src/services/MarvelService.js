import {useHttp} from '../hooks/http.hook';

const useMarvelService = () => {

    const {loading, request, error, clearError} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=ecaa5dcf345cfec636212d7649093a0a';
    const _baseOffset = 210;

    // Getting comics from API and transform it
    const getAllComics  = async (offset = 0) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    }

    const getComics = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0]);
    }

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description || 'There is no description',
            language: comics.textObjects.language || 'en-us',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            pages: comics.pageCount ? `${comics.pageCount} p.` : 'No information about the number of pages',
            price: comics.prices[0].price ? `${comics.prices[0].price}$` : 'NOT AVAILABLE'
        }
    }

    // Getting characters from API and transform data
    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    // Get character by name is using for char search form
    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const _transformCharacter = (char) => {
        let descr = char.description;
        if(!descr) {
            descr = '...Description is preparing at present moment';
        }
        if(descr.length > 209) {
            descr = descr.substr(0, 209) + '...';
        }
        return {
            id: char.id,
            name: char.name,
            description: descr,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    return {loading, error, getAllCharacters, getCharacter, clearError, getAllComics, getComics, getCharacterByName};
}

export default useMarvelService;


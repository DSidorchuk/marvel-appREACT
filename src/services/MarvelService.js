import {useHttp} from '../hooks/http.hook';

const useMarvelService = () => {

    const {loading, request, error, clearError} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=ecaa5dcf345cfec636212d7649093a0a';
    const _baseOffset = 210;
    const _comicsOffset = 10;

    // Getting comics from API and transform it
    const getAllComics  = async (offset = _comicsOffset) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComic);
    }

    const _transformComic = (comic) => {
        const price = comic.prices[0].price ? comic.prices[0].price + ' $' : 'NOT AVAILABLE';
        return {
            id: comic.id,
            title: comic.title,
            description: comic.description,
            language: comic.textObjects.language,
            thumbnail: comic.thumbnail.path + '.' + comic.thumbnail.extension,
            pages: comic.pageCount,
            price: price
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

    return {loading, error, getAllCharacters, getCharacter, clearError, getAllComics};
}

export default useMarvelService;


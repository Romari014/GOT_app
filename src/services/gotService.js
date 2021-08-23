export default class GotService {
    constructor() { //API base
        this._apiBase = 'https://www.anapioficeandfire.com/api'
    }

    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`);
        if (!res.ok) {
            throw new Error(`could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    };
    async getAllCharacters() {
        const res = await this.getResource('/characters?page=5&pageSize=10');//?page=5 обращаемся к 5й странице
        return res.map(this._transformCharacter)                       // так как не все персонажи доступны
    }                                                               //&pageSize=10 получаем 10 персонажей

    async getCharacter(id) {
        const char = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(char);
    }

    getAllHouses() {
        return this.getResource(`/houses/`)
    }

    getHouse(id) {
        return this.getResource(`/houses/${id}`)
    }

    getAllBooks() {
        return this.getResource(`/books/`)
    }

    getBook(id) {
        return this.getResource(`/houses/${id}`)
    }


    _transformCharacter(character) {
        return {
            name: character.name,
            gender: character.gender,
            born: character.born,
            died: character.died,
            culture: character.culture
        }
    }


    _transformHouse(house) {
        return {
            name: house.name,
            region: house.region,
            words: house.words,
            titles: house.titles,
            overlord: house.overlord,
            ancestralWeapons: house.ancestralWeapons
        }
    }


    _transformBook(book) {
        return {
            name: book.name,
            numberOfPages: book.numberOfPages,
            publisher: book.publisher,
            released: book.released
        }
    }
}

// const got = new GotServise();
// got.getAllCharacters()
//     .then(res => {
//         res.forEach(item => console.log(item.name));
//     });

// got.getCharacter(130)
//     .then(res => console.log(res));
// got.getHouses()
//     .then(res => console.log(res));


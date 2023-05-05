


/**
 * @param {object} data
 * @param {string} data.display_name
 * @param {string} data.list_name
 * @param {string} data.list_name_encoded
 * @param {string} data.newest_published_date
 * @param {string} data.oldest_published_date
 * @param {string} data.updated.
 */

const mapListToCard = (data) => ({
    title: data.display_name,
    info1: data.newest_published_date,
    info2: data.oldest_published_date,
    info3: data.updated,
    ...data,
})


/**
 * @param {object} data
 * @param {string} data.title
 * @param {string} data.weeks_on_list
 * @param {string} data.author
 * @param {string} data.price
 */

const mapBookToCard = (data) => ({
    title: data.title,
    info1: data.author,
    info2: data.price,
    info3: data.weeks_on_list,
})

/**
* LocalStorage Logic
*/
const NY_BOOKS_LIST_KEY = 'nyBooksLists'
const MY_API_KEY = 'MykMkubQ8h19XVHSwhUYebTYlwI4YGyH';


const getNyList = () => {
    const res = window.localStorage.getItem(NY_BOOKS_LIST_KEY);
    return res ? JSON.parse(res) : []
}

const setNyList =  (booksList) => {
     window.localStorage.setItem(NY_BOOKS_LIST_KEY, JSON.stringify(booksList));
}

/**
 * DOM
 */

const containerDivElement = document.querySelector('.container')
const booksDivElement = document.querySelector('.books')
// const spinnerDivElement = document.querySelector('.spinner')

/**
 * @param {string} text
 */
const createInfoElement = (text) => {
    const newInfoElement = document.createElement('p')
    newInfoElement.setAttribute('class', 'info')
    newInfoElement.innerText = text

    return newInfoElement
}

/**
 * @param {object} data
 * @param {string} data.title
 * @param {string} data.info1
 * @param {string} data.info2
 * @param {string} data.info3
 * @param {string} data.list_name_encoded
 * @param {boolean} isDetails
 */

const createCardElement = (data, isDetails = false) => {
    const newCardElement = document.createElement('div')
    newCardElement.setAttribute('class', 'card')

    const newTitleElement = document.createElement('p')
    newTitleElement.setAttribute('class', 'title')
    newTitleElement.innerText = data.title

    const newCardContentElement = document.createElement('div')
    newCardContentElement.setAttribute('class', 'cardContent')

    const newestPublishedDate = createInfoElement(data.info1)
    const oldestPublishedDate = createInfoElement(data.info2)
    const updated = createInfoElement(data.info3)

    newCardContentElement.append(newestPublishedDate, oldestPublishedDate, updated)

    const newButtonElement = document.createElement('button');
    newButtonElement.innerText = 'Books';
    newButtonElement.setAttribute('class', 'btn');

    newButtonElement.onclick = async () => {
        await getListDetails(data.list_name_encoded)
    }

    newCardContentElement.appendChild(newButtonElement)


    newCardElement.append(newTitleElement, newCardContentElement)


    if (!isDetails) {
        containerDivElement.appendChild(newCardElement)
    } else {
        booksDivElement.appendChild(newCardElement)
    }

}

/**
 * @param {string} listName
 * @return {Promise<void>}
 */

async function getListDetails(listName) {
    const res = await fetch(`https://api.nytimes.com/svc/books/v3/lists/current/${listName}.json?api-key=MykMkubQ8h19XVHSwhUYebTYlwI4YGyH`)
    const data = await res.json()
    const books = data.results.books
    booksDivElement.setAttribute('class', 'books')
    containerDivElement.setAttribute('class', 'disabled')
    for (const book of books) {
        createCardElement(mapBookToCard(book), true)
    }
}


async function startApp() {
    let booksList = getNyList();

    if (!booksList || booksList.length <= 0) {
        console.log("ESTOY LLAMANDO A LA API")
        const res = await fetch('https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=MykMkubQ8h19XVHSwhUYebTYlwI4YGyH');
        const data = await res.json()
        booksList = data.results
        setNyList(booksList)
    }
    for (const list of booksList) {
        createCardElement(mapListToCard(list))
    }

    containerDivElement.setAttribute('class', 'container')
    // spinnerDivElement.setAttribute('class', 'disabled')

}

startApp()


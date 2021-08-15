const btnAddBook = document.getElementById('addBook')
const formBook = document.getElementById('formBook')
const idBook = document.querySelector('input[type=hidden]')
const titleBook = document.getElementById('title')
const authorBook = document.getElementById('author')
const yearBook = document.getElementById('year')
const isFinishedReadingBook = document.getElementById('isFinishedReading')
const btnSaveBook = document.getElementById('saveBook')
const unfinishedReadingEl = document.getElementById('boxUnfinishedReading')
const finishedReadingEl = document.getElementById('boxFinishedReading')
const formSearch = document.getElementById('formSearch')
const searchBook = document.querySelector('#formSearch input')

const localStorageKey = 'books'
let books = JSON.parse(localStorage.getItem(localStorageKey)) || []

getDatas()

btnAddBook.addEventListener('click', toggleAddBook)
yearBook.addEventListener('keyup', filterYear)

formBook.addEventListener('submit', function (ev) {
    ev.preventDefault()
    if (validate()) {
        if (idBook.value == '') {
            addBook()
        } else {
            updateBook(idBook.value)
        }
        getDatas()
        clearForm()
    }
})

formSearch.addEventListener('submit', function (ev) {
    ev.preventDefault()
    search()
})

function getDatas() {
    finishedReadingEl.innerHTML = ''
    unfinishedReadingEl.innerHTML = ''
    
    if (books.length > 0) {
        for (const item in books) {
            const elementDiv = document.createElement('div')
            const elementDivFirstChild = document.createElement('div')
            const elementDivSecondChild = document.createElement('div')
            const elementForTitle = document.createElement('h4')
            const elementForAuthor = document.createElement('p')
            const elementForYear = document.createElement('p')
            const elementForBtnEdit = document.createElement('span')
            const elementForBtnDelete = document.createElement('span')
    
            elementForTitle.innerText = books[item].title
            elementDivFirstChild.appendChild(elementForTitle)
    
            elementForAuthor.innerText = `Author: ${books[item].author}`
            elementDivFirstChild.appendChild(elementForAuthor)
    
            elementForYear.innerText = `Year: ${books[item].year}`
            elementDivFirstChild.appendChild(elementForYear)

            elementDiv.appendChild(elementDivFirstChild)
            elementDiv.classList.add('item-book')

            elementForBtnEdit.innerHTML = '<i class="fas fa-edit"></i>'
            elementForBtnEdit.classList.add('btn-edit')
            elementDivSecondChild.appendChild(elementForBtnEdit)

            elementForBtnDelete.innerHTML = '<i class="fas fa-trash-alt"></i>'
            elementForBtnDelete.classList.add('btn-delete')
            elementDivSecondChild.appendChild(elementForBtnDelete)

            elementDiv.appendChild(elementDivSecondChild)
            
            elementForBtnEdit.addEventListener('click', function () {
                editBook(books[item].id)                
            })

            elementForBtnDelete.addEventListener('click', function () {
                deleteBook(books[item].id)                
            })
    
            if (books[item].isCompleted) {
                elementDiv.style.borderLeft = '5px solid green'
                finishedReadingEl.appendChild(elementDiv)
            } else {
                elementDiv.style.borderLeft = '5px solid red'
                unfinishedReadingEl.appendChild(elementDiv)
            }
        }
    }
}

function validate() {
    document.querySelectorAll('error-message').innerHTML = ''
    if (titleBook.value.trim().length == 0) {
        titleBook.nextElementSibling.innerText = "Title can't be blank"
        return false
    }
    titleBook.nextElementSibling.innerText = ''
    titleBook.value = titleBook.value 

    if (authorBook.value.trim().length == 0) {
        authorBook.nextElementSibling.innerText = "Author can't be blank"
        return false
    }
    authorBook.nextElementSibling.innerText = ''
    authorBook.value = authorBook.value

    if (yearBook.value.trim().length == 0) {
        yearBook.nextElementSibling.innerText = "Year can't be blank"
        return false
    }
    yearBook.nextElementSibling.innerText = ''
    yearBook.value = yearBook.value
    return true
}

function addBook() {
    const book = {
        id: Date.now(),
        title: titleBook.value,
        author: authorBook.value,
        year: parseInt(yearBook.value),
        isCompleted: isFinishedReadingBook.checked ? true : false
    }
    
    books.push(book)
    localStorage.setItem('books', JSON.stringify(books))
}

function editBook(id) {
    const filtered = books.filter(item => item.id == id)
    idBook.value = id
    titleBook.value = filtered[0].title
    authorBook.value = filtered[0].author
    yearBook.value = filtered[0].year
    isFinishedReadingBook.checked = filtered[0].isCompleted ? true : false
    if (formBook.classList.contains('hidden')) {
        toggleAddBook()
    }
}

function updateBook(id) {
    const index = books.findIndex(item => item.id == id)
    books[index].title = titleBook.value
    books[index].author = authorBook.value
    books[index].year = parseInt(yearBook.value)
    books[index].isCompleted = isFinishedReadingBook.checked ? true : false
    localStorage.setItem('books', JSON.stringify(books))
}

function deleteBook(id) {
    const dialog = confirm('Are you sure for delete this book ?')
    if (dialog) {
        books = books.filter(item => item.id !== id)
        localStorage.setItem('books', JSON.stringify(books))
        getDatas()
    }
}

function search() {
    const keyword = searchBook.value
    let filter = []

    finishedReadingEl.innerHTML = ''
    unfinishedReadingEl.innerHTML = ''
    filter = books.filter(element => element.title.includes(keyword))
    
    if (filter.length > 0) {
        for (const item in filter) {
            const elementDiv = document.createElement('div')
            const elementDivFirstChild = document.createElement('div')
            const elementDivSecondChild = document.createElement('div')
            const elementForTitle = document.createElement('h4')
            const elementForAuthor = document.createElement('p')
            const elementForYear = document.createElement('p')
            const elementForBtnEdit = document.createElement('span')
            const elementForBtnDelete = document.createElement('span')
    
            elementForTitle.innerText = filter[item].title
            elementDivFirstChild.appendChild(elementForTitle)
    
            elementForAuthor.innerText = `Author: ${filter[item].author}`
            elementDivFirstChild.appendChild(elementForAuthor)
    
            elementForYear.innerText = `Year: ${filter[item].year}`
            elementDivFirstChild.appendChild(elementForYear)

            elementDiv.appendChild(elementDivFirstChild)
            elementDiv.classList.add('item-book')

            elementForBtnEdit.innerHTML = '<i class="fas fa-edit"></i>'
            elementForBtnEdit.classList.add('btn-edit')
            elementDivSecondChild.appendChild(elementForBtnEdit)

            elementForBtnDelete.innerHTML = '<i class="fas fa-trash-alt"></i>'
            elementForBtnDelete.classList.add('btn-delete')
            elementDivSecondChild.appendChild(elementForBtnDelete)

            elementDiv.appendChild(elementDivSecondChild)
            
            elementForBtnEdit.addEventListener('click', function () {
                editBook(filter[item].id)                
            })

            elementForBtnDelete.addEventListener('click', function () {
                deleteBook(filter[item].id)                
            })
    
            if (filter[item].isCompleted) {
                elementDiv.style.borderLeft = '5px solid green'
                finishedReadingEl.appendChild(elementDiv)
            } else {
                elementDiv.style.borderLeft = '5px solid red'
                unfinishedReadingEl.appendChild(elementDiv)
            }
        }
    }
}

function filterYear() {
    const yearToStr = yearBook.value.toString()
    const result = yearToStr.length > 4 ? parseInt(yearToStr.slice(0, yearToStr.length - 1)) : parseInt(yearToStr)
    yearBook.value = result
}

function clearForm() {
    titleBook.value = ''
    authorBook.value = ''
    yearBook.value = ''
    isFinishedReadingBook.checked = false
}

function toggleAddBook() {
    if (formBook.classList.contains('hidden')) {
        btnAddBook.innerText = 'Close'
        btnAddBook.style.backgroundColor = 'red'
        formBook.classList.remove('hidden')
    } else {
        btnAddBook.innerText = 'Add Book'
        btnAddBook.style.backgroundColor = '#171717'
        formBook.classList.add('hidden')
        clearForm()
        document.querySelectorAll('.error-message').forEach(element => element.innerText = '')
    }
}
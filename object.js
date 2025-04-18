const library = [];

const container = document.querySelector(".inner-container");
const form = document.querySelector(".form-container");
const addBookButton = document.querySelector("#submit-button");
const formButton = document.querySelector(".submit-button");
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();

  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${
      this.read ? "already read" : "not read yet"
    }.`;
  };
}

function addBookToLibrary(title, author, pages, read, array = library) {
  const book = new Book(title, author, pages, read);
  array.push(book);
}

function displayLibrary(library) {
  for (let item of library) {
    // console.log(item.info());
    const bookCard = document.createElement("div");
    const title = document.createElement("p");
    const author = document.createElement("p");
    const read = document.createElement("p");
    const pages = document.createElement("p");
    const removeButton = document.createElement("button");
    removeButton.classList.add("remove-button");
    removeButton.textContent = "Remove";
    const readButton = document.createElement("button");
    readButton.classList.add("read-button");
    readButton.textContent = "Toggle Read Status";
    bookCard.classList.add("book");
    bookCard.setAttribute("data-id", item.id);
    title.textContent = item.title;
    author.textContent = item.author;
    read.textContent = item.read ? "Already read" : "Not read yet";
    pages.textContent = `${item.pages} pages`;
    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(pages);
    bookCard.appendChild(read);
    bookCard.appendChild(removeButton);
    bookCard.appendChild(readButton);
    container.appendChild(bookCard);
  }
  const removeButtons = document.querySelectorAll(".remove-button");
  const readButtons = document.querySelectorAll(".read-button");

  readButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const bookId = e.target.parentElement.getAttribute("data-id");
      const bookIndex = library.findIndex((book) => book.id === bookId);
      if (bookIndex !== -1) {
        library[bookIndex].read = !library[bookIndex].read;
        container.replaceChildren();
        displayLibrary(library);
      }
    });
  });
  removeButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const bookId = e.target.parentElement.getAttribute("data-id");
      const bookIndex = library.findIndex((book) => book.id === bookId);
      if (bookIndex !== -1) {
        library.splice(bookIndex, 1);
        container.replaceChildren();
        displayLibrary(library);
      }
    });
  });
}
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary("The Hobbit part 2", "J.R.R. Tolkien", 295, false);
addBookToLibrary("The Hobbit part 3", "J.R.R. Tolkien", 295, false);

displayLibrary(library);

formButton.addEventListener("click", (e) => {
  form.style.display = "block";
});

addBookButton.addEventListener("click", (e) => {
  e.preventDefault();
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const read = document.querySelector("#read").checked;
  addBookToLibrary(title, author, pages, read);
  container.replaceChildren();
  displayLibrary(library);
  form.style.display = "none";
  form.reset();
});

const bookList = document.getElementById("bookList");

const searchInput = document.getElementById("searchInput");

const categoryFilter =
    document.getElementById("categoryFilter");

const memberName =
    document.getElementById("memberName");

const message =
    document.getElementById("message");

const totalBooks =
    document.getElementById("totalBooks");

const availableBooks =
    document.getElementById("availableBooks");

const issuedBooks =
    document.getElementById("issuedBooks");

const resetButton =
    document.getElementById("resetButton");


let books = [

    {
        id: 1,
        title: "Python Programming",
        author: "John Smith",
        category: "Programming",
        status: "Available",
        member: ""
    },

    {
        id: 2,
        title: "Java Programming",
        author: "Robert Brown",
        category: "Programming",
        status: "Available",
        member: ""
    },

    {
        id: 3,
        title: "HTML & CSS",
        author: "David Lee",
        category: "Web Development",
        status: "Available",
        member: ""
    },

    {
        id: 4,
        title: "JavaScript Basics",
        author: "James Wilson",
        category: "Web Development",
        status: "Issued",
        member: "Rahul"
    },

    {
        id: 5,
        title: "React JS",
        author: "Michael Clark",
        category: "Web Development",
        status: "Available",
        member: ""
    },

    {
        id: 6,
        title: "MySQL Database",
        author: "Sarah Miller",
        category: "Database",
        status: "Available",
        member: ""
    },

    {
        id: 7,
        title: "SQL Fundamentals",
        author: "Daniel White",
        category: "Database",
        status: "Issued",
        member: "Priya"
    },

    {
        id: 8,
        title: "Node.js Guide",
        author: "William Taylor",
        category: "Programming",
        status: "Available",
        member: ""
    }

];


// Display books

function displayBooks() {

    const searchText =
        searchInput.value.toLowerCase();

    const selectedCategory =
        categoryFilter.value;


    bookList.innerHTML = "";


    const filteredBooks = books.filter(book => {

        const matchesSearch =
            book.title.toLowerCase()
            .includes(searchText);

        const matchesCategory =
            selectedCategory === "All" ||
            book.category === selectedCategory;

        return matchesSearch && matchesCategory;

    });


    if (filteredBooks.length === 0) {

        bookList.innerHTML =
            "<p>No books found.</p>";

        return;
    }


    filteredBooks.forEach(book => {

        const card =
            document.createElement("div");

        card.className = "book-card";


        let button = "";


        if (book.status === "Available") {

            button = `
                <button
                    class="issue-btn"
                    onclick="issueBook(${book.id})">
                    📚 Issue Book
                </button>
            `;

        } else {

            button = `
                <button
                    class="return-btn"
                    onclick="returnBook(${book.id})">
                    ↩️ Return Book
                </button>
            `;

        }


        card.innerHTML = `

            <h2>📖 ${book.title}</h2>

            <p>
                <strong>Author:</strong>
                ${book.author}
            </p>

            <p>
                <strong>Category:</strong>
                ${book.category}
            </p>

            <p>
                <strong>Status:</strong>
                ${
                    book.status === "Available"
                    ? "🟢 Available"
                    : "🔴 Issued"
                }
            </p>

            ${
                book.status === "Issued"
                ? `<p>
                    <strong>Member:</strong>
                    ${book.member}
                   </p>`
                : ""
            }

            ${button}

        `;


        bookList.appendChild(card);

    });

}


// Issue book

function issueBook(id) {

    const name =
        memberName.value.trim();


    if (name === "") {

        message.textContent =
            "⚠️ Please enter member name.";

        return;
    }


    const book =
        books.find(book => book.id === id);


    if (book.status === "Available") {

        book.status = "Issued";

        book.member = name;


        message.textContent =
            "✅ Book issued successfully.";

        memberName.value = "";

        displayBooks();

        updateStatistics();

    }

}


// Return book

function returnBook(id) {

    const book =
        books.find(book => book.id === id);


    if (book) {

        book.status = "Available";

        book.member = "";


        message.textContent =
            "✅ Book returned successfully.";

        displayBooks();

        updateStatistics();

    }

}


// Statistics

function updateStatistics() {

    const total = books.length;

    const available =
        books.filter(
            book => book.status === "Available"
        ).length;

    const issued =
        books.filter(
            book => book.status === "Issued"
        ).length;


    totalBooks.textContent = total;

    availableBooks.textContent = available;

    issuedBooks.textContent = issued;

}


// Search

searchInput.addEventListener(
    "input",
    displayBooks
);


// Category filter

categoryFilter.addEventListener(
    "change",
    displayBooks
);


// Reset library

resetButton.addEventListener("click", () => {

    books.forEach(book => {

        book.status = "Available";

        book.member = "";

    });


    memberName.value = "";

    message.textContent =
        "🔄 Library has been reset.";

    displayBooks();

    updateStatistics();

});


// Initial display

displayBooks();

updateStatistics();
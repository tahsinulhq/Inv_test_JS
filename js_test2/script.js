// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get references to DOM elements
    const addBookBtn = document.getElementById('add-book-btn');
    const booksContainer = document.getElementById('books-container');
    
    // Add event listener to the "Add Book" button
    addBookBtn.addEventListener('click', addNewBook);
    
    // Function to add a new book
    function addNewBook() {
        // Prompt user for book details
        const title = prompt('Enter the book title:');
        
        // Validate title input
        if (!title) {
            alert('Book title is required!');
            return;
        }
        
        const author = prompt('Enter the author name:');
        
        // Validate author input
        if (!author) {
            alert('Author name is required!');
            return;
        }
        
        const description = prompt('Enter a short description:');
        
        // Validate description input
        if (!description) {
            alert('Book description is required!');
            return;
        }
        
        // Create a new book card
        createBookCard(title, author, description);
    }
    
    // Function to create a book card element
    function createBookCard(title, author, description) {
        // Create article element for the book card
        const bookCard = document.createElement('article');
        bookCard.className = 'book-card';
        
        // Create title element
        const titleElement = document.createElement('h3');
        titleElement.className = 'book-title';
        titleElement.textContent = title;
        
        // Create author element
        const authorElement = document.createElement('p');
        authorElement.className = 'book-author';
        authorElement.textContent = `By: ${author}`;
        
        // Create description element
        const descriptionElement = document.createElement('p');
        descriptionElement.className = 'book-description';
        descriptionElement.textContent = description;
        
        // Append elements to the book card
        bookCard.appendChild(titleElement);
        bookCard.appendChild(authorElement);
        bookCard.appendChild(descriptionElement);
        
        // Add the new book card to the beginning of the books container
        booksContainer.insertBefore(bookCard, booksContainer.firstChild);
        
        // Add a subtle animation to highlight the new book
        setTimeout(() => {
            bookCard.style.backgroundColor = '#f0f8ff'; // Light blue highlight
            setTimeout(() => {
                bookCard.style.backgroundColor = ''; // Return to normal
                bookCard.style.transition = 'background-color 1s ease';
            }, 300);
        }, 10);
    }
});
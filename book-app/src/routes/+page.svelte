<script>
    import { onMount } from 'svelte';

    /**
     * @typedef {object} Book
     * @property {number} id
     * @property {string} title
     * @property {string} author
     */

    /** @type {Book[]} */
    let books = [];
    let loading = true;
    let error = null;

    let newBookTitle = '';
    let newBookAuthor = '';
    let filterText = '';

    // State for dark mode: true if dark, false if light
    let isDarkMode = false;

    /** @type {Book[]} */
    $: filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(filterText.toLowerCase())
    );

    /**
     * Toggles the dark mode on/off.
     */
    function toggleTheme() {
        isDarkMode = !isDarkMode;
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        applyThemeClass();
    }

    /**
     * Applies the 'dark' class to the <html> element based on isDarkMode.
     */
    function applyThemeClass() {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }

    async function fetchBooks() {
        loading = true;
        error = null;
        try {
            const response = await fetch('/api/books');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            /** @type {Book[]} */
            const data = await response.json();
            books = data;
        } catch (e) {
            error = "Failed to load books. Please try again.";
            console.error("Error fetching books:", e);
        } finally {
            loading = false;
        }
    }

    async function addBook() {
        if (!newBookTitle || !newBookAuthor) {
            alert('Please enter both title and author.');
            return;
        }

        try {
            const response = await fetch('/api/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: newBookTitle, author: newBookAuthor })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }

            /** @type {Book} */
            const addedBook = await response.json();
            books = [...books, addedBook];
            newBookTitle = '';
            newBookAuthor = '';
        } catch (e) {
            error = `Failed to add book: ${e.message}`;
            console.error("Error adding book:", e);
        }
    }

    onMount(() => {
        // Check local storage for saved theme preference
        const savedTheme = localStorage.getItem('theme');

        if (savedTheme === 'dark') {
            isDarkMode = true;
        } else if (savedTheme === 'light') {
            isDarkMode = false;
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            // If no preference saved, check system preference
            isDarkMode = true;
        } else {
            isDarkMode = false;
        }
        applyThemeClass(); // Apply the theme class on mount

        // Fetch books after theme is applied
        fetchBooks();
    });
</script>

<div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">

    <header class="bg-white dark:bg-gray-800 shadow-md py-6 px-4 sm:px-6 lg:px-8">
        <div class="container mx-auto max-w-4xl flex justify-between items-center">
            <h1 class="text-4xl font-extrabold text-blue-700 dark:text-blue-400">
                📚 Book Shelf
            </h1>
            <button
                on:click={toggleTheme}
                class="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg shadow hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 flex items-center space-x-2"
                aria-label="Toggle dark mode"
            >
                {#if isDarkMode}
                    <span>☀️ Light Mode</span>
                {:else}
                    <span>🌙 Dark Mode</span>
                {/if}
            </button>
        </div>
    </header>

    <main class="container mx-auto p-4 max-w-4xl py-8">

        <section class="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 mb-8 border border-gray-200 dark:border-gray-700 transform transition-transform duration-300 hover:scale-[1.01]">
            <h2 class="text-3xl font-bold mb-6 text-gray-800 dark:text-white border-b pb-4 border-blue-200 dark:border-blue-700">Add New Book</h2>
            <form on:submit|preventDefault={addBook} class="space-y-6">
                <div>
                    <label for="title" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Book Title</label>
                    <input
                        type="text"
                        id="title"
                        bind:value={newBookTitle}
                        placeholder="e.g., The Hitchhiker's Guide to the Galaxy"
                        class="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-base bg-gray-50 dark:bg-gray-700 dark:text-white"
                    />
                </div>
                <div>
                    <label for="author" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Author Name</label>
                    <input
                        type="text"
                        id="author"
                        bind:value={newBookAuthor}
                        placeholder="e.g., Douglas Adams"
                        class="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-base bg-gray-50 dark:bg-gray-700 dark:text-white"
                    />
                </div>
                <button
                    type="submit"
                    class="w-full inline-flex justify-center py-3 px-6 border border-transparent shadow-lg text-lg font-bold rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-700 dark:hover:bg-blue-800 transition-colors duration-200 transform hover:-translate-y-0.5"
                >
                    Add Book to Shelf
                </button>
            </form>
        </section>

        <section class="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 mb-8 border border-gray-200 dark:border-gray-700 transform transition-transform duration-300 hover:scale-[1.01]">
            <h2 class="text-3xl font-bold mb-6 text-gray-800 dark:text-white border-b pb-4 border-indigo-200 dark:border-indigo-700">Filter Books</h2>
            <input
                type="text"
                bind:value={filterText}
                placeholder="Search by title..."
                class="block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-base bg-gray-50 dark:bg-gray-700 dark:text-white"
            />
        </section>

        <section>
            <h2 class="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Your Books</h2>

            {#if loading}
                <p class="text-center text-blue-600 dark:text-blue-400 text-xl py-8">
                    <span class="animate-pulse">Loading books...</span>
                </p>
            {:else if error}
                <p class="text-center text-red-600 dark:text-red-400 text-xl py-8">{error}</p>
            {:else if filteredBooks.length === 0 && books.length > 0 && filterText}
                <p class="text-center text-gray-600 dark:text-gray-400 text-xl py-8">
                    No books match your current filter. Try a different search!
                </p>
            {:else if filteredBooks.length === 0}
                <p class="text-center text-gray-600 dark:text-gray-400 text-xl py-8">
                    Your shelf is empty! Start by adding your first book above.
                </p>
            {:else}
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {#each filteredBooks as book (book.id)}
                        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transform hover:scale-[1.02] hover:shadow-xl transition duration-300 ease-in-out">
                            <div class="p-6">
                                <h3 class="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">{book.title}</h3>
                                <p class="text-blue-600 dark:text-blue-300 text-lg font-medium">by {book.author}</p>
                            </div>
                        </div>
                    {/each}
                </div>
            {/if}
        </section>
    </main>
</div>

<style>
    /* No custom styles needed, Tailwind handles it all */
</style>
# SvelteKit Book App

This is a tiny SvelteKit application that demonstrates providing and consuming its own API for managing a list of books.

## Features

* **API (`/api/books`):**
    * `GET`: Returns a list of books.
    * `POST`: Adds a new book to the list.
* **Front-End:**
    * Displays books in a card-like layout.
    * Form to add new books (title, author).
    * Real-time filtering of books by title.
    * Loading and empty state messages.
* **Styling & UX:**
    * Styled with Tailwind CSS for a modern and responsive design.
    * Includes a functional **Dark Mode toggle** with preference persistence using local storage.

---

## How to Run This Project

Follow these steps to set up and run the SvelteKit Book App locally on your machine.

1.  **Clone the Repository:**
    First, clone this GitHub repository to your local machine:
    ```bash
    git clone [<your-github-repo-url](https://github.com/MarivoneAraujo/zaazSvelteKit.git)
    cd sveltekit-books-app # Or whatever your project's root folder is named
    ```

2.  **Install Dependencies:**
    Navigate into the project directory (e.g., `cd book-app` if your project is nested within `zaazSvelteKit/book-app/` as per our previous discussion) and install all the necessary Node.js packages:
    ```bash
    # Make sure you are in the directory containing package.json
    npm install
    ```

3.  **Start the Development Server:**
    Once the dependencies are installed, you can start the SvelteKit development server:
    ```bash
    npm run dev
    ```

    The application will typically be accessible at `http://localhost:5173/` in your web browser. The terminal will provide the exact URL.

---

## Time Spent

This project was time-boxed to **120 minutes**, but included additional time for troubleshooting.

* **Phase 1: Project Setup & API (~45 minutes)**
    * SvelteKit initialization with Tailwind CSS.
    * Created `/src/routes/api/books/+server.js` for GET and POST endpoints.
* **Phase 2: Front-End Development (~60 minutes)**
    * Implemented `/src/routes/+page.svelte` for book listing, add form, and filter.
    * Applied Tailwind CSS for styling and responsive design.
* **Phase 3: Wrap-up & Deliverables (~15 minutes)**
    * Testing and initial debugging (e.g., input binding).
    * GitHub repository setup and README creation.
* **Troubleshooting & Stretch Goal Implementation (~Additional 30-45 minutes)**
    * Resolved issues with real-time filtering.
    * Fixed incorrect form input binding.
    * Implemented **Dark Mode toggle functionality**, including `localStorage` persistence.
    * **Extensive troubleshooting of Tailwind CSS integration** (incorrect `tailwind.config.js` location, `darkMode` setting, and core Tailwind/PostCSS setup), which was crucial to enabling dark mode.

## Decisions Made

* **In-Memory API:** For simplicity within the timebox, the API uses a module-scoped array to store books. This means data will reset when the server restarts. For a production app, a database would be used.
* **Svelte Reactive Declarations:** Utilized Svelte's `$` syntax for `filteredBooks` to ensure efficient real-time filtering based on `books` and `filterText`.
* **Tailwind CSS:** Chosen for rapid UI development, responsive design, and easy dark mode implementation.
* **Dark Mode (Stretch Goal Achieved):** Implemented a user-toggleable dark mode with preference persistence using `localStorage`. This required configuring Tailwind's `darkMode` to `'class'` and correctly setting up the `dark` class on the `<html>` element.
* **Error Handling:** Basic error handling is implemented for API calls on the client-side.
* **Loader & Empty States:** Provided a better user experience by indicating when data is loading or when no books are present/match the filter.
* **Layout & Aesthetics:** Focused on a clean, modern, and visually pleasing layout using Tailwind's utility classes.

## Next Steps (If I had more time)

* **Persistence:** Integrate a simple file-based database (e.g., SQLite with `better-sqlite3` on the server) to persist book data across server restarts.
* **Delete/Edit Functionality:** Add buttons to remove or modify existing books via the API.
* **Form Validation:** Implement more robust client-side form validation (e.g., required fields, minimum length).
* **Accessibility:** Improve ARIA attributes and keyboard navigation.
* **Component Structure:** Break down `+page.svelte` into smaller, reusable Svelte components (e.g., `BookCard.svelte`, `AddBookForm.svelte`, `FilterInput.svelte`).

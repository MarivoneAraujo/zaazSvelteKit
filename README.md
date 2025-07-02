## Time Spent

This project was time-boxed to **120 minutes**

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

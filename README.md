# Pokémon Explorer

Pokémon Explorer is a web application built with **Next.js** and **TypeScript** that consumes the **PokeAPI** to display a list of Pokémon with filters, Pokémon details, and a personalized Pokedex. The app also uses **Tailwind CSS** for styling and **ShadCN UI** for elegant UI components. Global state management is handled with **Context API**.

## Features

- **Pokémon List with Filters:** Users can browse a list of Pokémon with pagination and filters.
- **Pokémon Details:** Each Pokémon has a detail page where it can be marked as "seen" or "captured".
- **Personalized Pokedex:** Pokémon marked as "seen" or "captured" appear on a personalized page called "My Pokémon".
- **Pagination:** Easily navigate between pages of Pokémon using the pagination provided by PokeAPI.
- **State Management with Context API:** Pokémon state (seen/captured) is stored globally using Context API.
- **Styling with Tailwind CSS:** Clean and modern layout using Tailwind CSS and ShadCN UI.

## Project Structure

- `src/components`: Contains reusable components of the application.
- `src/pages`: Contains the pages of the application, each representing a route.
- `src/services`: Contains functions to interact with the PokéAPI.
- `src/types`: Contains TypeScript type definitions to ensure type safety.

## Technologies Used

- **Next.js**: React framework for server-side rendering and frontend.
- **TypeScript**: Static typing for JavaScript, ensuring better safety and maintainability.
- **Tailwind CSS**: Utility-first CSS framework for quickly building custom interfaces.
- **ShadCN UI**: A UI component library for styled components.
- **Context API (React)**: For global state management of the Pokédex.
- **PokeAPI**: Public API used to retrieve Pokémon data.

## How to Run the Project

1. Clone the repository:

   ```bash
   git clone https://github.com/giolvani/pokedex.git
   cd pokedex
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open the application:
   Open `http://localhost:3000` in your browser to view the application running.

## Next Steps

- Implement additional filters for Pokémon types and abilities.
- Display multiple images of the Pokémon in the details view.
- Add unit tests.

## Contributions

Contributions are welcome! Feel free to open a pull request or suggest improvements.

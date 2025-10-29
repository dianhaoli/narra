# Next.js Supabase Shadcn App

This project is a web application built using Next.js, TypeScript, Tailwind CSS, and shadcn/ui components. It integrates Supabase for authentication and PostgreSQL database management.

## Features

- **Routing**: The application includes the following routes:
  - `/upload`: A page for file uploads.
  - `/interviews/[id]`: A dynamic route for viewing interview details based on the interview ID.
  - `/map`: A page that displays a map interface.
  - `/profile/[username]`: A dynamic route for viewing user profiles based on the username.

- **UI Components**: The application utilizes reusable UI components styled with Tailwind CSS, including buttons and input fields.

- **Authentication**: Supabase is used for user authentication, allowing users to sign in and manage their sessions.

## Getting Started

To get started with the project, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd nextjs-supabase-shadcn-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env.local` file in the root directory and add your Supabase credentials and database connection strings.

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser**:
   Navigate to `http://localhost:3000` to view the application.

## Folder Structure

- `app/`: Contains the main application pages and layout.
- `components/`: Contains reusable UI components.
- `lib/`: Contains utility functions and Supabase client initialization.
- `prisma/`: Contains the Prisma schema for the PostgreSQL database.
- `styles/`: Contains global styles for the application.
- `.env.local`: Environment variables for local development.
- `package.json`: Project dependencies and scripts.
- `tsconfig.json`: TypeScript configuration.
- `next.config.js`: Next.js configuration.
- `tailwind.config.js`: Tailwind CSS configuration.
- `postcss.config.js`: PostCSS configuration.

## License

This project is licensed under the MIT License.
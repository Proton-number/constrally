# Constrally Real Estate Website

A modern real estate website built for **Constrally**, designed to showcase property listings, present the company's services, connect prospective clients with the team, and provide a straightforward way for applicants to submit career applications.

The website focuses on a clean, responsive user experience, polished animations, and accessible property information.

## Features

- **Responsive Design:** Optimized for desktop, tablet, and mobile devices.
- **Property Listings:** Displays available properties with relevant details and images.
- **Property Management CMS:** An authorized admin interface for adding and updating property listings.
- **Property Status:** Supports property status indicators, including sold listings.
- **Smooth Navigation:** Section-based navigation with smooth scrolling.
- **Contact Form:** Allows prospective clients to contact the Constrally team directly.
- **Careers Section:** Provides information about career opportunities and supports application submissions with PDF CV attachments.
- **Animations:** Subtle motion effects and transitions for a polished browsing experience.
- **Custom Navigation:** A transparent navbar at the top of the page that complements the website's design.

## Tech Stack

- **Framework:** Next.js
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Animations:** Motion
- **Icons:** Lucide React
- **Deployment:** cPanel with GitHub Actions for automated deployment

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js
- npm or Yarn
- Git

### Installation

Clone the repository:

```bash
git clone <repository-url>
```

Navigate into the project directory:

```bash
cd <project-directory>
```

Install dependencies:

```bash
npm install
```

Alternatively, if you use Yarn:

```bash
yarn install
```

### Environment Variables

Create a `.env.local` file in the project root and configure the environment variables required by the application.

For example, the Careers form may require SMTP configuration:

```env
SMTP_HOST=your-smtp-host
SMTP_PORT=465
SMTP_USER=your-sender-email
SMTP_PASSWORD=your-email-password
CAREERS_EMAIL=your-receiving-email
```

Replace the example values with the appropriate credentials and email addresses. Refer to the project's actual API implementation for the exact variable names required.

**Security:** Never commit `.env.local` or expose SMTP credentials in client-side code. Store production secrets securely in your hosting environment.

### Run the Development Server

Start the development server:

```bash
npm run dev
```

Or with Yarn:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

The application uses Next.js App Router conventions, with pages and layouts organized under the `app/` directory.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the development server |
| `npm run build` | Creates a production build |
| `npm run start` | Starts the production server |
| `npm run lint` | Runs linting if configured in `package.json` |

## Project Structure

The project follows the Next.js App Router structure. Your actual directories may vary.

```text
constrally/
├── app/
│   ├── api/
│   │   └── careers/
│   ├── admin/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── ui/
│   ├── Navbar.tsx
│   ├── Careers.tsx
│   └── ...
├── public/
│   └── images/
├── .env.local
├── next.config.js
├── package.json
└── README.md
```

## Deployment

The website is hosted on cPanel, with GitHub Actions configured to automate deployment when changes are pushed to the designated branch.

The deployment workflow builds the Next.js application and transfers the required production files to the hosting environment.

Before deploying:

1. Test the application locally.
2. Run `npm run build` and resolve any build errors.
3. Configure production environment variables on the server.
4. Confirm that the cPanel environment supports the required Node.js version and Next.js runtime.
5. Verify that forms, property listings, and administrative features work correctly after deployment.

See the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for additional guidance.

## Contributing

1. Create a new branch for your changes.
2. Make your updates and test them locally.
3. Commit your changes with a descriptive message.
4. Push the branch and follow the project's review and deployment process.

## License

This project is maintained for Constrally. All rights to proprietary website content, branding, and assets remain with their respective owners.
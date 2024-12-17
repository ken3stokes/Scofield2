# Scofield - Smart Goal Management System

Scofield is a modern, intelligent goal management application built with React and TypeScript. It helps users create, track, and achieve their goals using SMART criteria and AI-powered insights.

## Features

- **SMART Goal Creation**: Create goals following the Specific, Measurable, Achievable, Relevant, and Time-bound framework
- **Interactive Dashboard**: Visual representation of your goals and progress
- **AI-Powered Insights**: Get intelligent suggestions and analysis for your goals
- **Progress Tracking**: Update and monitor goal progress with an intuitive interface
- **Dark Mode Support**: Comfortable viewing experience in any lighting condition
- **Responsive Design**: Works seamlessly across desktop and mobile devices

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **State Management**: React Hooks
- **Database**: DexieJS (IndexedDB)
- **UI Components**: Custom components with Lucide icons
- **Build Tool**: Vite
- **AI Integration**: Mistral AI

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/ken3stokes/Scofield2.git
   cd Scofield
   ```

2. Install dependencies:
   ```bash
   cd project
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
project/
├── src/
│   ├── components/      # React components
│   ├── features/        # Feature-specific code
│   ├── db/             # Database configuration and schemas
│   ├── utils/          # Utility functions
│   ├── theme/          # Theme configuration
│   └── types/          # TypeScript type definitions
```

## Key Features

### Goal Management
- Create and edit goals with detailed information
- Track progress with an interactive progress bar
- Update goal status (Not Started, In Progress, Completed)
- Delete goals when needed

### Analytics
- View goal completion trends
- Analyze goal distribution by category
- Track progress over time
- Generate detailed reports

### AI Features
- Smart goal analysis
- Motivational nudges
- Goal suggestions
- Recommendation engine

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- UI inspiration from modern design practices
- Built with [Vite](https://vitejs.dev/)

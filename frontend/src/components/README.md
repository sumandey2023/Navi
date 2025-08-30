# Components Structure

This directory contains all the modular components that make up the AI Chat application. The components are organized for better maintainability, reusability, and readability.

## Component Hierarchy

```
components/
├── index.js                 # Barrel export for all components
├── Sidebar.jsx             # Main sidebar container
├── SidebarHeader.jsx       # Sidebar header with title and theme toggle
├── ThemeToggle.jsx         # Reusable theme toggle button
├── NewChatButton.jsx       # New chat button component
├── ChatHistory.jsx         # Chat history list component
├── Header.jsx              # Main app header
├── MessagesArea.jsx        # Messages display area container
├── Message.jsx             # Individual message component
├── WelcomeScreen.jsx       # Welcome screen for new users
├── LoadingMessage.jsx      # Loading indicator component
└── InputArea.jsx           # Message input area
```

## Component Descriptions

### Core Layout Components
- **Sidebar**: Main sidebar container that includes header, new chat button, and chat history
- **Header**: Main app header with title, menu button, and theme toggle
- **MessagesArea**: Container for all messages and welcome screen
- **InputArea**: Message input field and send button

### Sidebar Components
- **SidebarHeader**: Sidebar title and close button for mobile
- **NewChatButton**: Button to start new conversations
- **ChatHistory**: List of previous chat sessions

### Message Components
- **Message**: Individual message display with proper styling
- **WelcomeScreen**: Initial screen shown when no messages exist
- **LoadingMessage**: Loading indicator when AI is thinking

### Utility Components
- **ThemeToggle**: Reusable theme toggle button with size variants

## Props Interface

Each component accepts specific props that are documented in their respective files. The main `Home.jsx` component manages state and passes down the necessary props to child components.

## Styling

All components use Tailwind CSS with a mobile-first approach. The styling maintains the exact same visual appearance as the original monolithic component while being more maintainable.

## Benefits of This Structure

1. **Modularity**: Each component has a single responsibility
2. **Reusability**: Components like `ThemeToggle` can be reused across the app
3. **Maintainability**: Easier to locate and modify specific functionality
4. **Testing**: Individual components can be tested in isolation
5. **Readability**: Clear separation of concerns makes the code easier to understand
6. **Scalability**: New features can be added by creating new components

## Usage

Import components from the barrel export:

```jsx
import { Sidebar, Header, MessagesArea, InputArea } from '../components';
```

Or import individual components:

```jsx
import Sidebar from '../components/Sidebar';
```

# 🤖 Navi - AI-Powered Real-Time Chat Application

A modern, full-stack AI chat application built with React, Node.js, and Google's Gemini AI. Experience seamless real-time conversations with an intelligent AI assistant that remembers your chat history and provides contextual responses.

![Navi Chat Application](https://ik.imagekit.io/oruoqrvqm/Navi%20Ai/Screenshot%202025-10-25%20180420.png?updatedAt=1761396457529)

## ✨ Features

### 🔐 **Authentication & Security**

- **Secure User Authentication** with JWT tokens and HTTP-only cookies
- **Password Hashing** using bcryptjs for enhanced security
- **Protected Routes** - Only authenticated users can access the chat interface
- **Session Management** with automatic logout and token validation

### 💬 **Real-Time Chat Experience**

- **Instant Messaging** powered by Socket.IO for real-time communication
- **AI-Powered Responses** using Google's Gemini AI model
- **Chat History** with persistent storage and retrieval
- **Message Timestamps** and user-friendly time display
- **Typing Indicators** and loading states for better UX

### 🎨 **Modern UI/UX Design**

- **Responsive Design** that works seamlessly on desktop and mobile
- **Dark Theme** with beautiful gradients and smooth animations
- **Loading Screens** with animated progress indicators
- **Toast Notifications** for user feedback and error handling
- **Mobile-First Approach** with touch-optimized interactions

### 🚀 **Advanced Features**

- **Chat Management** - Create, rename, delete, and share conversations
- **Vector Search** with Pinecone for intelligent context retrieval
- **Markdown Support** with syntax highlighting for code blocks
- **Share Chat Links** - Share conversations with others
- **Auto-Resizing Input** that adapts to content length
- **Keyboard Shortcuts** - Enter to send, Shift+Enter for new lines

![Chat Interface](https://ik.imagekit.io/oruoqrvqm/Navi%20Ai/Screenshot%202025-10-25%20181421.png?updatedAt=1761396465934)

## 🛠️ Tech Stack

### **Frontend**

- **React 19** - Latest React with modern hooks and features
- **Vite** - Lightning-fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **Zustand** - Lightweight state management
- **React Router DOM** - Client-side routing
- **Socket.IO Client** - Real-time communication
- **Axios** - HTTP client for API requests
- **React Toastify** - Beautiful toast notifications
- **Lucide React** - Modern icon library

### **Backend**

- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **Socket.IO** - Real-time bidirectional communication
- **MongoDB** - NoSQL database with Mongoose ODM
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **Cookie Parser** - HTTP cookie parsing

### **AI & Services**

- **Google Gemini AI** - Advanced AI model for chat responses
- **Pinecone** - Vector database for semantic search
- **Vector Embeddings** - Context-aware response generation

![Mobile Interface](https://ik.imagekit.io/oruoqrvqm/Navi%20Ai/Screenshot%202025-10-25%20181503.png?updatedAt=1761396473784)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- Google Gemini AI API key
- Pinecone API key (optional, for enhanced context)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/sumandey2023/Navi.git
   cd Navi-main
   ```

2. **Backend Setup**

   ```bash
   cd backend
   npm install
   ```

3. **Frontend Setup**

   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Variables**

   Create a `.env` file in the backend directory:

   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   GOOGLE_API_KEY=your_gemini_api_key
   PINECONE_API_KEY=your_pinecone_api_key
   PINECONE_ENVIRONMENT=your_pinecone_environment
   ```

5. **Run the Application**

   **Backend:**

   ```bash
   cd backend
   npm run dev
   ```

   **Frontend:**

   ```bash
   cd frontend
   npm run dev
   ```

6. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000

## 📱 Usage

### **Getting Started**

1. **Register** a new account or **Login** with existing credentials
2. **Start Chatting** - Type your message and press Enter or click Send
3. **Manage Chats** - Create new conversations, rename, or delete old ones
4. **Share Conversations** - Generate shareable links for your chats
5. **Mobile Experience** - Use the responsive interface on any device

### **Keyboard Shortcuts**

- **Enter** - Send message
- **Shift + Enter** - New line (desktop)
- **Send Button** - Send message (mobile)

## 🔧 API Endpoints

### **Authentication**

- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `GET /auth/me` - Get current user

### **Chat Management**

- `GET /api/chat` - Get all user chats
- `POST /api/chat` - Create new chat
- `PUT /api/chat/:id` - Update chat (rename)
- `DELETE /api/chat/:id` - Delete chat
- `GET /api/chat/:id` - Get chat messages
- `GET /api/chat/:id/shared` - Get shared chat

### **Socket Events**

- `ai-message` - Send message to AI
- `ai-response` - Receive AI response

## 🏗️ Project Structure

```
navi-ai-chat/
├── backend/
│   ├── controller/          # Route controllers
│   ├── middleware/          # Custom middleware
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── service/            # AI and vector services
│   ├── sockets/            # Socket.IO configuration
│   └── server.js           # Main server file
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Application pages
│   │   ├── store/          # Zustand state management
│   │   ├── context/        # React contexts
│   │   └── config/         # Configuration files
│   └── public/             # Static assets
└── README.md
```

## 🎯 Key Features Explained

### **Real-Time Communication**

The application uses Socket.IO to provide instant messaging capabilities. When you send a message, it's immediately transmitted to the server, processed by the AI, and the response is sent back in real-time.

### **AI Integration**

Powered by Google's Gemini AI, the application provides intelligent, contextual responses. The AI can understand conversation history and provide relevant, helpful answers.

### **Vector Search (Optional)**

When enabled, the application uses Pinecone for vector-based semantic search, allowing the AI to provide more contextually relevant responses based on previous conversations.

### **Security**

- JWT tokens stored in HTTP-only cookies
- Password hashing with bcryptjs
- Protected routes and middleware
- CORS configuration for secure cross-origin requests

## 🚀 Deployment

### **Frontend (Vercel)**

1. Connect your GitHub repository to Vercel
2. Set build command: `npm run build`
3. Deploy automatically on push

### **Backend (Railway/Render)**

1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically on push

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Suman Dey**

- GitHub: [@sumandey2023](https://github.com/sumandey2023)
- LinkedIn: [Suman Dey](https://www.linkedin.com/in/suman-dey-463794253)
- Email: sumandey0704@gmail.com

## 🙏 Acknowledgments

- Google Gemini AI for providing the AI capabilities
- Pinecone for vector database services
- The React and Node.js communities for excellent documentation
- All contributors and users who provide feedback

---

⭐ **Star this repository if you found it helpful!**

🔗 **Live Demo**: [https://navi20.vercel.app/](https://navi20.vercel.app/)

📧 **Contact**: For questions or support, please open an issue or contact me directly.

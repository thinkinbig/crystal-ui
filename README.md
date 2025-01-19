# Crystal Blog ✨

A modern full-stack blog platform built with Vue 3 frontend and Spring Boot microservices, featuring stunning animations, interactive UI, and robust backend services.

## 🌟 Key Features

### Frontend
- 🎨 Interactive gradient background with cursor tracking
- 🌊 Smooth animated patterns and transitions
- 💫 Elegant loading animations and hover effects
- 🌓 Seamless dark/light mode switching
- 🎭 Glass-morphism effects

### Backend Microservices
- 👤 User authentication and authorization
- 📝 Article management with Markdown support
- 💬 Multi-level comment system
- 📊 Real-time analytics
- 🔔 Real-time notifications
- 📁 File management and CDN integration

### Infrastructure
- 🔄 Service discovery with Consul
- 📊 Centralized configuration management
- 🏥 Health monitoring and logging
- 🚀 CI/CD pipeline with Jenkins
- 🔒 Secure communication with mTLS

## 🚀 Getting Started

### Frontend Development
```bash
# Clone the repository
git clone https://github.com/yourusername/crystal-blog.git

# Install dependencies
cd crystal-blog/frontend
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Backend Services
```bash
# Navigate to service directory
cd crystal-blog/services/[service-name]

# Build with Maven
mvn clean install

# Run service
java -jar target/[service-name].jar
```

## 🏗️ Architecture

### Frontend Stack
- Vue 3 with Composition API
- TypeScript
- Element Plus UI
- SCSS + CSS Variables
- Pinia for state management
- Vue Router

### Backend Stack
- Spring Boot microservices
- Consul for service discovery
- MySQL/PostgreSQL
- Redis for caching
- Elasticsearch for search
- WebSocket for real-time features

## 📁 Project Structure

```text
crystal-blog/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── stores/
│   │   ├── styles/
│   │   └── types/
└── services/
    ├── user-service/
    ├── article-service/
    ├── comment-service/
    ├── notification-service/
    └── file-service/
```

## 🔧 Configuration

### Frontend Configuration
Customize themes and animations in:
```scss
// src/styles/variables.scss
$primary-color: #0d9488;
$primary-light: #14b8a6;
// ... more variables
```

### Backend Configuration
Service configurations are managed through Consul KV store:
```yaml
spring:
  cloud:
    consul:
      host: localhost
      port: 8500
```

## 🔍 API Documentation
API documentation is available at:
- Swagger UI: `http://localhost:8080/swagger-ui.html`
- API Docs: `http://localhost:8080/v3/api-docs`

## 🤝 Contributing

Please read our [Contributing Guide](CONTRIBUTING.md) before submitting a Pull Request.

## 📄 License

[MIT License](./LICENSE)

## 👥 Team

- Frontend Developer: [Your Name]
- Backend Developer: [Team Member]
- DevOps Engineer: [Team Member]

---

<p align="center">Built with ❤️ using Vue 3 and Spring Boot</p>
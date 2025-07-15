# 🚀 NestJS Starter Template

![NestJS](https://img.shields.io/badge/NestJS-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-%232496ED.svg?style=for-the-badge&logo=docker&logoColor=white)
![VS Code](https://img.shields.io/badge/VS%20Code-%23007ACC.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-000000?style=for-the-badge&logo=prettier&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)
![Commitlint](https://img.shields.io/badge/Commitlint-%23323330.svg?style=for-the-badge&logo=commitlint&logoColor=white)
![Husky](https://img.shields.io/badge/Husky-%23000000.svg?style=for-the-badge&logo=husky&logoColor=white)

## 📖 Description

This repository provides a robust and well-structured base template for projects developed with the [NestJS](https://nestjs.com/) framework. It follows best practices for modularity, maintainability, and scalability, ensuring an optimal development experience.

## 🛠 Technologies Used

- 🚀 **NestJS** - A progressive Node.js framework for building efficient and scalable server-side applications.
- ✨ **TypeScript** - A strongly typed programming language that builds on JavaScript.
- 🐳 **Docker & Docker Compose** - Used to containerize the application for easy deployment and development.
- 🎨 **ESLint & Prettier** - Ensures consistent code formatting and best practices.
- 🧪 **Vitest** - A fast testing framework for unit and integration tests.
- 🖥 **DevContainers (VS Code)** - Provides an isolated development environment.
- 🔄 **Commitlint** - Enforces consistent commit message conventions.
- 🐶 **Husky** - Automates Git hooks for improved development workflow.

## 🏗 Running the Project Locally

1. Ensure you have **Node.js** and **Yarn** installed on your system.
2. Install dependencies:
   ```sh
   yarn install
   ```
3. Copy the environment file and configure it:
   ```sh
   cp .env.example .env
   ```
4. Start the application in development mode:
   ```sh
   yarn start:dev
   ```
5. The application will be available at:
   ```
   http://localhost:3000
   ```

## 🐳 Running with Docker-Compose

1. Ensure **Docker** and **Docker Compose** are installed on your system.
2. Build and start the services:
   ```sh
   docker-compose up --build
   ```
3. Access the container shell:
   ```sh
   docker exec -it <container_id> sh
   ```
4. Inside the container, start the application:
   ```sh
   yarn start:dev
   ```
5. The application will be available at:
   ```
   http://localhost:${PORT}
   ```
6. To stop and remove containers:
   ```sh
   docker-compose down
   ```

## 🏗 Running with DevContainers (VS Code)

1. Install the **Dev Containers** extension in Visual Studio Code.
2. Ensure **Docker** is installed and running on your system.
3. Open the project in VS Code and select **Reopen in Container** when prompted.
4. The containerized development environment will be automatically set up.
5. Run commands inside the container terminal as you would locally:
   ```sh
   yarn start:dev
   yarn test:dev
   ```
6. The environment ensures consistency across different development setups.

## 🙏 Acknowledgment

Thank you for using this template! Your feedback and suggestions are highly appreciated. If you find this project useful, feel free to give it a star ⭐ and share it with others.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

🚀 Happy coding!

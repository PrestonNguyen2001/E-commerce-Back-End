# E-commerce Back End

## Description
This project sets up the back end for an e-commerce website using Express.js and Sequelize with a PostgreSQL database.

## Installation
1. Clone the repository.
2. Create a `.env` file in the root directory with the following content:
    ```env
    DB_NAME=your_database_name
    DB_USER=your_database_user
    DB_PASSWORD=your_database_password
    ```
3. Run the schema and seed commands:
    ```sh
    psql -U your_database_user -f db/schema.sql
    ```
4. Start the server:
    ```sh
    npm start
    ```

## Usage
- Use an API testing tool like Insomnia Core to test the following endpoints:
    - GET `/api/categories`
    - GET `/api/categories/:id`
    - POST `/api/categories`
    - PUT `/api/categories/:id`
    - DELETE `/api/categories/:id`
    - GET `/api/products`
    - GET `/api/products/:id`
    - POST `/api/products`
    - PUT `/api/products/:id`
    - DELETE `/api/products/:id`
    - GET `/api/tags`
    - GET `/api/tags/:id`
    - POST `/api/tags`
    - PUT `/api/tags/:id`
    - DELETE `/api/tags/:id`

## Walkthrough Video
[Link to Walkthrough Video](your_video_link)

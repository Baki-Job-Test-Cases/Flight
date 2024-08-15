# Flight

![1](https://github.com/user-attachments/assets/c86fad18-860f-4689-8394-7d8742a3f2c6)
![2](https://github.com/user-attachments/assets/c90b3dfa-3eaa-489d-a78a-fc27f9d6b7b8)
![3](https://github.com/user-attachments/assets/d86f8577-f148-44bb-8b1b-0771058eed1d)
![4](https://github.com/user-attachments/assets/394a59ca-396d-4805-aca3-3dcf2fb6e151)
![m1](https://github.com/user-attachments/assets/ffb7e4a1-6dfd-4e57-8616-231748ac8ac5)
![m2](https://github.com/user-attachments/assets/26fd864c-8ea6-4f77-956d-63794f0e0560)
![m3](https://github.com/user-attachments/assets/932fb6bd-e0f4-4153-87a2-7c93cd909617)
![m4](https://github.com/user-attachments/assets/7d65a54f-7946-4f77-b3e2-08c5843733f5)
![m5](https://github.com/user-attachments/assets/fec7cbcf-4a17-4018-8c85-c490b975a2ff)
![m6](https://github.com/user-attachments/assets/d69cf5f4-985c-4154-b83e-88b53a502579)
![m7](https://github.com/user-attachments/assets/ff0c0be0-34c4-4e0c-b309-398dd919c040)

-   [About The Project](#about-the-project)
    -   [Built With](#built-with)
-   [Getting Started](#getting-started)
    -   [Installation](#installation)
        -   [Backend](#backend)
        -   [Frontend](#frontend)
-   [Routes](#routes)

## About The Project

-   The user can search for flights by date, route and direction in ascending or descending order, as well as delay status and airline filters.
-   Users can register.
-   After log-in, the user can book the flight if the flight date has not expired and can see the booked flights on the profile page.

### Built With

-   ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
-   ![React Router DOM](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
-   ![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
-   ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
-   ![Shadcn/UI](https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)
-   ![Express Js](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white)
-   ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
-   ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
-   ![Zod](https://img.shields.io/badge/Zod-000000?style=for-the-badge&logo=zod&logoColor=3068B7)
-   ![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

## Getting Started

-   How to get schiphol api secrets ?

    -   https://developer.schiphol.nl/apis/flight-api/overview?version=latest

### Installation

#### Backend

You need to add the following variables to environment file(.env).

        | Name                         | Type   | Example                                              |
        | ---------------------------- | ------ | ---------------------------------------------------- |
        | DATABASE_URL                 | string | mongodb+srv://<username>:<password>.../<dbname>..... |
        | API_PORT                     | number | 8080                                                 |
        | CORS_ORIGIN                  | string | http://localhost:5173                                |
        | JWT_ACCESS_TOKEN_SECRET_KEY  | string | jwtAccessTokenSecretKey                              |
        | JWT_REFRESH_TOKEN_SECRET_KEY | string | jwtRefreshTokenSecretKey                             |
        | SCHIPHOL_FLIGHT_APP_ID       | string | appid                                                |
        | SCHIPHOL_FLIGHT_APP_KEY      | string | appkey                                               |
        | SCHIPHOL_FLIGHT_BASE_URL     | string | https://api.schiphol.nl/public-flights               |

```bash
  npm install
  npx prisma db push

  # for development server
  npm run dev

  # for production server
  npm run start
```

#### Frontend

You need to add the following variables to environment file(.env).

        | Name         | Type   | Example               |
        | ------------ | ------ | --------------------- |
        | VITE_API_URL | string | http://localhost:8080 |

```bash
  npm install

  # for development server
  npm run dev

  # for production server
  npm run build
  npm run start
```

## Routes

| Name      | Explanation                       |
| --------- | --------------------------------- |
| /         | User can search flights           |
| /profile  | User can see their booked flights |
| /login    | User login                        |
| /register | User register                     |

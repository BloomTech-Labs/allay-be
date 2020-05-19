# API Documentation

### Maintainability Score: https://codeclimate.com/github/Lambda-School-Labs/allay-be/maintainability

#### Backend delpoyed at [Heroku](https://labs21-allay-be.herokuapp.com/) <br>

## Getting Started

To get the server running locally:

- Clone this repo
- **npm install** to install all required dependencies
- **npm run server** to start the local server
- **npm test** to start server using testing environment

### Backend Framework

- Express for flexibility, simple routing, and middleware support
- Postgres for data persistence

### ESLint && Prettier

- Configuration is already set up
- Team members most download prettier && ESLint as a VScode plugin
- for more information on changing the config files visit: https://lambda-school-labs.github.io/labs-guides/topics/eslint-prettier-setup/

## Endpoints

#### Auth Routes

| Method | Endpoint         | Access Control | Description                      |
| ------ | ---------------- | -------------- | -------------------------------- |
| POST   | `/auth/register` | all users      | Register a new user account.     |
| POST   | `/auth/login`    | all users      | Login with a registered account. |

#### Users Routes

| Method | Endpoint                        | Access Control | Description                           |
| ------ | ------------------------------- | -------------- | ------------------------------------- |
| GET    | `/users/all`                    | admins         | Returns list of all users.            |
| GET    | `/users/:userId`                | all users      | Returns info for a single user by id. |
| PUT    | `/users/:userId`                | all users      | Update user's account info by id.     |
| DELETE | `/users/:userId`                | all users      | Delete user's account by id.          |
| PUT    | `/users/:userId/bind`           | admins         | Updates the user's bind status.       |
| GET    | `/users/:userId/reviews`        | all users      | Returns a list of review by user.     |
| GET    | `/users/:userId/reviews/:revId` | all users      | Returns a single review by user.      |
| POST   | `/users/:userId/add-review`     | all users      | Post helpful review.                  |
| PUT    | `/users/:userId/reviews/:revId` | all users      | Update a review by id.                |
| DELETE | `/users/:userId/reviews/:revId` | all users      | Delete a review by id.                |

#### Company Routes

| Method | Endpoint            | Access Control | Description                                   |
| ------ | ------------------- | -------------- | --------------------------------------------- |
| GET    | `/companies`        | all users      | Returns list of all companies.                |
| GET    | `/companies/:comId` | all users      | Returns the information for a single company. |
| POST   | `/companies`        | all users      | Creates a new company.                        |

#### Reviews Routes

| Method | Endpoint          | Access Control | Description                  |
| ------ | ----------------- | -------------- | ---------------------------- |
| GET    | `/reviews`        | all users      | Returns list of all reviews. |
| GET    | `/reviews/:revId` | all users      | Returns a single review.     |

## Data Model

#### USERS

---

##### EXPECTS

```
{
    "email": "nasra555@nasra.com",
    "password": "nasra555",
    "track_id": 1,
    "first_name": "John",
    "last_name": "Doe",
    "cohort": "Full Time 1"
}
```

##### RETURNS

```
{
    "id": 1,
    "email": "nasra555",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuYXNyYSIsImlhdCI6MTU4NTA2ODAzMSwiZXhwIjoxNTg1MDk2ODMxfQ.szdbRq9uZzvoIw84ka4qelk6ozbIgO8RyQLqtrJ2bqc"
}
```

#### SEEDED TABLES

---

##### TRACKS TABLE

| id  | track_name |
| --- | ---------- |
| 1   | AND        |
| 2   | DS         |
| 3   | WEB        |
| 4   | iOS        |
| 5   | UX         |

##### WORK STATUS TABLE

| id  | work_status      |
| --- | ---------------- |
| 1   | Current Employee |
| 2   | Former Employee  |
| 3   | Full Time        |
| 4   | Part Time        |
| 5   | Intern           |
| 6   | no work status   |

--- no work status is going to be the default for interview reviews that don't need it

##### OFFER STATUS TABLE

| id  | work_status     |
| --- | --------------- |
| 1   | No Offer        |
| 2   | Offer Accepted  |
| 3   | Offer Declined  |
| 4   | no offer status |

--- no offer status is going to be the default for company reviews that don't need it

##### REVIEW TYPES TABLE

| id  | work_status |
| --- | ----------- |
| 1   | Company     |
| 2   | Interview   |

##### STATES TABLE

| id  | state_name |
| --- | ---------- |
| 1   | AL         |
| 2   | AK         |
| 3   | AZ         |
| 4   | AR         |
| 5   | CA         |
| 6   | CO         |
| 7   | CT         |
| ... | ...        |
| 50  | WY         |
| 51  | Remote     |
| 52  | Unknown    |

#### ALL REVIEWS

---

##### COMPANY REVIEWS

###### EXPECTS

```
{
    work_status_id: 1
    job_title: "Software Geniius"
    city: "Nashville"
    state_id: 42
    start_date: 2010
    end_date: 2012
    company_name: "Facet Biotech"
    comment: "What is Lorem ipsum? A quick and simplified answer is that Lorem Ipsum refers to text that the DTP (Desktop Publishing) industry use as replacement text when the real text is not available.For example, when designing a brochure or book, a designer will insert Lorem ipsum text if the real text is not available. The Lorem ipsum text looks real enough that the brochure or book looks complete. The book or brochure can be shown to the client for approval. "
    typical_hours: 50
    salary: 6000
    review_type_id: 1
    overall_rating: 3
}
```

###### RETURNS

```
{
    review_id: 1
    user_id: 1
    username: "thisisarealuser"
    track_name: "WEB"
    review_type_id: 1
    company_name: "Nintendo"
    logo: "nintendo.com"
    work_status: "Intern"
    job_title: "Software Geniius"
    city: "Nashville"
    state_id: 42
    start_date: 2010
    end_date: 2012
    interview_rounds: 3
    phone_interview: false
    resume_review: false
    take_home_assignments: false
    online_coding_assignments: false
    portfolio_review: false
    screen_share: false
    open_source_contribution: false
    side_projects: false
    comment: "What is Lorem ipsum? A quick and simplified answer is that Lorem Ipsum refers to text that the DTP (Desktop Publishing) industry use as replacement text when the real text is not available.For example, when designing a brochure or book, a designer will insert Lorem ipsum text if the real text is not available. The Lorem ipsum text looks real enough that the brochure or book looks complete. The book or brochure can be shown to the client for approval. "
    typical_hours: 50
    salary: 6000
    difficulty_rating: 4
    offer_status: "No Offer"
    overall_rating: 3
    created_at: "2020-03-20T23:52:55.681Z"
    updated_at: "2020-03-20T23:52:55.681Z"

}
```

##### INTERVIEW REVIEWS

###### EXPECTS

```
{
    "job_title": "Full Stack Developer",
    "city": "Los Angeles",
    "state_id": 5,
    "company_name": "Twitch",
    "phone_interview": false,
    "resume_review": false,
    "take_home_assignments": false,
    "online_coding_assignments": false,
    "portfolio_review": false,
    "screen_share": true,
    "open_source_contribution": false,
    "side_projects": false,
    "comment": "What is Lorem ipsum? A quick and simplified answer is that Lorem Ipsum refers to text that the DTP (Desktop Publishing) industry use as replacement text when the real text is not available.For example, when designing a brochure or book, a designer will insert Lorem ipsum text if the real text is not available. The Lorem ipsum text looks real enough that the brochure or book looks complete. The book or brochure can be shown to the client for approval. ",
    "difficulty_rating": 4,
    "salary": "1234567",
    "review_type_id": 2,
    "overall_rating": 3,
    "offer_status_id": "2"
}
```

###### RETURNS

```
{
    "review_id": 2,
    "user_id": 1,
    "username": "aaron123",
    "review_type_id": 2,
    "company_name": "Twitch",
    "logo": "twitch.com",
    "work_status": "Former Employee",
    "job_title": "Full Stack Developer",
    "city": "Los Angeles",
    "state_id": 5,
    "start_date": 2123,
    "end_date": 2000,
    "interview_rounds": 3,
    "phone_interview": false,
    "resume_review": false,
    "take_home_assignments": false,
    "online_coding_assignments": false,
    "portfolio_review": false,
    "screen_share": true,
    "open_source_contribution": false,
    "side_projects": false,
    "comment": "What is Lorem ipsum? A quick and simplified answer is that Lorem Ipsum refers to text that the DTP (Desktop Publishing) industry use as replacement text when the real text is not available.For example, when designing a brochure or book, a designer will insert Lorem ipsum text if the real text is not available. The Lorem ipsum text looks real enough that the brochure or book looks complete. The book or brochure can be shown to the client for approval. ",
    "typical_hours": 40,
    "salary": 6000,
    "difficulty_rating": 4,
    "offer_status_id": 2
    "overall_rating": 3,
    "created_at": "2020-03-19T20:32:17.896Z",
    "updated_at": "2020-03-19T20:32:17.896Z"
}
```

#### COMPANIES

---

#### EXPECTS

```
{
    "company_name": "1 Million Cups Organizer",
    "hq_city": "Kansas City",
    "state_id": 25,
    "domain": "1millioncups.com",
    "industry_name": "Philanthropy",
    "size_range": "51 - 200",
    "linkedin_url": "linkedin.com/company/1-million-cups-organizer"
}
```

#### RETURNS

```
{
    "id": 12,
    "company_name": "1 Million Cups Organizer",
    "hq_city": "Kansas City",
    "state_id": 25,
    "domain": "1millioncups.com",
    "industry_name": "Philanthropy",
    "size_range": "51 - 200",
    "linkedin_url": "linkedin.com/company/1-million-cups-organizer"
}
```

## Actions

---

### User Actions

`findUsers()` -> Returns all users

`findUsersBy(filter)` -> Returns a single user by specified filter. Must use {}.

`findUserById(userId)` -> Returns all data for a single user by ID (including all company and interview).

`findUserReviews(userId)` => Returns reviews related to a user.

`findUserReviewById(revId)` => Returns a single review related to a user.

`addUser(newUser)` -> Creates a new user and returns that user.

`updateUser(userId)` -> Update a single user by ID.

`deleteUser(userId)` -> Deletes everything dependent on the user.
<br />

### Company Actions

`findCompanies()` -> Retruns a list of all companies.

`findCompaniesBy(filter)` -> Returns a single company by specified filter.

`findCompanyBy(comId)` -> Returns a single company by ID.

`findCompanyReviews(comId)` -> Returns all reviews for a specific company.

`addCompany(newCompany)` --> Creates a new company and returns that company. If the company already exists the company will not be added.

`updateCompany(comId, changes)` -> Updates a single company by ID.

`deleteCompany(comId)` -> Deletes the single company.
<br>

### Review Actions

`findReviews()` -> Returns a list of all reviews.

`findReviewsBy(filter)` -> Returns a single company review by specified filter.

`findRevieswById(revId)` -> Returns a single review by review ID.

`addReview(newReview)` --> Creates a new review and returns that review.

`updateReview(revId, changes)` -> Updates a single review by ID.

`deleteReview(revId)` -> Deletes a single review by ID.
<br>

## Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.

create a .env file that includes the following:

\_ NODE_ENV - Notates the enviroment for the server to run on. Options include 'testing', 'development', and 'production'. Auto defaults to development.

\_ DB_DEV - Notates the postgres database URL for local development.

\_ DB_TEST - Notates the postgres database URL for local testing.

<!-- - JWT*SECRET - you can generate this by using a python shell and running import random''.join([random.SystemRandom().choice('abcdefghijklmnopqrstuvwxyz0123456789!@#\$%^&amp;*(-_=+)') for i in range(50)]) -->

## Seeding Companies.csv File into Heroku Server

- Log into the Heroku site for Allay. Click on **labs21-allay-be**, then select the **Resources** tab. Click on **Heroku Postgres**, then the **Settings** tab, then the **View Credentials** button for database credentials.
- In pgAdmin, create a new server <server-name> and in the **Connection** tab enter the **host name/address** and **password** from Heroku. Verify the port number is the same as shown in Heroku. In the **Connection** tab, enter the database and user designated from Heroku.
- In the **Advanced** tab in pgAdmin, the **DB restriction name** is the database from Heroku. Don’t forget this step! It’s the same DB name as in the **Connection** tab in pgAdmin.
- Return to the Heroku dashboard. Click on the **More** button and select **Run console**.
- Run **npx knex migrate:rollback**. Continue to do so until you reach the base file.
- Run **npx knex migrate:latest**.
- Return to pgAdmin. Select the **companies** table, right click and select **Import/Export** data. In the popup box, move the **Import/Export** toggle to **Export** and select the **companies.csv** file for the filename. In the **Columns** tab, remove **id** from the columns to import, then click **OK**.
- In Heroku, in the **run console** enter **npx knex seed:run**.
- Verify in the production website that the companies appear.

## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./code_of_conduct.md). Please follow it in all your interactions with the project.

### Issue/Bug Request

**If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**

- Check first to see if your issue has already been reported.
- Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
- Create a live example of the problem.
- Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes, where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## Documentation

See [Frontend Documentation](https://github.com/Lambda-School-Labs/allay-fe) for details on the frontend of our project.

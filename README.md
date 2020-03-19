# API Documentation

### Maintainability Score: https://codeclimate.com/github/Lambda-School-Labs/allay-be/maintainability

#### Backend delpoyed at [Heroku](https://allay-be-production.herokuapp.com/) <br>

## Getting started

To get the server running locally:

- Clone this repo
- **npm install** to install all required dependencies
- **npm run server** to start the local server
- **npm test** to start server using testing environment

### Backend framework

- Express for flexibility, simple routing, and middleware support
- Postgres for data persistence
- Okta for user authentication

## Endpoints

---

### Auth Routes

---

| Method | Endpoint         | Access Control | Description                      |
| ------ | ---------------- | -------------- | -------------------------------- |
| POST   | `/auth/register` | all users      | Register a new user account.     |
| POST   | `/auth/login`    | all users      | Login with a registered account. |

### New Users Routes

---

| Method | Endpoint                                  | Access Control | Description                                          |
| ------ | ----------------------------------------- | -------------- | ---------------------------------------------------- |
| GET    | `/users/all`                              | all users      | Returns list of all users.                           |
| GET    | `/users/:userIid`                         | all users      | Returns info for a single user by id.                |
| PUT    | `/users/:userId`                          | all users      | Update user's account info by id.                    |
| DELETE | `/users/:userId`                          | all users      | Delete user's account by id.                         |
| GET    | `/users/:userId/company-reviews`          | all users      | Returns a list of review about a company by user.    |
| GET    | `/users/:userId/company-review/revId`     | all users      | Returns a single review about a company by user.     |
| POST   | `/users/:userId/add-company-review`       | all users      | Post helpful review about a company.                 |
| PUT    | `/users/:userId/company-reviews/:revId`   | all users      | Update a review about a company by id.               |
| DELETE | `/users/:userId/company-reviews/:revId`   | all users      | Delete a review about a company by id.               |
| GET    | `/users/:userId/interview-reviews`        | all users      | Returns a list of review about an interview by user. |
| GET    | `/users/:userId/interview-review/revId`   | all users      | Returns a single review about an interview by user.  |
| POST   | `/users/:userId/add-interview-review`     | all users      | Post helpful review about an interview.              |
| PUT    | `/users/:userId/interview-reviews/:revId` | all users      | Update a review about an interview by id.            |
| DELETE | `/users/:userId/interview-reviews/:revId` | all users      | Delete a review about an interview by id.            |

### Company Routes

---

| Method | Endpoint         | Access Control | Description                                   |
| ------ | ---------------- | -------------- | --------------------------------------------- |
| GET    | `/companies`     | all users      | Returns list of all companies.                |
| GET    | `/companies/:id` | all users      | Returns the information for a single company. |
| POST   | `/companies`     | all users      | Creates a new company.                        |

### Company Reviews Routes

---

| Method | Endpoint               | Access Control | Description                          |
| ------ | ---------------------- | -------------- | ------------------------------------ |
| GET    | `/company-reviews`     | all users      | Returns list of all company reviews. |
| GET    | `/company-reviews/:id` | all users      | Returns a single company review.     |

### Interview Reviews Routes

---

| Method | Endpoint                 | Access Control | Description                            |
| ------ | ------------------------ | -------------- | -------------------------------------- |
| GET    | `/interview-reviews`     | all users      | Returns list of all interview reviews. |
| GET    | `/interview-reviews/:id` | all users      | Returns single interview review by id. |

# Data Model

#### USERS

---

```
{
    "id": 1,
    "username": "nasra5",
    "email": "nasra5@nasra.com",
    "track_name": "Data Science",
    "company_reviews": [
        {
            "company_review_id": 1,
            "job_title": "Full Stack Developer",
            "start_date": 2010,
            "end_date": 2020,
            "comment": "Lorem ipsum",
            "typical_hours": 40,
            "salary": 50000,
            "job_rating": 1,
            "username": "nasra5",
            "company_name": "Google",
            "logo": "google.com",
            "work_status": "Intern",
            "created_at": "2020-03-18T20:29:40.711Z",
            "updated_at": "2020-03-18T20:29:40.711Z"
        }
    ]
}
```

**_ MAKE SURE THERE ARE NO TYPOS _**

##### TRACKS TABLE

| id  | track_name                 |
| --- | -------------------------- |
| 1   | Android Development        |
| 2   | Data Science               |
| 3   | Full Stack Web Development |
| 4   | iOS Development            |
| 5   | UX Design                  |

##### WORK STATUS TABLE

| id  | work_status      |
| --- | ---------------- |
| 1   | Current Employee |
| 2   | Former Employee  |
| 3   | Full Time        |
| 4   | Part Time        |
| 5   | Intern           |

##### OFFER STATUS TABLE

| id  | work_status    |
| --- | -------------- |
| 1   | No Offer       |
| 2   | Offer Accepted |
| 3   | Offer Declined |

## COMPANY REVIEW

---

### EXPECTS

```
{
  job_title: 'Full Stack Developer',
  start_date: 2010,
  end_date: 2020,
  comment: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words.',
  typical_hours: 40,
  salary: 50000,
  job_rating: 1,
  company_name: 'Google'
}
```

### RETURNS

```
{
    "company_review_id": 1,
    "job_title": "Full Stack Developer",
    "start_date": 2010,
    "end_date": 2020,
    "comment": "Lorem ipsum",
    "typical_hours": 40,
    "salary": 50000,
    "job_rating": 1,
    "username": "nasra5",
    "company_name": "Google",
    "logo": "google.com",
    "work_status": "Intern",
    "created_at": "2020-03-18T20:29:40.711Z",
    "updated_at": "2020-03-18T20:29:40.711Z"
}
```

## INTERVIEW REVIEW

---

### EXPECTS

**_ Notice for the booleans you only send the values that are true _**

```
{
    "job_title": "New Web Developer",
    "company_name":"1 Hotels",
    "interview_rounds": 3,
    "overall_rating": 5,
    "difficulty_rating": 5,
    "salary": 10555,
    "offer_status": "No Offer",
    "city": "Los Angeles",
    "abbreviation": "CA",
    "phone_interview": true,
    "resume_review": true,
    "interview_comments": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen"

}
```

### RETURNS

```
{
    {
        "interview_review_id": 1,
        "job_title": "Full Stack ",
        "interview_rounds": 3,
        "overall_rating": 5,
        "difficulty_rating": 5,
        "salary": 100555,
        "username": "aaron123",
        "company_name": "Google",
        "offer_status": "No Offer",
        "city": "Los Angeles",
        "abbreviation": "CA",
        "phone_interview": true,
        "resume_review": true,
        "take_home_assignments": false,
        "online_coding_assignments": false,
        "portfolio_review": false,
        "screen_share": false,
        "open_source_contribution": false,
        "side_projects": false,
        "interview_comments": "asfd asdf asdf asdf asfd safd asdf asdf asdf as dfsa fa sf saf asfd l;kj s;kfhasklfjhaslkfh salfhaslkjfhslkf halskfhslkfhksahf  shfklh lkjs lskh lkh lkh  h  kljh lkjh l jkhlk jh",
        "user_id": 1,
        "created_at": "2020-03-19T13:26:16.860Z",
        "updated_at": "2020-03-19T13:26:16.860Z"
    }
}
```

## COMPANIES

---

```
{
    "id": 12,
    "company_name": "1 Million Cups Organizer",
    "hq_city": "Kansas City",
    "state_id": 25,
    "domain": "1millioncups.com",
    "industry_name": "Philanthropy",
    "size_range": "51 - 200",
    "linkedin_url": "linkedin.com/company/1-million-cups-organizer",
    "reviews": []
}
```

## Actions

---

`findUsers()` -> Returns all users

`findUsersBy({ filter })` -> Returns a single user by specified filter. Must use {}.

`findUserById(userId)` -> Returns all data for a single user by ID (including all company and interview).

`findUserCompanyReviews(userId)` => Returns company reviews related to a user.

`findUserCompanyReviewById(revId)` => Returns a single company review related to a user.

`findUserInterviewReviews(userId)` => Returns interview reviews related to a user.

`findUserInterviewReviewById(revId)` => Returns a single interview review related to a user.

`addUser(user object)` -> Creates a new user and returns that user.

`updateUser(userId)` -> Update a single user by ID.

`deleteUser(userId)` -> Deletes everything dependent on the user.
<br>
<br>
<br>

`findCompanies()` -> Retruns a list of all companies.

`findCompaniesBy(filter)` -> Returns a single company by specified filter.

`findCompanyBy(companyId)` -> Returns a single company by ID.

`findCompanyReviews(companyId)` -> Returns all reviews for a specific company.

`addCompany(company object)` --> Creates a new company and returns that company. If the company already exists the company will not be added.

`updateCompany(userId, changes object)` -> Updates a single company by ID.

`deleteCompany(userId)` -> Deletes the single company.
<br>
<br>
<br>

`findCompanyReviews()` -> Returns a list of all company reviews.

`findCompanyReviewBy(filter)` -> Returns a single company review by specified filter.

`findCompanyReviewById(id)` -> Returns a single review by review ID.

`addCompanyReview(newReview)` --> Creates a new company review and returns that review.

`updateReview(id, changes)` -> Updates a single company review by ID.

`deleteCompanyReview(id)` -> Deletes a single company review by ID.
<br>
<br>
<br>

`findInterviewReviews()` -> Returns a list of all interview reviews.

`findInterviewReviewBy(filter)` -> Returns a single interview review by specified filter.

`findInterviewReviewById(id)` -> Returns a single interview review by review ID.

`addInterviewReview(newReview)` --> Creates a new interview review and returns that review.

`updateInterviewReview(id, changes)` -> Updates a single interview review by ID.

`deleteInterviewReview(id)` -> Deletes a single interview review by ID.

## Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.

create a .env file that includes the following:

\_ NODE_ENV - Notates the enviroment for the server to run on. Options include 'testing', 'development', and 'production'. Auto defaults to development.

\_ DB_DEV - Notates the postgres database URL for local development.

\_ DB_TEST - Notates the postgres database URL for local testing.

<!-- - JWT*SECRET - you can generate this by using a python shell and running import random''.join([random.SystemRandom().choice('abcdefghijklmnopqrstuvwxyz0123456789!@#\$%^&amp;*(-_=+)') for i in range(50)]) -->

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

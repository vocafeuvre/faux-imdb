## Faux iMDB API
API replicating simple features of iMDB. Written in Node.js, using Express. Tests are written in Mocha-Chai.

### How to use
Before using the API, you should set the environment variables first. The API needs the .env files for both dev and test environments. A .env.default template is provided for the required env variables. Also, do an npm install to download all needed packages.

* PORT (optional): this tells the server on which port should the app listen. Default is 3000.

* MONGO_PREFIX (conditional): adds prefix before host and credentials are specified. You should set this if you need SSL in your mongoDB connection, or if your mongoDB databases are in mongoDB Atlas.

* MONGO_DBNAME (required): sets the database to be used by the app.

* MONGO_USER (optional): sets the user for the database.

* MONGO\_PASS (conditional): sets the password for the database. You should set this if you have set MONGO_USER

* MONGO_HOST (required): sets the host on which the mongoDB database is located.

To start the API, just run npm start in the root directory.

To run tests for the API, just run npm test.

To seed data for the API, just run npm run seed, or npm run seed-test for test scripts.

### Endpoints
These are the available endpoints for the API (no headers are required): 

* **GET /movies** => fetches all the movies in the database. Is paginated by 10, and all hits are summarized.

    (optional) **?title=:value** => filters the result set by title. Is case insensitive, and checks if passed value is within the element's title.

    (optional) **?tags=:value** => filters the result set by tags. Tags can be delimited by comma (e.g Action, Bio). Is case sensitive, and checks if all provided tags are in the element's tags.

    (optional) **?page=:value** => sets the current page.


    Response body (status is 200): 
    ```
    {
        "data": {
            "movies": {
                "items": [
                    {
                        "id": String,
                        "title": String,
                        "tags": [String],
                        "summary": String,
                        "image": String,
                        "cast": [String]
                    }
                ],
                perPage: Number,
                currentPage: Number,
                total: Number
            }
        }
    }
    ```

* **GET /movies/:id/details** => fetches the complete details for the specified movie id.

    Response body (status is 200): 
    ```
    {
        "data": {
            "movie": 
                "id": String,
                "title": String,
                "tags": [String],
                "summary": String,
                "image": String,
                "cast": [
                    {
                        "id": String,
                        "movieId": String,
                        "name": String,
                        "role": String
                    }
                ]
            }
        }
    }
    ```


* **POST /movies/:id/cast** => adds a cast member to the movie's cast.

    Request body (in application/json):
    ```
    {
        name: String (required),
        role: String (required)
    }
    ```

    Response body is same with GET /movies/:id/details. Status is 201.


* **PUT /movies/:id/cast/:castId** => updates the cast member's details.

    Request body (in application/json):
    ```
    {
        name: String (optional),
        role: String (optional)
    }
    ```

    Response body is same with GET /movies/:id/details.


* **DELETE /movies/:id/cast/:castId** => deletes a cast member from the movie.

    Response status is 204.
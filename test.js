const { mockRequest, mockResponse } = require('./src/utils/interceptors')
const { addPosterController, deletePosterController, getPostersController, getByIdController, updatePosterConroller } = require('./src/controllers/poster.controllers')
const { registration, login, refreshSession, logout } = require("./src/services/auth.services")
describe("Check method addPosterController' ", () => {

    beforeEach(() => {
        req = mockRequest()
        res = mockResponse()
        message = { "message": "Post added successfully" }
    })
    test('should return status 200 and correct value', async () => {
        req.body = {
            task: {
                Posts: "posts",
                description: "description",
                id: 1611571954286,
                indexPoster: 1,
                key: "88.jpg",
                owner: "3e3275ab-70ad-42bb-8a20-11aadc66c2a8",
                subtitle: "subtitle",
                title: "title"
            }, file: [111, 137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0]
        }

        await addPosterController(req, res);
        expect(res.json).toHaveBeenCalledTimes(1)
        expect(res.json.mock.calls.length).toBe(1);
        expect(res.json).toHaveBeenCalledWith(message);
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).not.toContain(Number)
    });

    test('should return status 500 and error message if body is null ', async () => {
        req.body = null;
        await addPosterController(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ errorMessage: "Failed to create post" });
    });
    test('should return 500 and error message if body is empty object ', async () => {
        req.body = [];
        await addPosterController(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ errorMessage: "Failed to create post" });
    });
});

describe("Check method deletePosterController", () => {
    beforeEach(() => {
        req = mockRequest()
        res = mockResponse()
        message = { message: "Post successfully deleted" }
        errormessage = { errorMessage: 'Something went wrong, please try again' }
        arr = [false, null, '', 0]
    })
    test('should return status 200 and correct value', async () => {
        req.body = { id: 1611571954287 }

        await deletePosterController(req, res);
        expect(res.json).toHaveBeenCalledTimes(1)
        expect(res.json.mock.calls.length).toBe(1);
        expect(res.json).toHaveBeenCalledWith(message);
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).not.toContain(Boolean)
    });

    test("should return status 400 and message with false id", async () => {
        req.body = false
        await deletePosterController(req, res);

        expect(res.status).toHaveBeenCalledWith(500)
    })

    test("should return status 500 and message with null 0 empthy string or false request body", async () => {
        for (let i = 0; i < arr.length; i++) {
            req.body = arr[i]
            await deletePosterController(req, res);
            expect(res.status).toHaveBeenCalledWith(500)
            expect(res.json).toHaveBeenCalledWith(errormessage)
        }
    })
})

describe("Check method getPostersController", () => {
    beforeEach(() => {
        req = mockRequest()
        res = mockResponse()
        errormessage = { message: "Server error, try again" }
        arr = [false, null, '', 0]
    })
    test("should return status 200 and posters", async () => {
        req.query = { currentPage: 1, postersPerPage: 2, lastElemKey: 1611571954286 }
        await getPostersController(req, res);
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({ "posters": { "lastElemKey": 0, "queryResult": [] } })

    })
    test("should return status 200 and value with lastelemkey ", async () => {
        for (let i = 0; i < arr.length; i++) {
            req.query = { lastElemKey: arr[i] }
            await getPostersController(req, res);
            expect(res.status).toHaveBeenCalledWith(200)
        }
        expect(res.json).toHaveBeenCalledTimes(4)
    })

})
describe("Check registration method", () => {
    beforeEach(() => {
        obj = {
            username: 'email1@mail.ru',
            password: 'Password99',
            surename: "surename",
            email: "email1@mail.ru"
        }
        arr = [false, 0, "", null]
    })
    test("should return object value", async () => {

        return registration(obj).then(data => {
            expect(data).toBeInstanceOf(Object)
            expect(data).toBeDefined()

        })
    })
    test("should return error ", async () => {
        for (let i = 0; i < arr.length; i++) {
            return registration(arr[i]).catch(err => {
                expect(err).toBeInstanceOf(Error)
                expect(err).not.toBeInstanceOf(arr[i])
            })
        }
        expect(res.json).toHaveBeenCalledTimes(4)

    })

})
describe("Check login method", () => {
    beforeEach(() => {
        obj = {
            email: "email42343@mail.ru",
            password: "Password4342"
        }
        correctObj = {
            email: "morethanhyper@gmail.com",
            password: "Diman6996"
        }
        arr = [false, 0, "", null]

    })

    test("should return object value with in", async () => {
        return login(obj).then(data => {
            expect(data).toBeInstanceOf(Object)
            expect(data).toBeDefined()
            expect(data.message).toBeDefined()
            // expect(data.message).toBe("Incorrect username or password.")
        })
    })
    test("should return object value with correct answer", () => {
        return login(correctObj).then(data => {
            expect(data).toBeInstanceOf(Object)
            expect(data).toBeDefined()
            expect(data.message).toBeDefined()
            expect(data.message).not.toBeFalsy()

        })
    })
    test("should return object with error", async () => {
        for (let i = 0; i < arr; i++) {
            return login().catch(err => {
                expect(err).toBeInstanceOf(Object)
                expect(err).toBeDefined()
                expect(err.message).toBeDefined()
                expect(err.message).not.toBeFalsy()
            })
        }
    })
}
)

describe("Check method getByIdController", () => {
    beforeEach(() => {
        req = mockRequest()
        res = mockResponse()
        errormessage = { errorMessage: 'Something went wrong, please try again' }
        arr = [false, null, '', 0]
        obj = {
            Item: {
                Posts: "posts",
                description: "discription update",
                id: 1611571954286, "indexPoster": 1,
                key: "88.jpg",
                owner: "3e3275ab-70ad-42bb-8a20-11aadc66c2a8",
                src: "data:image/png;base64,b4lQTkcNChoKAAAA",
                subtitle: "subtitle update", title: "title update"
            }
        }

    })
    test("should return status 200 and values", async () => {
        req.params.id = 1611571954286
        await getByIdController(req, res);
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.send.mock.calls.length).toBe(0)
        // expect(res.json).toHaveBeenCalledWith(obj)
    })
    test("should return status 500 and error message", async () => {
        for (let i = 0; i < arr.length; i++) {
            req.params.id = arr[i]
            await getByIdController(req, res);
            expect(res.status).toHaveBeenCalledWith(500)
            expect(res.json).toHaveBeenCalledWith(errormessage)
        }
        expect(res.json).toHaveBeenCalledTimes(4)
    })
})

describe("Check method updatePosterController", () => {
    beforeEach(() => {
        req = mockRequest()
        res = mockResponse()
        obj = {
            title: "title update",
            subtitle: "subtitle update",
            description: "discription update",
            id: 1611571954286
        }
        errormessage = { errorMessage: 'Data refresh error, please try again' }
        message = { message: "Post updated" }
        arr = [false, null, '', 0]
    })
    test("shuold return status 200 and value ", async () => {
        req.body = obj
        await updatePosterConroller(req, res)
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith(message)
    })
    test("should return status 500 and error ", async () => {
        for (let i = 0; i < arr.length; i++) {
            req.body = arr[i]
            await updatePosterConroller(req, res)
            expect(res.status).toHaveBeenCalledWith(500)
            expect(res.json).toHaveBeenCalledWith(errormessage)
        }
        expect(res.json).toHaveBeenCalledTimes(4)
    })
})



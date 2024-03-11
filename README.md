# Nodejs Auth API Example w/ Clean Architecture and DDD

# Folder structure 📂

````
src
├── api
│   └── controllers
├── application
│   ├── common          
│   ├── interfaces       
│   ├── users
│   │   ├── create-user
│   │   └── ... // more use-cases
│   └── ... // more features
├── domain
│   ├── common          
│   ├── users    
│   └── ... // more entites
├── infrastructure
│   ├── common                  
│   ├── security
│   ├── services
│   ├── users
│   └── ... // more repositories
└── webserver
    └── frameworks
        └── express
````

# Clean architecture 🧽
This projects attemps to emulate popular clean architecture best practices by separating concerns as follows.
### API

Contains all Controllers called from the webserver. They are in charge of mapping the HTTP request to the appropriate Command or Query and pass it to the Handler.

Snippet from ``/api/controllers/users/CreateUserController.ts``
````ts
export class CreateUserController implements IController {
    //...
    public async execute(request: IHTTPRequest): Promise<any> {
        const createUserCommandHandler = container.resolve(CreateUserCommandHandler)

        const createUserCommand = new CreateUserCommand(
            //...
        )
        return await createUserCommandHandler.execute(createUserCommand)
    }
}
````

### Application

Contains all the use-cases separated by features. Each use-case performs all necessary validations and map the Commands and Queries to the appropriate Domain Models. They will then send the data to the Interface Repositories.

Snippet from ``/application/users/create-user/CreateUserCommandHandler.ts``
````ts
export class CreateUserCommandHandler {
    public constructor(
        @inject("userRepository") private _userRepository: IUserRepository,
        @inject("tokenProvider") private _tokenProvider: ITokenProvider
    ) {}
    public async execute(command: CreateUserCommand): Promise<any> {
        const foundUser = await this._userRepository.getUserByEmail(command.email)
        if (foundUser) {
            throw new ConflictError("Email is taken.")
        }
        const user = await User.create({
            //...
        })
        let createdUser = await this._userRepository.addUser(user)
        return this._tokenProvider.generateToken({
            //...
        });
    }
}
````
### Domain
All Aggregate Roots, Entities and Value Objects will be handled here.

For example, a User Aggregate Root can be created as follows:
````ts
const newUser = User.create({
    id: data.id,
    email: data.email,
    //...
})
````
### Infrastructure

Manages the Database Repositories, and all Security and other services.

Snippet from ``/infrastructure/users/persistence/UserRepository.ts``
````ts
export class UserRepository implements IUserRepository {
    public async addUser(user: any): Promise<any> {
        const result = await UserModel.create({
            _id: user.id.value,
            //...
        })
        return result.populate({
            //...
        })
    }
}
````


# Features 🚀

## Users
- Create User

- Get Users

- Get User By Id

- Update User

- Delete User

- Update User Role


## Roles
- Create Role

- Get Roles

- Get Role By Id

- Update Role

- Delete Role

## Permissions
- Create Permission

- Get Permissions

- Get Permission By Id

- Update Permission

- Delete Permission

# Security 🔒
Services related to password protection, token generation and verification and authorization of routes.

### BcryptCryptoService

Adapter class to use Bcrypt _hash()_ and _compare()_ methods

### JwtTokenService

Adapter class to use jsonwebtoken _generate()_ and _verify()_ methods

### @authorize()

Custom TS Method Decorator.
```ts
// Usage
export class UpdateUserController implements IController {
    
    @authorize(Permission.EditUser)
    public async execute(request: IHTTPRequest): Promise<void> {
        //...
    }
}

```

# Other Services 🎨

Other services used across the application:

### IdGeneratorService

Generates and verifies IDs with the MongoDb ObjectId Type used in the project's database.

### @logger()

Similar to _@authorize()_ this is a custom TS Method decorator which logs all Controllers request data in _development_ mode

````ts
// Usage
export class CreateUserController implements IController {

    @logger
    public async execute(request: IHTTPRequest): Promise<void> {
        //...
    }
}
````

# Webserver 🌍

Separated from the main folders to denote its external nature. Even though it is built with express.js it could be switched easily to another framework like Koa or Nestjs, and it would not affect the core functionality of the application. 

### Route Example

```ts
//PATCH
router.patch('/:id', authenticateMiddleware, handleHTTPRequest(
        UpdateRoleController,
        NoContentResponse
    )
);
```

# Api Documentation

### [/api/v1/users](docs/api/user.routes.md)
### [/api/v1/roles](docs/api/role.routes.md)
### [/api/v1/permissions](docs/api/permission.routes.md)

# License
[MIT](LICENSE.md)
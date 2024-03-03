## NODE REST API CLEAN+DDD TEMPLATE

## Auth

### Register

```
POST api/v1/auth/register
```

#### Register Request

```json
{
  "name": "User",
  "email": "user@gmail.com",
  "password": "WG7Nv3[W|P92"
}
```

#### Register Response

```
201 Created
```

```json
{
  "id": "65e18f5b656166d609973d3f",
  "name": "User",
  "email": "user@gmail.com",
  "token": "eyJhbGciOiJSUzI1..."
}
```

### Login

```
GET api/v1/auth/login
```

#### Login Request

```json
{
  "email": "user@gmail.com",
  "password": "WG7Nv3[W|P92"
}
```

#### Login Response

```
200 Ok
```

```json
{
  "id": "65e18f5b656166d609973d3f",
  "name": "User",
  "email": "user@gmail.com",
  "token": "eyJhbGciOiJSUzI1..."
}
```

## Protected Route

### Verify

```
GET api/v1/auth/verify
```

#### Verify Request

#### Headers

```
Authorization: Bearer eyJhbGciOiJSUzI1...
```

#### Verify Response

```
200 Ok
```

```json
{
  "message": "User has been successfully verified."
}
```
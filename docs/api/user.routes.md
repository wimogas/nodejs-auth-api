## User Endpoints

### Register ✅

```
POST api/v1/users/register
```

#### Register Request

```json
{
  "name": "User",
  "email": "user@gmail.com",
  "password": "WG7Nv3[W|P92",
  "role": "65e18f5b656166d609973d3f"
}
```

#### Register Response

```
201 Created
```

```json
{
  "token": "eyJhbGciOiJSUzI1..."
}
```
<hr>
<br>

### Login ✅

```
GET api/v1/token/
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
  "token": "eyJhbGciOiJSUzI1..."
}
```
<hr>
<br>

### Get User ✅

```
GET api/v1/user/65e59331e8ce762676341749
```

#### Get User Response

```
200 Ok
```

```json
{
  "id": "65ecc3bc440a34c4c10885ca",
  "email": "email@mail.com",
  "role": "editor",
  "permissions": [
    "view:user",
    "create:user",
    "delete:user",
    "edit:user"
  ]
}
```
<hr>
<br>

### Edit User ✅

```
PATCH api/v1/user/65e59331e8ce762676341749
```

#### Edit User Request
Authorization Policy

- Permission.EditUser

- Policy.AdminOrSelf

Headers

```
Authorization: Bearer eyJhbGciOiJSUzI1...
```

Body

```json
{
  "email": "user@gmail.com",
  "password": "WG7Nv3[W|P92"
}
```

#### Edit User Response

```
204 No Content
```
<hr>
<br>
 
### Delete User ✅

```
DELETE api/v1/user/65e59331e8ce762676341749
```

#### Delete User Request
Authorization Policy

- Permission.DeleteUser

- Policy.AdminOrSelf

Headers

```
Authorization: Bearer eyJhbGciOiJSUzI1...
```

#### Delete User Response

```
204 No Content
```
<hr>
<br>

### Change User Role ❌

```
PATCH api/v1/user/65e59331e8ce762676341749/role
```

#### Change User Role Request
Authorization Policy

- Permission.Admin

- Role.Admin

Headers

```
Authorization: Bearer eyJhbGciOiJSUzI1...
```

Body

```json
{
  "role": "65e59331e8ce762676341749"
}
```
#### Change User Role Response

```
204 No Content
```
<hr>
<br>
## Role Endpoints

### Create Role ❌

```
POST api/v1/roles
```

#### Create Role Request
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
  "name": "admin"
}
```

#### Create Role Response 

```
201 Created
```

```json
{
  "id": "65e59331e8ce762676341749"
}
```
<hr>
<br>



### Get Roles ❌

```
GET api/v1/roles/
```
#### Get Roles Request
Authorization Policy

- Policy.Authenticated

Headers

```
Authorization: Bearer eyJhbGciOiJSUzI1...
```

#### Get Roles Response

```
200 Ok
```

```json
{
  "roles": [
    {
    "id" : "65e59331e8ce762676341749",
      "name": "admin",
      "permissions": [
        "crud:all"
      ]
    },
    {
      "id" : "65e59331e8ce762676341749",
      "name": "editor",
      "permissions": [
        "create:user",
        "..."
      ]
    }
  ]
}
```
<hr>
<br>

### Get Role ❌

```
GET api/v1/roles/65e59331e8ce762676341749
```
#### Get Role Request

Authorization Policy

- Policy.Authenticated

Headers

```
Authorization: Bearer eyJhbGciOiJSUzI1...
```

#### Get Role Response

```
200 Ok
```

```json
{
  "id" : "65e59331e8ce762676341749",
  "name":"admin",
  "permissions" : [
    "crud:all"
  ]
}
```
<hr>
<br>

### Edit Role ❌

```
PATCH api/v1/roles/65e59331e8ce762676341749
```

#### Edit Role Request
Authorization Policy

- Permission.Admin

- Policy.Admin

Headers

```
Authorization: Bearer eyJhbGciOiJSUzI1...
```

Body

```json
{
  "name": "65e59331e8ce762676341749"
}
```

#### Edit Role Response

```
204 No Content
```
<hr>
<br>

### Delete Role ❌

```
DELETE api/v1/roles/65e59331e8ce762676341749
```

#### Delete Role Request
Authorization Policy

- Permission.Admin

- Policy.Admin


Headers

```
Authorization: Bearer eyJhbGciOiJSUzI1...
```

#### Delete Role Response

```
204 No Content
```
<hr>
<br>
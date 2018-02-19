# FrontCamp

## Project start

### Prerequisites:
1. Install [Node.js](https://nodejs.org/)
2. Install dependencies
```
npm install
```
3. Install Postman (Fiddler or other tool to test your endpoints)
[Postman website](https://www.getpostman.com/)
4. Install and run mongoDB

For macOS run in terminal:

```
export PATH=/Users/{username}/mongodb/bin:$PATH
mongod
```
5. Create DB ```frontcamp``` if not created before
6. Add table ```users```

## Project Run

```
nodemon app
```

### Testing endpoints:

```
GET    /blogs
GET    /blogs/{id}
POST   /blogs
PUT    /blogs/{id}
DELETE /blogs/{id}
```

Other endpoints redirect to 404 error page

#### Example:

```
GET    /blogs
```
print Articles.json contents

```
GET    /blogs/2
```
renders page with contents of article with id = 2

```
POST   /blogs
```

Headers:
Content-Type: application/x-www-form-urlencoded
Body:
[x] x-www-form-urlencoded

title: A Scarf
author: By Doreen St. Félix
content: The promise of black visibility has always been twisted. Mechanisms of seeing are also mechanisms of intruding, policing, controlling. But Hyphen-Labs, a collective of women technologists of color, has developed an ingenious workaround—a scarf that occludes the wearer’s face, but only selectively. To the human eye, the scarf adorns; to a computer’s eye, it obscures, because of a camouflage pattern called HyperFace printed on the fabric. HyperFace, which was developed by the designer Adam Harvey, is a mess of pixelated blotches, out of which emerge twelve hundred shapes that are almost like faces, but not quite. This jumble of visual data overloads facial-recognition algorithms.

Adds new blog with id = 2

```
PUT    /blogs/2
```
Headers:
Content-Type: application/x-www-form-urlencoded
Body:
[x] x-www-form-urlencoded

title: A Scarf777
author: By Doreen St. Félix
content: The promise of black visibility has always been twisted. Mechanisms of seeing are also mechanisms of intruding, policing, controlling. But Hyphen-Labs, a collective of women technologists of color, has developed an ingenious workaround—a scarf that occludes the wearer’s face, but only selectively. To the human eye, the scarf adorns; to a computer’s eye, it obscures, because of a camouflage pattern called HyperFace printed on the fabric. HyperFace, which was developed by the designer Adam Harvey, is a mess of pixelated blotches, out of which emerge twelve hundred shapes that are almost like faces, but not quite. This jumble of visual data overloads facial-recognition algorithms.

Edits blog article with id = 2

```
DELETE /blogs/2
```
Removes blog article with id = 2

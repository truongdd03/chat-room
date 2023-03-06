# chat-room
A real-time chat web application created with Java and Vue.

* Backend (Spring Boot + Java) is inside the ChatRoom folder.
* Frontend (Vue3 + TypeScript) is inside the ChatClient folder.

<img width="1440" alt="Screenshot 2023-03-05 at 10 28 04 PM" src="https://user-images.githubusercontent.com/81574365/223013144-7dc2376b-cd03-45f4-8220-847c848315a3.png">

## Setup

### Backend

```
cd ./ChatRoom
mvn package
java -jar target/ChatRoom-0.0.1-SNAPSHOT.jar
```

### Frontend

```
cd ./ChatClient
npm install
npm run dev
```

When both the frontend and backend are running, you can access the website at `http://localhost:5173/`

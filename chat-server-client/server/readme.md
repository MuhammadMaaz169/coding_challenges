
Simple Node js live chat server

`node server.js`

```
wscat -c ws://localhost:8080

// input sample
<!-- connection 1 -->
{ "type": "register", "userName": "Alpha" }

<!-- connection 2 -->
{ "type": "register", "userName": "Beta" }

<!-- send the input from connection 1 -->
{ "type": "message", "to": "Beta", "message": "Hi! " }
```


### Use cases:
1. User can register using the email.
    1. Duplicate email not allowed
2.  Register User can login(make connection with chat server) using the email and password.
3. User can communicate with other user through their email.
4. User can create groups 
    1. User can add other users to group.
    2. Sync message with all users in group when they got connected with chat server
5. Web GUI to connect with chat server.
6. Web GUI for Chatting.
    1. Private chat
    2. Group chat  

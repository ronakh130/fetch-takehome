# Fetch - Backend Assessment

### To Install
```
git clone https://github.com/ronakh130/fetch-takehome.git
cd fetch-takehome
```

### To Run
```
docker build -t ronak-fetch-takehome .
docker run -p 3000:3000 ronak-fetch-takehome
```
This starts the container locally on port 3000.
With the container now running, you may hit the following endpoints with your preferred method:
```
http://localhost:3000/receipts/process (POST)
http://localhost:3000/receipts/:id/points (GET)
```
Using postman would be the easiest. However, if you don't have access to it you can open up a UNIX terminal and use the following commands:

##### POST
Replace {receipt} with the receipt you plan to send
```
 curl http://localhost:3000/receipts/process \
--include \
--header "Content-Type: application/json" \
--request "POST" \
--data '{receipt}'
```

##### GET 
Replace :id with the UUID you receive from hitting the POST request above
```
 curl http://localhost:3000/receipts/:id/points
```

### Tests
To run the test suite, run ```npm run test``` in the container's CLI.
If you don't have Docker software, you can enter the container with the following steps:

1. Enter ```docker ps``` in your terminal.
2. This will show all current running containers. Find the container named ```ronak-fetch-takehome``` and copy its container ID.
3. Now enter ```docker exec -it {containerID} /bin/sh``` with your copied ID. This will enter you into the CLI of the container.
4. Enter ```npm run test``` and the tests will run.

### Stopping containers
To stop all running containers, run:

```docker stop $(docker ps -q)```

To delete all stopped containers, run:

```docker rm $(docker ps -a -q)```

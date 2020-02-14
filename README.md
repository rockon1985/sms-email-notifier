# Nodejs RabbitMQ SMS/Email Sender

## About
Simple RabbitMQ powered SMS/email service

## Pre-requisites
- Nodejs v10 or above
- Redis should be installed and running
- Twilio account with AUTH_KEY and ACCOUNT_SID
- Sendgrid account with SENDGRID_API_KEY

## Components of the app

1. **Main nodejs app (Producer)**: The main nodejs app's API can be consumed to push request for sending sms/email via the system. To push a request use the API `POST /notifications` API.
2. **Worker nodejs app (Consumer)**: When the app is running in worker mode, it would listen to the queue for incoming request, pick them up and send them according to the request.
3. **React JS Dashboard**: A simple single page app that calls nodejs API to send the notifications.


## Running the app (Producer)

To install the dependency, run the command:
```
npm install
```

To run the main nodejs app, simply run command:
```
npm start
```

To run the app in worker mode, run command:
```
npm run worker
```

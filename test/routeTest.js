require("babel-register");
require("babel-core/register");
require("babel-polyfill");
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../lib/express").init();
const sinon = require("sinon");
const rabbitMq = require("../lib/rabbitmq");
let should = chai.should();

chai.use(chaiHttp);

describe("Testing my app", () => {
  let publishToQueue;
  describe("Sms api test", () => {
    after(function() {
      rabbitMq.publishToQueue.restore(); // Unwraps the stub
    });

    it("Should sent a SMS message", done => {
      const smsData = {
        type: "sms",
        target: "+13095120462",
        message: "Testing sms api"
      };
      smsData.sent = true;
      publishToQueue = sinon
        .stub(rabbitMq, "publishToQueue")
        .returns(Promise.resolve(smsData));
      chai
        .request(server)
        .post("/notifications/")
        .send(smsData)
        .end((err, res) => {
          if (err) {
            console.log("Error", err);
          }
          res.should.have.status(200);
          sinon.assert.calledOnce(publishToQueue);
        });
      done();
    });

    it("Service type not defined", done => {
      const smsData = {
        // type: "sms", type not defined.
        target: "+13095120462",
        message: "Testing sms api"
      };
      chai
        .request(server)
        .post("/notifications/")
        .send(smsData)
        .end((err, res) => {
          if (err) {
            console.log("Error", err);
          }
          res.should.have.status(400);
        });
      done();
    });

    it("Contact number is incorrect format", done => {
      const smsData = {
        type: "sms",
        target: "+13095120",
        message: "Testing sms api"
      };
      chai
        .request(server)
        .post("/notifications/")
        .send(smsData)
        .end((err, res) => {
          if (err) {
            console.log("Error", err);
          }
          res.should.have.status(400);
        });
      done();
    });
  });

  describe("Email api test", () => {
    after(function() {
      rabbitMq.publishToQueue.restore(); // Unwraps the spy
    });

    it("Should sent a SMS message", done => {
      const smsData = {
        type: "email",
        target: "test@test.com",
        message: "Testing email api",
        subject: "Testing"
      };
      publishToQueue = sinon
        .stub(rabbitMq, "publishToQueue")
        .returns(Promise.resolve(smsData));
      chai
        .request(server)
        .post("/notifications/")
        .send(smsData)
        .end((err, res) => {
          if (err) {
            console.log("Error", err);
          }
          res.should.have.status(200);
          sinon.assert.calledOnce(publishToQueue);
        });
      done();
    });

    it("Service type not defined", done => {
      const smsData = {
        // type: "email", type not defined.
        target: "test@test.com",
        message: "Testing email api",
        subject: "Testing"
      };
      chai
        .request(server)
        .post("/notifications/")
        .send(smsData)
        .end((err, res) => {
          if (err) {
            console.log("Error", err);
          }
          res.should.have.status(400);
        });
      done();
    });

    it("Email is incorrect format", done => {
      const smsData = {
        type: "email",
        target: "test@testcom",
        message: "Testing email api",
        subject: "Testing"
      };
      chai
        .request(server)
        .post("/notifications/")
        .send(smsData)
        .end((err, res) => {
          if (err) {
            console.log("Error", err);
          }
          res.should.have.status(400);
        });
      done();
    });
  });
});

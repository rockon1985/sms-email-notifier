import EmailService from "./emailService";
import SMSService from "./smsService";

const ServiceMapper = {
  email: EmailService,
  sms: SMSService
};

export default ServiceMapper;

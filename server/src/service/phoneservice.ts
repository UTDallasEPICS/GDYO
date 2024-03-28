// Code to send SMS messages to an array of phone numbers
// Needs the body of the message as input

import twilio from "twilio";

export const PhoneService = (messageBody: string) => {
  const accountSid = process.env.TWILIO_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;

  const client = twilio(accountSid, authToken);

  const numbersToMessage = ["+14697719018", "+14694340261"];

  numbersToMessage.forEach(function (number) {
    client.messages
      .create({
        body: messageBody,
        from: "+18449293239",
        to: number,
      })
      .then((message) => console.log(message.status));
  });
};

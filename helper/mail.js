const nodemailer = require("nodemailer");

function mail(recipient, order) {
  // Generate SMTP service account from ethereal.email
  nodemailer.createTestAccount((err, account) => {
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "francis.heidenreich72@ethereal.email",
        pass: "vRhZqD9mCyCH5JPhkY",
      },
    });

    // Message object
    const message = {
      from: "Sender <basic-ecom@example.com>",
      to: `Recipient <${recipient}>`,
      subject: "Your order has been placed at Basic-Ecom",
      text: "Your order has been placed at Basic-Ecom. Kindly pay within 24 hour or the order will be canceled.",
      html: `<p>Your order has been placed at Basic-Ecom. Kindly pay within 24 hour or the order will be canceled.<br>
      <b>Product Details: </b><br>
      Order ID: ${order.id}<br>
      Amount to Pay: ${order.totalPrice}</p>`,
    };
    // console.log(message.to);
    transporter.sendMail(message, (err, info) => {
      if (err) {
        console.log("Error occurred. " + err.message);
      }

      //   console.log("Message sent: %s", info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    });
  });
}

module.exports = mail;

import { Worker } from "bullmq";

import { redis } from "../config/redis.config.js";
import {
  transporter,
  mailFrom
} from "../config/mail.config.js";

export const mailWorker = new Worker(
  "mail",
  async (job) => {
    if (job.name === "welcome-mail") {
      const {
        email,
        name
      } = job.data;

      await transporter.sendMail({
        from: mailFrom,
        to: email,
        subject: "Welcome to TaskFlow",
        text: `Hi ${name}, welcome to TaskFlow!`,

        html: `
          <h1>Welcome to TaskFlow, ${name}!</h1>

          <p>
            Your account has been successfully created.
          </p>

          <p>
            You can now start creating organizations,
            projects and tasks.
          </p>

          <p>
            Thanks,<br/>
            TaskFlow Team
          </p>
        `
      });

      console.log(`Welcome email sent to ${email}`);
    }
    if (job.name === "organization-member-added") {
  const {
    email,
    name,
    organizationName
  } = job.data;

  await transporter.sendMail({
    from: mailFrom,
    to: email,
    subject: `You've been added to ${organizationName}`,

    text: `
Hi ${name},

You have been added to the ${organizationName} organization on TaskFlow.

You can now access the organization's projects and tasks.

Thanks,
TaskFlow Team
    `,

    html: `
      <h2>You've been added to an organization</h2>

      <p>Hi ${name},</p>

      <p>
        You have been added to
        <strong>${organizationName}</strong>
        on TaskFlow.
      </p>

      <p>
        You can now access the organization's
        projects and tasks.
      </p>

      <p>
        Thanks,<br />
        TaskFlow Team
      </p>
    `
  });

  console.log(
    `Organization membership email sent to ${email}`
  );
}
    if (job.name === "task-assigned") {
  const {
    email,
    name,
    taskTitle,
    projectName
  } = job.data;

  await transporter.sendMail({
    from: mailFrom,
    to: email,
    subject: `New task assigned: ${taskTitle}`,

    text: `
Hi ${name},

You have been assigned a new task.

Task: ${taskTitle}
Project: ${projectName}

Please log in to TaskFlow to view the task.

Thanks,
TaskFlow Team
    `,

    html: `
      <h2>New task assigned</h2>

      <p>Hi ${name},</p>

      <p>
        You have been assigned a new task on TaskFlow.
      </p>

      <p>
        <strong>Task:</strong> ${taskTitle}
      </p>

      <p>
        <strong>Project:</strong> ${projectName}
      </p>

      <p>
        Please log in to TaskFlow to view the task.
      </p>

      <p>
        Thanks,<br />
        TaskFlow Team
      </p>
    `
  });

  console.log(`Task assignment email sent to ${email}`);
}
  },
  {
    connection: redis
  }
);

mailWorker.on("completed", (job) => {
  console.log(`Mail job ${job.id} completed`);
});

mailWorker.on("failed", (job, error) => {
  console.error(
    `Mail job ${job?.id} failed:`,
    error
  );
});
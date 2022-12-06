#!/usr/bin/env node
import inquirer from "inquirer";
import chalkAnimation from "chalk-animation";
import chalk from "chalk";

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function Welcome() {
  const rainbow = chalkAnimation.rainbow("Welcome to the PIAIC ATM Service \n");
  await sleep();
  rainbow.stop();
}

await Welcome();

const Input: {
  Userid: string;
  Pin: number;
  Accounttype: string;
  Option: string;
  Cashamount: number;
  WithdrawCash: number;
} = await inquirer.prompt([
  {
    name: "Userid",
    type: "input",
    message: chalk.bgWhite("Please Enter your User Id ?"),
  },
  {
    name: "Pin",
    type: "number",
    message: chalk.bgWhite("Please Enter your Pin ?"),
    when(answers) {
      return answers.Userid;
    },
  },
  {
    name: "Accounttype",
    type: "list",
    message: chalk.bgWhite("Select your account type ?"),
    choices: ["Current Account", "Saving Account"],
    when(answers) {
      return answers.Pin;
    },
  },
  {
    name: "Option",
    type: "list",
    message: chalk.bgWhite("Select what you want to do ?"),
    choices: ["Fast Cash", "Cash Withdraw", "Balance Inquiry"],
    when(answers) {
      return answers.Accounttype;
    },
  },
  {
    name: "Cashamount",
    type: "list",
    message: chalk.bgWhite("Select Amount ?"),
    choices: [1000, 5000, 10000],
    when(answers) {
      return answers.Option == "Fast Cash";
    },
  },
  {
    name: "WithdrawCash",
    type: "number",
    message: chalk.bgWhite("Enter Amount ?"),
    when(answers) {
      return answers.Option == "Cash Withdraw";
    },
  },
]);

const { Userid, Pin, Accounttype, Option, Cashamount, WithdrawCash } = Input;

const Balance: number = 50000;

if (Userid && Pin && Cashamount) {
  console.log(
    chalk.bgWhiteBright(`Your remaining balance is ${Balance - Cashamount}`)
  );
}

if (Userid && Pin && WithdrawCash < Balance) {
  console.log(
    chalk.bgWhiteBright(
      `You have Withdraw ${WithdrawCash} & Your remaining balance is ${
        Balance - WithdrawCash
      }`
    )
  );
} else if (WithdrawCash > Balance) {
  console.log(chalk.bgWhiteBright("You have insufficient balance"));
}

if (Userid && Pin && Option == "Balance Inquiry") {
  console.log(chalk.bgWhiteBright(`Your balance is ${Balance}`));
}

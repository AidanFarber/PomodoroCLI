#!/usr/bin/env node

/*
TODO:
    - be able to start a new timer at the end of another with quick shortcuts for a new work and break
      session
    - sound cues for time up!
    - make it pretty
*/

const chalk = require("chalk");
//const boxen = require("boxen");
const inquirer = require("inquirer");
const process = require("node:process");
const { exec } = require('node:child_process');
const notifier = require('node-notifier');

var player = require('play-sound')(opts = {});
var work = 1200;
var breakTime = 300;
if (!process.argv[2]) {
    console.log(chalk.redBright("Error! No time defined!\n\nUsage: ptimer <timer-length>"));
    process.exit(1);
} else {
    var countdown = parseInt(process.argv[2]);
    if (process.argv[2].includes('min')) {
        countdown = countdown * 60;
    }
    if (process.argv[2].includes('work')) {
        countdown = work; // Standard 20 minute pomodoro timer
    }
    if (process.argv[2].includes('break')) {
        countdown = breakTime; // Standard 5 minute break
    }
    startTimer(countdown);
}

function startTimer(countdown) {
    // using an anonymous function, create the timer and display it (executes function every 1000ms or 1s) 
    var timer = setInterval( () => {
        countdown -= 1;
        var minutes = Math.floor(countdown/60);
        var seconds = countdown%60;
        if (seconds < 10) seconds = "0" + seconds; // if it's less than 10, append a 0 before the number 
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write(chalk.cyan(`Time left ${minutes}:${seconds}`));
        if (countdown < 1) {
            // upon time running out, clear the event and exit
            // TODO: either start break timer or start another work timer
            clearInterval(timer);
            exec('osascript -e \'display notification "Options in terminal" with title "Time is up!" sound name "Blow"\'');
            //    title: 'PTimer',
            //    message: 'Time is up!',
            //}, function (err, response, metadata) {
            //    console.log(response, metadata);
            //});
            console.log("\n\nTime's up!\n\n");
            inquirer
                .prompt([
                    {
                        type: 'list',
                        name: 'choice',
                        message: 'Start a new timer?',
                        choices: [
                            'Work',
                            'Break',
                            'Custom Length Timer',
                            'Exit'
                        ]
                    }
                ])
                .then( (answers) => {
                    if (answers.choice == 'Work') {
                        console.log("Starting a new timer for 20 minutes!\n");
                        startTimer(work);
                    }
                    if (answers.choice == 'Break') {
                        console.log("Starting a new break timer for 5 minutes!\n");
                        startTimer(breakTime);
                    }
                    if (answers.choice == 'Custom Length Timer') {
                        inquirer
                            .prompt([
                                {
                                    type: 'input',
                                    name: 'new_length',
                                    message: 'Enter the timer length:'
                                }
                            ])
                            .then( (answers) => {
                                if (answers.new_length.includes("min"))
                                    answers.new_length = answers.new_length * 60;
                                startTimer(answers.new_length);
                            })
                    }
                    if (answers == 'Exit') {
                        process.exit(0);
                    }
                });
        }
    }, 1000);
}

/* function nextTimer(countdown) {
    var timer = setInterval(() => {
        countdown -= 1;
        if 
    }, 1000);
}
*/

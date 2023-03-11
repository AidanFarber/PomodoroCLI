# PomodoroCLI
A fairly simple command line based pomodoro timer for MacOS I wrote for myself. 
I mainly use Neovim for my development and Pomodoro helps me regularly get my work done, so I simply combined the two!

Since it's not currently available to install online through npm, we would need to install it manually. 

# Installation
After downloading the files from this repository, navigate to the file using the terminal, for example:

`cd ~/dev/PomodoroCLI`

To test it's functionality we can use the command:

`node ptimer 10sec`

To install it as a globally available command:

`npm install -g .` while in the directory

## Usage

Can be used with the following command:

`ptimer <time>`

Where <time> can be a time in minutes or seconds.

\<time> can be replaced with work (standard 20min timer) and break (standard 5 minute break)

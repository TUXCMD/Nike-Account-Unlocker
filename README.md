![Kickmoji Nike](https://s3.amazonaws.com/kickmoji/nike-kickmoji2.png "Kickmoji")

# Nike Account Unlocker
Unlocks locked sms verified nike accounts

## NOTE
This is only half of the script. This will not change the password for you but it will reset all your accounts. 
I will try to push update out before tomorrows drop for the other half. Just want people to have something before then though.

# Requirements
* [node.js](http://nodejs.org/) -- v0.8.0 or newer
* An IMAP server to connect to -- this file has setup instructions for [gmail](https://gmail.com)
* common sense

# Usage
This is free to use - if you see anyone charging for this service, drop a link to this repo.
Do not contact us for help with support, the installation steps are simple, if you can't get it to work ask someone to reset your accounts.

# Setup Instructions
Depending on your email provider, you may have to do extra steps. Incase we don't cover this or this information is outdated, do your own research.

This setup assumes you already have node.js downloaded and setup.

Gmail Only
```bash
# Enable IMAP 
1 - Go to the "Settings", e.g. click on the "Gears" icon and select "Settings".
2 - Click on "Forwarding and POP/IMAP".
3 - Enable "IMAP Access"

# Allow Dangerous Apps
1 - Go to "My Account" -> "Sign-in & Security" -> "Connected apps & sites" -> "Allow less secure apps"
```
First thing you want to do after you download the application is to extract it somewhere safe. Once you do that you want to cd to the directory and type the following:

```bash
# Installs the dependencies for the application
npm install

# If you get thrown a security error run
sudo npm install
```

Next up, you want setup a mailbox (or a label) that contains your nike accounts. This is to ensure that no other email gets sent to it. 

As soon as thats done, your essentially ready to edit the config file and start getting your accounts unlocked.

The mailbox is your category inside your email that is holding the emails. This is to ensure that their wont be any mess ups with other files. To do this on gmail, you would create a Label and drag and drop your nike locked account emails in there.


# Error Codes

# Credits
* [atomily aka vlad aka michael](https://github.com/atomily) -- developing it
* [ConteKnows](https://twitter.com/conteknows) -- kickmoji nike illustration

# License
MIT License

Copyright (c) 2018 Kickmoji, LLC

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

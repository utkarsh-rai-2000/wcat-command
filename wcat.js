#!/usr/bin/env node

let fs = require("fs");

let inputArr = process.argv.slice(2);
let commandArr = [];
let filesArr = [];

for(let i=0; i < inputArr.length; i++)
{
    let firstchar = inputArr[i].charAt(0);
    if(firstchar=="-"){
        commandArr.push(inputArr[i]);
    }
    else{
        filesArr.push(inputArr[i]);
    }
}

// Check if the enterned command set is valid or not.
let isBothPresent = commandArr.includes("-n") && commandArr.includes("-b");
if(isBothPresent == true)
{
    console.log("Either enter -n or -b command");
    return;
}

// Check if file exists or not.
for(let i=0; i < filesArr.length; i++)
{
    let fileExist = fs.existsSync(filesArr[i]);
    if(fileExist == false){
        console.log("Enter a valid file path");
        return;
    }
}

// Read content of all the file
let content = "";
for(let i=0; i < filesArr.length; i++)
{
    let bufferContent = fs.readFileSync(filesArr[i]);
    content+= bufferContent+"\r\n";
}

let contentArr = content.split("\r\n");

// -s command
let isSPreset = commandArr.includes("-s");
if (isSPreset == true) {
    for (let i = 1; i < contentArr.length; i++) {
        if (contentArr[i] == "" && contentArr[i - 1] == "") {
            contentArr[i] = null;
        }
        else if (contentArr[i] == "" && contentArr[i - 1] == null) {
            contentArr[i] = null;
        }
    }
    let tempArr = [];
    for (let i = 0; i < contentArr.length; i++) {
        if (contentArr[i] != null) {
            tempArr.push(contentArr[i])
        }
    }
    contentArr = tempArr;
}

// -n command
let isNPreset = commandArr.includes("-n");
if (isNPreset == true) {
    for (let i = 0; i < contentArr.length; i++) {
        contentArr[i]=(i+1) + " " + contentArr[i];
    }
}

// -b command
let isBPresent = commandArr.includes("-b");
if (isBPresent == true) {
    let counter = 1
    for (let i = 0; i < contentArr.length; i++) {
        if (contentArr[i] != "") {
            contentArr[i] = (i+1) + " " + contentArr[i];
            counter++;
        }
    }
}

console.log(contentArr.join("\n"));


import fs, { open, appendFile, unlink } from "node:fs/promises";
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import path from "node:path";

const rl = readline.createInterface({ input, output });

export async function cliNote() {
    try {
        const fileList = [];
        let askOpt = 0;
        do {
            choiceOpt();
            askOpt = await rl.question("select number: ");
            switch (askOpt) {
                case "1":
                    const fileDir = await writeFile();
                    fileList.push(fileDir);
                    break;
                case "2":
                    await readFile(fileList);
                    break;
                case "3":
                    await editFile(fileList);
                    break;
                case "4":
                    await deleteFile(fileList);
                    break;
                default:
                    console.log("\nexit");
            }

        } while (askOpt < 5 && askOpt > 0);

    } catch (err) {
        console.log(err.stack);
    } finally {
        rl.close();
    }
}

async function deleteFile(fileList) {
    if (fileList.length < 1) {
        return console.log("\n-- there is no file to delete --");
    }

    for (let i = 0; i < fileList.length; i++) {
        console.log(`${i + 1}. ${path.basename(fileList[i])}`);
    }
    const askFileNum = await rl.question("file number: ");

    try {
        await unlink(fileList[askFileNum - 1]);
        console.log(`\tsuccessfully deleted ${fileList[askFileNum - 1]}`)
        fileList.splice(askFileNum - 1, 1);
    } catch (err) {
        throw new Error("there was an error");
    }
}

async function editFile(fileList) {
    if (fileList.length < 1) {
        return console.log("\n-- there is no file to edit --");
    }

    for (let i = 0; i < fileList.length; i++) {
        console.log(`${i + 1}. ${path.basename(fileList[i])}`);
    }
    const askFileNum = await rl.question("file number: ");
    const readFile = await open(fileList[askFileNum - 1]);
    let temp = "";
    for await (const line of readFile.readLines()) {
        temp = `\n${line}`;
    }
    const inputAppend = await rl.question(`${temp}`);

    const result = appendFile(`${fileList[askFileNum - 1]}`, inputAppend);
    if (result) {
        console.log(`\"${inputAppend}\" was appended to ${path.basename(fileList[askFileNum - 1])}`)
    }
}

async function readFile(fileList) {
    if (fileList.length < 1) {
        return console.log("\n-- there is no file to read --");
    }
    
    // read file
    for (let i = 0; i < fileList.length; i++) {
        console.log(`${i + 1}. ${path.basename(fileList[i])}`);
    }
    const askFileNum = await rl.question("file number: ");

    const readFile = await open(fileList[askFileNum - 1]);
    console.log(`\n${path.basename(fileList[askFileNum - 1])}`);
    for await (const line of readFile.readLines()) {
        console.log(`\t${line}`);
    }
}

async function writeFile() {
    const content = await rl.question("\ntype something\n");
    const dirPath = path.join("./fsTest");
    const fileName = await rl.question("filename: ");
    const fileDir = `${dirPath}/${fileName}.txt`;

    const result = await fs.writeFile(fileDir, content);
    if (result) {
        throw new Error("gagal membuat teks file");
    }

    return fileDir;
}

function choiceOpt() {
    console.log("\n1. write file");
    console.log("2. read file");
    console.log("3. edit file");
    console.log("4. delete file");
    console.log("input any button to exit");
}

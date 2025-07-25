// no. 5
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

function fileListLoop(fileList) {
    for (let i = 0; i < fileList.length; i++) {
        console.log(`${i + 1}. ${path.basename(fileList[i])}`);
    }
    return rl.question("file number: ");
}

async function deleteFile(fileList) {
    if (fileList.length < 1) {
        return console.log("\n-- you should write a new file first --");
    }
    const fileNum = await fileListLoop(fileList);

    try {
        await unlink(fileList[fileNum - 1]);
        console.log(`\tsuccessfully deleted ${fileList[fileNum - 1]}`)
        fileList.splice(fileNum - 1, 1);
    } catch (err) {
        throw new Error("there was an error");
    }
}

async function editFile(fileList) {
    if (fileList.length < 1) {
        return console.log("\n-- you should write a new file first --");
    }
    const fileNum = await fileListLoop(fileList);

    const readFile = await open(fileList[fileNum - 1]);
    let temp = "";
    for await (const line of readFile.readLines()) {
        temp = `\n${line}`;
    }
    const inputAppend = await rl.question(`${temp}`);

    const result = appendFile(`${fileList[fileNum - 1]}`, inputAppend);
    if (result) {
        console.log(`\"${inputAppend}\" was appended to ${path.basename(fileList[fileNum - 1])}`)
    }
}

async function readFile(fileList) {
    if (fileList.length < 1) {
        return console.log("\n-- you should write a new file first --");
    }
    const fileNum = await fileListLoop(fileList);

    const readFile = await open(fileList[fileNum - 1]);
    console.log(`\n${path.basename(fileList[fileNum - 1])}`);
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

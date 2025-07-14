// no. 4
export function divideAndSort(num) {
    const splitNum = `${num}`.split("0");
    let result = "";

    splitNum.map((s) => {
        const splitChar = s.split("");
        const sortChar = splitChar.sort();
        result += sortChar.join("");
    });

    console.log(Number(result));
}
// no. 3
export async function getUserNameDomisili() {
    const url = "https://jsonplaceholder.typicode.com/users";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const iniJson = await response.json();
        console.table(handleJson(iniJson));
    } catch (err) {
        console.log(err.stack);
    }
}

function handleJson(jsonArr) {
    const result = [];

    for (let i in jsonArr) {
        // destructure
        const { name: namaUser, address: domisili  } = jsonArr[i];
        const { city } = domisili;

        result.push({ namaUser, domisili: city })
    }

    // sort city secara ascending
    const sortResult = result.sort((a, b) =>
        a.domisili.localeCompare(b.domisili)
    );
    return sortResult;
}

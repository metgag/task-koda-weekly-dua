// no. 2
const getDataFromServer = (status, callback) => {
    if (status) {
        setTimeout(() => {
            const products = [
                "Products 1",
                "Products 2",
                "Products 3"
            ];
            callback(products, null);
        }, 3000);
    } else {
        const err = new Error("Failed to fetch data");
        callback(null, err);
    }
}

export const testData = (s) => {
    getDataFromServer(s, processData);
};

// cb
function processData(s, err) {
    try {
        if (!s) {
            throw new Error(err);
        }
        console.log(s)
    } catch (err) {
        console.log(err);
    }
}

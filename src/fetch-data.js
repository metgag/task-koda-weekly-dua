// no. 1
/* 
    Promise merupakan penanganan dari event yang berhasil dan gagal-
    dari operasi yang berjalan secara asynchronous

    Promise memiliki tiga state, yaitu:
        -> pending: kondisi awal, hasil (berhasil atau gagal) masih tertunda
        -> fulfilled: operasi berhasil
        -> rejected: operasi gagal

    Berikut beberapa bentuknya-
*/
const fetchData = (status) => {
    return new Promise((resolve, reject) => {
        if (status) {
            setTimeout(() => {
                resolve("Data berhasil disimpan");
            }, 3000);
        } else {
            reject("Gagal mengambil data");
        }
    });
};

/*
    then-catch
    then merupakan handle dari Promise, yang berisi dua parameter-
    resolve, dan reject. Jika pada Promise sebelumnya merupakan-
    resolve -> .then akan menghandle
    jika reject -> .catch akan menghandle
*/
export function handlingThenCtc(status) {
    fetchData(status)
        .then((s) => console.log(s))
        .catch((f) => console.log(f));
}

/*
    try-catch
    try catch bisa digunakan secara synchronous atau asynchronous,
    -> try: block try berisi kode yang kemungkinan terjadi error
    -> catch: jika pada block try terjadi error, block catch akan menghandle
*/
export async function handlingTryCtc(status) {
    try {
        const result = await fetchData(status);
        console.log(result);
    } catch (err) {
        console.log(err);
    }
}

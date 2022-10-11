export async function sleep(time) {
    return new Promise((resolve) => {
        setInterval(() => {
            resolve();
        }, time);
    });
}
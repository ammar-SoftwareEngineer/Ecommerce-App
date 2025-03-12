
export const UpdateStateProperty = (state, action) => {
    const { path, value } = action.payload;
    const keys = path.split(".");

    let currentObject = state;
    for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        if (!currentObject[key]) {
            currentObject[key] = {};
        }
        currentObject = currentObject[key];
    }

    const lastKey = keys[keys.length - 1];
    currentObject[lastKey] = value;
};


export const UpdateStateProperties = (state, action) => {
    const updates = action.payload;

    updates.forEach(update => {
        const { path, value } = update;
        const keys = path.split(".");

        let currentObject = state;
        for (let i = 0; i < keys.length - 1; i++) {
            const key = keys[i];
            if (!currentObject[key]) {
                currentObject[key] = {};
            }
            currentObject = currentObject[key];
        }

        const lastKey = keys[keys.length - 1];
        currentObject[lastKey] = value;
    });
};

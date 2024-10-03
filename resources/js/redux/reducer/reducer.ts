function reducer(state, action) {
    if (action.type === "ADD_RIDER") {
        return [...state, action.payload];
    }
}

const getCustomItems = async () => {
    const response = await fetch('/api/customItems')
    const data = await response.json()
    return data
}

const getOptionsByCustomItemId = async (id) => {
    const response = await fetch(`/api/customItems/${id}`)
    const data = await response.json()
    return data
}

export default {
    getCustomItems,
    getOptionsByCustomItemId
}

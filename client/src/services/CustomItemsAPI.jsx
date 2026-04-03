const getOptionsByCategory = async (categoryName) => {
    const response = await fetch(`/api/customItems/${categoryName}`)
    const data = await response.json()
    return data
}

export default {
    getOptionsByCategory
}

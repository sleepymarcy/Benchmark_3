const fetchData = async () => {
    try {
        const response = await fetch('https://striveschool-api.herokuapp.com/api/movies/', {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTFkMTIyMDJkNTI2MjAwMTViNmRkN2EiLCJpYXQiOjE2Mjk2NDg5NTYsImV4cCI6MTYzMDg1ODU1Nn0.BVwM4DSOWpKt_OHQOVtmoQv52PZOTM8FkaOzYoHNZRE"
            }
        })
        if (response.ok){
            const categories = await response.json()
            console.log(categories)
        }
        
    } catch (error) {
        console.log(error)
    }
}

window.onload = async() => {
    await fetchData
}
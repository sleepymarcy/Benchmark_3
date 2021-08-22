const fetchData = async () => {
    const container = document.querySelector('.galleries')
    try {
        const response = await fetch(
            "https://striveschool-api.herokuapp.com/api/movies/",
            {
                headers: {
                    Authorization:
                        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTFkMTIyMDJkNTI2MjAwMTViNmRkN2EiLCJpYXQiOjE2Mjk2NDg5NTYsImV4cCI6MTYzMDg1ODU1Nn0.BVwM4DSOWpKt_OHQOVtmoQv52PZOTM8FkaOzYoHNZRE",
                },
            }
        )
        if (response.ok) {
            const categories = await response.json()
            console.log(categories)
            const movies = await Promise.all(
                categories.map(async (category) => {
                    const response = await fetch(
                        "https://striveschool-api.herokuapp.com/api/movies/" + category,
                        {
                            headers: {
                                Authorization:
                                    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTFkMTIyMDJkNTI2MjAwMTViNmRkN2EiLCJpYXQiOjE2Mjk2NDg5NTYsImV4cCI6MTYzMDg1ODU1Nn0.BVwM4DSOWpKt_OHQOVtmoQv52PZOTM8FkaOzYoHNZRE",
                            },
                        }
                    )
                    return await response.json();
                })
            )

            movies.forEach((arr) => {
                console.log(arr)
                const chunks = []
                let i = 0
                while (i < arr.length) {
                    chunks.push(arr.slice(i, (i += 6)))
                }
                console.log('chunks:', chunks)

                const gallery = `
            <div class="movie-gallery m-2">
                <h4 class="text-light">${arr[0].category}</h4>
                <div id="${arr[0].category}" class="carousel slide" data-bs-ride="carousel" data-bs-interval="false">
                    <div class="carousel-inner">
                    ${chunks.map
                        ((chunk, i) => `
                        <div class="carousel-item ${
                            i===0 ? 'active' : '' 
                        }">
                    <div class="movie-row">
                        <div class="row">
                        ${chunk.map(movie => `<div class="col-md-2">
                        <img class="movie-cover" src="/assets/media/1-1.jpg">
                    </div>`).join('')}

                        </div>
                    </div>
                </div>`).join('')}
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#${arr[0].category}" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#${arr[0].category}" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </div>`
            container.innerHTML += gallery
            })
        }
    }
    catch (error) {
        console.log(error)
    }
}

window.onload = async () => {
    await fetchData()
}
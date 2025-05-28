const form = document.querySelector('#searchForm');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    

    //console.log(e);
    const searchTermInput = form.elements.query;
    const config = {
        params: {
            q: searchTermInput.value,
        }
    }
    //?q=${searchTermInput.value}
    const res = await axios.get(`https://api.tvmaze.com/search/shows`, config);
    //console.log(res.data[0].show.image.medium);
    makeImages(res.data);
    searchTermInput.value = "";
});

const makeImages = (results) => {
    //前の検索時の画像を削除
    document.querySelectorAll('img').forEach(img => img.remove());

    const message = document.querySelector('#noResults');
    if (message) message.remove();

    if (results.length === 0) {
        const noResultsMsg = document.createElement('p');
        noResultsMsg.id = 'noResults';
        noResultsMsg.textContent = '見つかりませんでした。';
        document.body.append(noResultsMsg);
        return;
    }

    for (let result of results) {
        if (result.show.image) {
            const img = document.createElement('IMG');
            img.src = result.show.image.medium;
            document.body.append(img);
            //console.log(result);
        }

    }
}
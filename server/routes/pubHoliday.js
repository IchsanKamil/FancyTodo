const router = require('express').Router()
const axios = require('axios')

router.get('/', (req, res, next) => {
    let date = new Date()
    let year = date.getFullYear()
    let url = `https://date.nager.at/api/v2/PublicHolidays/${year}/ID`
    axios.get(url)
    .then(response => {
        // console.log(response, '<<<<< masuk axios');
        res.status(200).json(response.data)
        })
        .catch(err => {
            console.log(err, '<<<<< err exios');
            next(err)
        })
})

module.exports = router
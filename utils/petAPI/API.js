import axios from 'axios';
const BASEURL = 'https://api.petfinder.com/v2/animals?type=dog'
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJ5YUQzWThHdWZCdEpDa250amM0YnlUU0JIVllVUGVENDJQSkFacTNHTzJTZlJ4OHA5ZyIsImp0aSI6IjI3MTZiNGQ4ZmJkYjc5N2ZiOTA3ZTgwMTI3ZTYwMTYxZDE0NjViYjBlYTc1NDBiZDBhMGRlYjg5OTM2N2Y5MjQ5NjgyMmQ3ZmJiOGVhYTNhIiwiaWF0IjoxNTk3MjYyMjk2LCJuYmYiOjE1OTcyNjIyOTYsImV4cCI6MTU5NzI2NTg5Niwic3ViIjoiIiwic2NvcGVzIjpbXX0.dAChAOSUeu6CtDG-QEAofNvf0kctEHsNBd9JjDmcmfaO-JnFe-jlMYInFv4bdR2FbgF4t1RsHXmFl8pf9SiPpZpncdTNwWVLuR3rIruibO8MaIG68EHhKZ3qUK99Oev5WJlDP49CFJwv__Na6iaj1XceAwddszQyRiENTgeQzIdNmM4RRFUx6hE88zy95-fFAZQC1O7OyVfjeHIJXnbCHYrdAbikg_rX2VoaT8o6Aae_jW4D_VUNkeqD7s-lliH3vqs2kPUlz2PS6E3VwOSkOS2-zuUXBGiY6H9jEzFnqMGyezc6Z3GryiDGuCedbjYDUp0OI_afnNkBVG7m9u6cQw';
export default {
  search: function (query) {
    return axios.get(BASEURL, { headers: { "Authorization": `Bearer ${token}` } })
  }
}

const searchPets = (query) => {
    API.search(query)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };
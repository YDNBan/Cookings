export let baseURL = 'http://localhost:5000'
if(!window.location.href.includes('http://localhost')) {
  baseURL = 'https://cookings.onrender.com/'
}
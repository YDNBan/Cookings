export let baseURL = 'http://localhost:5000'
if(!window.location.href.includes('localhost')) {
  baseURL = 'https://cookings.onrender.com/'
}
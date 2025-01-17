import axios from 'axios';

const options = {
  method: 'GET',
  url: 'https://public-api.birdeye.so/defi/price',
  params: {address: 'So11111111111111111111111111111111111111112'},
  headers: {
    
    'x-chain': 'solana',
    'X-API-KEY': '829c78d3c16847c0a6b98ad5559e822f'
  }
};

axios
  .request(options)
  .then(res => console.log(res.data))
  .catch(err => console.error(err));

  function fetchUsers() {
    axios.get('http://localhost:3000/users')  // Your backend API endpoint for users
        .then(response => {
            const usersDiv = document.getElementById('users');
            usersDiv.innerHTML = '';  // Clear any previous content

            // Loop through users and create a list
            response.data.forEach(user => {
                const userDiv = document.createElement('div');
                userDiv.textContent = `Username: ${user.username}, Email: ${user.email}`;
                usersDiv.appendChild(userDiv);
            });
        })
        .catch(error => {
            console.error('Error fetching users:', error);
        });
}
function fetchUsers() {
    axios.post('http://localhost:3000/location')  // Your backend API endpoint for users
        .then(response => {
            const usersDiv = document.getElementById('users');
            usersDiv.innerHTML = '';  // Clear any previous content

            // Loop through users and create a list
            response.data.forEach(user => {
                const userDiv = document.createElement('div');
                userDiv.textContent = `Username: ${user.username}, Email: ${user.email}`;
                usersDiv.appendChild(userDiv);
            });
        })
        .catch(error => {
            console.error('Error fetching users:', error);
        });
}

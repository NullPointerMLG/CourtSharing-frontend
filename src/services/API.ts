const API_URL: string = "http://localhost:5000";

export const login = async (accessToken: Promise<string>) => {
    const token: string = await accessToken;

    return fetch(API_URL + "/login", {
      method: 'POST',
      body: JSON.stringify(token),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*'
      }
    }).then(res => res.json())
      .catch(error => console.error('Error:', error));
  };
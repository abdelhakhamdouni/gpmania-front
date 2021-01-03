test('conect to backend', () => {

  let success = false
  fetch('http://192.168.1.63:8080', {
    method: "post",
    body: JSON.stringify({
        email: 'abdelhakhamdouni@sfr.fr',
        password:"Mohamed2010@",
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
  }).then((data)=>{
    success = true
    expect(success).toEqual(true);
  })
});

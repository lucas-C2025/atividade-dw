const token =  `7bf15bbb3d3c1d`;
const button = document.querySelector('.btnPesquisar');
const ipEnviado = document.getElementById('ipEnviado'); // todo elemento recebido pelo getElement é um dado html
                                                        // não é o dado em si, é preciso um .value
                                                        // para acessar o valor, linha 12 o dado está corrigido
const adicionaNoFim = document.getElementById('resultado')

adicionaNoFim.innerHTML= 
    `<table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">IP</th>
      <th scope="col">Hostname</th>
      <th scope="col">País</th>
      <th scope="col">Região</th>
    </tr>
  </thead>`

async function pegaDadosIP(x) { 
    const url = `https://ipinfo.io/${x}/json?token=${token}`;
    const resultado = await fetch(url);
    return await resultado.json();
}
button.addEventListener('click', async function () {
    const ip = ipEnviado.value
    const dadosIP = await pegaDadosIP(ip) // só é possível usar a opção 'await' 
                                                // dentro de uma função async
  adicionaNoFim.innerHTML+=` 
  <table  class="table table-striped">
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>${dadosIP.ip}</td>
      <td>${dadosIP.hostname}</td>
      <td>${dadosIP.country}</td>
      <td>${dadosIP.region}</td>
    </tr>
    </tbody>`

    console.log(dadosIP)
    console.log(ip)

                        
});
